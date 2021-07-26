from typing import Optional, List
from pydantic import EmailStr, BaseModel, Field, validator


class UserSchema(BaseModel):
    category: str = Field(..., Alias="Type")
    courses: list = Field(...)
    name: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)

    @validator('category')
    def category_is_instructor_or_student(cls, v):
        if v != 'student' and v != 'instructor':
            raise ValueError('Must either be <student> or <instructor>')
        return v

    @validator('password')
    def password_is_atleast_six_characters(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be atleast 6 characters long')
        return v

    class Config:
        schema_extra = {
            "example": {
                "category": "instructor",
                "school_name": "UofT",
                "courses": [],
                "name": "John Rose",
                "email": "ta1@utoronto.ca",
                "password": "Ilove24"
            }
        }


class UpdateUser(BaseModel):
    category: Optional[str] = None
    courses: Optional[list] = None
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

    @validator('category')
    def category_is_instructor_or_student(cls, v):
        if v != 'student' and v != 'instructor':
            raise ValueError('Must either be <student> or <instructor>')
        return v

    @validator('password')
    def password_is_atleast_six_characters(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be atleast 6 characters long')
        return v

    class Config:
        schema_extra = {
            "example": {
                "name": "Rose Lisa",
                "email": "ru@utoronto.ca"
            }
        }


class UserLogin(BaseModel):

    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "email": "ru@utoronto.ca",
                "password": "Ilovemyself"
            }
        }
