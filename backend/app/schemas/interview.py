from typing import Literal

from pydantic import BaseModel, ConfigDict


class InterviewQuestion(BaseModel):
    model_config = ConfigDict(extra="forbid")

    question: str
    category: Literal[
        "Technical",
        "Project-Based",
        "HR",
        "Behavioral"
    ]
    difficulty: Literal[
        "Easy",
        "Medium",
        "Hard"
    ]
    reason: str
    evaluation_criteria: str


class InterviewQuestionSet(BaseModel):
    model_config = ConfigDict(extra="forbid")

    job_title: str | None
    questions: list[InterviewQuestion]