
from app.schemas.resume import ResumeExtraction

from app.services.job_service import (
    analyze_job_description,
    match_resume_with_job,
)

from app.services.interview_service import (
    generate_interview_questions,
)


if __name__ == "__main__":

    # 1. Sample Job Description
    sample_job = """
    Job Title: Java Full Stack Developer

    We are looking for a Java Full Stack Developer.

    Required Skills:
    - Strong knowledge of Java.
    - Experience with Spring Boot.
    - Knowledge of React.js.
    - Good understanding of SQL and databases.
    - Knowledge of REST APIs.

    Preferred Skills:
    - Docker.
    - Redis.
    - Experience with microservices.
    """

    # 2. Create structured Resume object
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
                "description": (
                    "Developed a hostel management application "
                    "using React, Spring Boot and PostgreSQL."
                ),
                "technologies": [
                    "React",
                    "Spring Boot",
                    "PostgreSQL"
                ]
            }
        ],

        experience=[],
        missing_information=["Professional Experience"]
    )

    # 3. Analyze Job Description
    job_analysis = analyze_job_description(sample_job)

    # 4. Match Resume with Job
    match_report = match_resume_with_job(
        resume=sample_resume,
        job=job_analysis
    )

    # 5. Generate Interview Questions
    interview_result = generate_interview_questions(
        resume=sample_resume,
        job=job_analysis,
        match_report=match_report,
        question_count=12
    )

    # 6. Display Results
    print("\nINTERVIEW QUESTIONS\n")

    print(interview_result.model_dump_json(indent=2))
