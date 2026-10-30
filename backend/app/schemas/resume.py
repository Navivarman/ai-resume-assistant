from pydantic import BaseModel, ConfigDict


class Education(BaseModel):
    model_config = ConfigDict(extra="forbid")

    degree: str | None
    institution: str | None
    graduation_year: str | None


class Project(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str
    description: str
    technologies: list[str]


class Experience(BaseModel):
    model_config = ConfigDict(extra="forbid")

    role: str
    company: str | None
    duration: str | None
    responsibilities: list[str]


class ResumeExtraction(BaseModel):
    model_config = ConfigDict(extra="forbid")

    candidate_name: str | None
    email: str | None
    phone: str | None

    skills: list[str]
    education: list[Education]
    projects: list[Project]
    experience: list[Experience]

    missing_information: list[str]