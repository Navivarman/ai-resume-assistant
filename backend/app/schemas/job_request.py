from pydantic import BaseModel, ConfigDict, Field

from app.schemas.resume import ResumeExtraction


class JobMatchRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    resume: ResumeExtraction
    job_description: str = Field(min_length=1, max_length=15000)