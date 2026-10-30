from app.services.resume_service import analyze_resume


sample_resume = """
Navi Varman
Email: navi@example.com

Education:
B.E. Computer Science
Rathinam Technical Campus
Graduation: 2027

Skills:
Java, Python, React.js, Spring Boot, MySQL

Projects:

HostelHub:
Developed a hostel management application
using React, Spring Boot and PostgreSQL.

Experience:
No professional experience mentioned.
"""


if __name__ == "__main__":
    result = analyze_resume(sample_resume)

    print("\nRESUME ANALYSIS RESULT\n")
    print(result.model_dump_json(indent=2))