from app.schemas.resume import ResumeExtraction


sample_data = {
    "candidate_name": "Navi Varman",
    "email": "navi@example.com",
    "phone": None,
    "skills": ["Java", "Python", "React"],
    "education": [
        {
            "degree": "B.E. Computer Science",
            "institution": "Rathinam Technical Campus",
            "graduation_year": "2027"
        }
    ],
    "projects": [
        {
            "name": "AI Resume Assistant",
            "description": "An AI-powered resume analysis application",
            "technologies": ["React", "FastAPI", "Groq"]
        }
    ],
    "experience": [],
    "missing_information": ["Professional experience"]
}


resume = ResumeExtraction.model_validate(sample_data)

print(resume.model_dump_json(indent=2))