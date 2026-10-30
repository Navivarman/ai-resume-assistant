from fastapi import FastAPI, UploadFile, File, HTTPException
from groq import APIError, RateLimitError

from app.services.pdf_service import extract_pdf_text, MAX_FILE_SIZE
from app.services.resume_service import analyze_resume

from app.schemas.job_request import JobMatchRequest
from app.services.job_service import (
    analyze_job_description,
    match_resume_with_job
)

app = FastAPI(title="AI Resume & Interview Assistant")


@app.get("/")
def home():
    return {"message": "Welcome to AI Resume Assistant"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/resumes/analyze")
async def analyze_uploaded_resume(file: UploadFile = File(...)):

    try:
        # 1. Validate file type
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

        # 3. Extract text from PDF
        extracted_text = extract_pdf_text(pdf_bytes)

        # 4. Analyze extracted text using Groq
        resume_data = analyze_resume(extracted_text)

        # 5. Return structured JSON
        return {
            "filename": file.filename,
            "message": "Resume analyzed successfully",
            "analysis": resume_data.model_dump(mode="json")
        }

    except HTTPException:
        raise

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc)
        ) from exc

    except RateLimitError as exc:
        raise HTTPException(
            status_code=429,
            detail="AI service rate limit reached. Please try again later."
        ) from exc

    except APIError as exc:
        raise HTTPException(
            status_code=502,
            detail="Unable to get a response from the AI service."
        ) from exc

    finally:
        await file.close()


@app.post("/api/jobs/match")
def match_resume_with_job_description(
    request: JobMatchRequest
):
    try:
        # 1. Analyze the job description
        job_analysis = analyze_job_description(
            request.job_description
        )

        # 2. Match resume with job requirements
        match_report = match_resume_with_job(
            resume=request.resume,
            job=job_analysis
        )

        # 3. Return the complete result
        return {
            "message": "Resume matching completed successfully",
            "job_analysis": job_analysis.model_dump(mode="json"),
            "match_report": match_report.model_dump(mode="json")
        }

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc)
        ) from exc

    except RateLimitError as exc:
        raise HTTPException(
            status_code=429,
            detail="AI service rate limit reached. Please try again later."
        ) from exc

    except APIError as exc:
        raise HTTPException(
            status_code=502,
            detail="Unable to get a response from the AI service."
        ) from exc