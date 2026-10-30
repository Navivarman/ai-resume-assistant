from app.services.job_service import analyze_job_description


sample_job_description = """
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


if __name__ == "__main__":

    result = analyze_job_description(sample_job_description)

    print("\nJOB ANALYSIS RESULT\n")

    print(result.model_dump_json(indent=2))