from typing import Optional, List
from enum import Enum
from pydantic import EmailStr, BaseModel, Field


class UserCategory(str, Enum):
    student: 'student'
    instructor: 'instructor'


class UserSchema(BaseModel):
    category: UserCategory = Field(..., Alias="Type")
    school_name: str = Field(...)
    courses: list = Field(...)
    name: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "category": "instructor",
                "school_name": "UofT",
                "courses": [],
                "name": "John Rose",
                "email": "ta1@utoronto.ca",
                "password": "Ilove"
            }
        }


class UpdateUser(BaseModel):
    category: Optional[UserCategory] = None
    school_name: Optional[str] = None
    courses: Optional[list] = None
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

    class Congif:
        schema_extra = {
            "example": {
                "name": "Rose Lisa",
                "email": "ru@utoronto.ca"
            }
        }
