from typing import Optional, List, Dict, Set
from pydantic import BaseModel, Field, EmailStr


class PostSchema(BaseModel):
    index: int = 0
    category: str = "question"
    post_to: str = "entire_class"
    folders: str = "general"
    summary: str = Field(...)
    details: str = Field(...)
    follow_ups: List[str] = Field(...)
    replies: List[str] = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "index": 0,
                "category": "question",
                "post_to": "entire_class",
                "folders": "midterm",
                "summary": "Why was the midterm so hard?",
                "details": ("I was stuck on q3 for most of the test "
                            "and I didnt even have enough time to "
                            "finish the whole thing"),
                "follow_ups": ["Yeah, Q3 was REALLY hard!",
                               "Nah it wasnt that bad"],
                "replies": ["Yeah, It was pretty bad",
                            "I thought I made the test easier than "
                            "past offerrings. We will mark easy dont "
                            "worry!"]
            }
        }


class UpdatePost(BaseModel):
    index: Optional[int] = None
    category: Optional[str] = None
    post_to: Optional[str] = None
    folders: Optional[str] = None
    summary: Optional[str] = None
    details: Optional[str] = None
    follow_ups: List[str] = None
    replies: List[str] = None

    class Config:
        schema_extra = {
            "example": {
                "summary": "Why was the midterm so easy?"
            }
        }


class ClassSchema(BaseModel):
    class_name: str = Field(...)
    class_num: str = Field(...)
    estimated_enroll: int = Field(..., gt=0)
    term: str = Field(...)
    folders: List[str] = Field(...)
    instructors: List[EmailStr] = Field(...)
    students: List[EmailStr] = Field(...)
    post_num: int = 1
    posts: List[PostSchema] = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "class_name": "Intro. To Computer Science",
                "class_num": "CSC148H5",
                "estimated_enroll": 200,
                "term": "FALL2020",
                "folders": ["midterm", "A1", "A2", "A3", "exam", "general"],
                "instructors": ["ta1@utoronto.ca", "ta2@utoronto.ca",
                                "prof1@utoronto.ca"],
                "students": ["ak@utoronto.ca", "abij@utoronto.ca",
                             "kandice@utoronto.ca"],
                "post_num": 1,
                "posts": [
                    {
                        "index": 0,
                        "category": "question",
                        "post_to": "entire_class",
                        "folders": "midterm",
                        "summary": "Why was the midterm so hard?",
                        "details": ("I was stuck on q3 for most of the test "
                                    "and I didnt even have enough time to "
                                    "finish the whole thing"),
                        "follow_ups": ["Yeah, Q3 was REALLY hard!",
                                       "Nah it wasnt that bad"],
                        "replies": ["Yeah, It was pretty bad",
                                    "I thought I made the test easier than "
                                    "past offerrings. We will mark easy dont "
                                    "worry!"]
                    }
                ]
            }
        }


class UpdateClass(BaseModel):
    class_name: Optional[str] = None
    class_num: Optional[str] = None
    estimated_enroll: Optional[int] = None
    term: Optional[str] = None
    folders: Optional[List[str]] = None
    instructors: Optional[List[EmailStr]] = None
    students: List[EmailStr] = None
    post_num: Optional[int] = None
    posts: Optional[List[PostSchema]] = None

    class Config:
        schema_extra: {
            "example": {
                "class_name": "Intro. To CS",
                "term": "WINTER2020"
            }
        }
