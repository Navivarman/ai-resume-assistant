
from fastapi import FastAPI, UploadFile, File, HTTPException

from app.services.pdf_service import (
    extract_pdf_text,
    MAX_FILE_SIZE
)

app = FastAPI(
    title="AI Resume & Interview Assistant"
)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Resume Assistant"
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/resumes/upload")
async def upload_resume(
    file: UploadFile = File(...)
):

    try:
        if file.content_type != "application/pdf":
            raise HTTPException(
                status_code=415,
                detail="Only PDF files are allowed."
            )

        pdf_bytes = await file.read(
            MAX_FILE_SIZE + 1
        )

        if len(pdf_bytes) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail="PDF must be smaller than 5 MB."
            )

        extracted_text = extract_pdf_text(pdf_bytes)

        return {
            "filename": file.filename,
            "message": "PDF processed successfully",
            "extracted_text": extracted_text
        }

    except HTTPException:
        raise

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc)
        ) from exc

    finally:
        await file.close()
