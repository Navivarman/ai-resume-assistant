# AI Resume & Interview Assistant

An AI-powered application that analyzes resumes, compares them with job descriptions, and helps candidates prepare for interviews.

## Tech Stack

### Backend
- Python
- FastAPI
- Pydantic
- Groq API
- PyMuPDF

### Frontend
- React
- Vite

### Database
- PostgreSQL (planned)

## Current Features
- PDF resume upload
- Resume text extraction
- File validation

## Upcoming Features
- AI-powered resume analysis
- Skill extraction
- Job description matching
- Interview question generation
- Resume analysis history

## Running the Backend

1. Navigate to the backend directory:
   `cd backend`

2. Install dependencies:
   `uv sync`

3. Start the development server:
   `uv run uvicorn app.main:app --reload`

4. Open Swagger:
   `http://127.0.0.1:8000/docs`