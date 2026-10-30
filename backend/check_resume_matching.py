from app.services.job_service import (
    analyze_job_description,
    match_resume_with_job
)

from app.schemas.resume import ResumeExtraction


sample_resume = ResumeExtraction(
    candidate_name="Navi Varman",
    email="navi@example.com",
    phone=None,
    skills=[
        "Java",
        "Python",
        "React.js",
        "Spring Boot",
        "MySQL"
    ],
    education=[
        {
            "degree": "B.E. Computer Science",
            "institution": "Rathinam Technical Campus",
            "graduation_year": "2027"
        }
    ],
    projects=[
        {
            "name": "HostelHub",
            "description": "Developed a hostel management application.",
            "technologies": [
                "React",
                "Spring Boot",
                "PostgreSQL"
            ]
        }
    ],
    experience=[],
    missing_information=["Phone"]
)


sample_job = """
Job Title: Java Full Stack Developer

Required Skills:
- Java
- Spring Boot
- React
- SQL
- Docker

Preferred Skills:
- Redis
- Microservices
"""


if __name__ == "__main__":

    job_analysis = analyze_job_description(sample_job)

    report = match_resume_with_job(
        resume=sample_resume,
        job=job_analysis
    )

    print("\nRESUME MATCH REPORT\n")

    print(report.model_dump_json(indent=2))