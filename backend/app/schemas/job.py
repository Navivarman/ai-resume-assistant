from pydantic import BaseModel, ConfigDict, Field


class JobSkill(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str
    importance: str
    evidence: str


class JobAnalysis(BaseModel):
    model_config = ConfigDict(extra="forbid")

    job_title: str | None
    required_skills: list[JobSkill]
    preferred_skills: list[JobSkill]


class SkillMatch(BaseModel):
    model_config = ConfigDict(extra="forbid")

    skill: str
    evidence: str
    reason: str


class ResumeMatchReport(BaseModel):
    model_config = ConfigDict(extra="forbid")

    job_title: str | None

    match_percentage: int = Field(ge=0, le=100)

    matched_skills: list[SkillMatch]
    missing_skills: list[SkillMatch]
    uncertain_skills: list[SkillMatch]

    recommendations: list[str]