
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from groq import APIError, RateLimitError

from app.services.pdf_service import extract_pdf_text, MAX_FILE_SIZE
from app.services.resume_service import analyze_resume
from app.services.job_service import (
    analyze_job_description,
    match_resume_with_job
)
from app.services.interview_service import generate_interview_questions


app = FastAPI(title="AI Resume & Interview Assistant")


@app.get("/")
def home():
    return {"message": "Welcome to AI Resume Assistant"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/jobs/match")
async def analyze_resume_and_match_job(
    file: UploadFile = File(...),
    job_description: str = Form(..., min_length=1, max_length=15000)
):
    try:
        # 1. Validate PDF file type
        if file.content_type != "application/pdf":
            raise HTTPException(
                status_code=415,
                detail="Only PDF files are allowed."
            )

        # 2. Read PDF
        pdf_bytes = await file.read(MAX_FILE_SIZE + 1)

        if len(pdf_bytes) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail="PDF must be smaller than 5 MB."
            )

        # 3. Extract resume text
        resume_text = extract_pdf_text(pdf_bytes)

        # 4. Analyze resume
        print("Starting resume analysis...")
        resume_analysis = analyze_resume(resume_text)
        print("Resume analysis completed.")

        # 5. Analyze job description
        print("Starting job analysis...")
        job_analysis = analyze_job_description(job_description)
        print("Job analysis completed.")

        # 6. Match resume with job
        print("Starting resume matching...")
        match_report = match_resume_with_job(
            resume=resume_analysis,
            job=job_analysis
        )
        print("Resume matching completed.")

        # 7. Generate interview questions
        print("Starting interview question generation...")
        interview_questions = generate_interview_questions(
            resume=resume_analysis,
            job=job_analysis,
            match_report=match_report,
            question_count=12
        )
        print("Interview question generation completed.")

        # 8. Return complete result
        return {
            "message": "Resume and job analysis completed successfully",
            "resume_analysis": resume_analysis.model_dump(mode="json"),
            "job_analysis": job_analysis.model_dump(mode="json"),
            "match_report": match_report.model_dump(mode="json"),
            "interview_questions": interview_questions.model_dump(mode="json")
        }

    except HTTPException:
        raise

    except ValueError as exc:
        print(f"Validation error: {exc}")
        raise HTTPException(
            status_code=400,
            detail=str(exc)
        ) from exc

    except RateLimitError as exc:
        print(f"Groq rate limit error: {exc}")
        raise HTTPException(
            status_code=429,
            detail="AI service rate limit reached. Please try again later."
        ) from exc

    except APIError as exc:
        print(f"Groq API error: {exc}")
        raise HTTPException(
            status_code=502,
            detail="Unable to get a response from the AI service."
        ) from exc

    except RuntimeError as exc:
        print(f"AI SERVICE ERROR: {repr(exc)}")
        raise HTTPException(
            status_code=502,
            detail="Unable to process the AI analysis."
        ) from exc

    finally:
        await file.close()
