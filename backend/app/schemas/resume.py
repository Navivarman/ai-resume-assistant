from pydantic import BaseModel, Field


class Education(BaseModel):
    degree: str | None = None
    institution: str | None = None
    graduation_year: str | None = None


class Project(BaseModel):
    name: str
    description: str
    technologies: list[str] = Field(default_factory=list)


class Experience(BaseModel):
    role:str | None = None
    company: str | None = None
    duration: str | None = None
    responsibilities: list[str] = Field(default_factory=list)


class ResumeExtraction(BaseModel):
    candidate_name: str | None = None
    email: str | None = None
    phone: str | None = None

    skills: list[str] = Field(default_factory=list)

    education: list[Education] = Field(default_factory=list)
    projects: list[Project] = Field(default_factory=list)
    experience: list[Experience] = Field(default_factory=list)

    missing_information: list[str] = Field(default_factory=list)