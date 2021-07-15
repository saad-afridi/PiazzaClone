from typing import Optional
from pydantic import BaseModel, Field 

def ClassSchema(BaseModel):
    name: str = Field(...)
    number: str = Field(...)
    estimated_enroll: int = Field(..., gt=0)
    term: str = Field(...)
    
    class Config:
        schema_extra = {
            "example": {
                "name": "Intro. To Computer Science",
                "number": "CSC148H5",
                "estimated_enroll": 200,
                "term": "FALL2020"
            }
        }
