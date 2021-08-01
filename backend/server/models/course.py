from __future__ import annotations
from typing import Optional, List, Dict, Set
from pydantic import BaseModel, Field, EmailStr, validator


post_types = ["question", "note", "poll"]
post_readers = ["entire_class", "instructors"]


class FollowUpSchema(BaseModel):
    name: str = Field(...)
    content: str = Field(...)
    replies: List[dict] = Field(...)

    class Config:
        schemaExtra = {
            "example": {
                "name": "John Smith",
                "content": "Yeah but just to add on it's fine if we don't do "
                "it right?",
                "replies": [{"name": "TA 1", "content": "Yes"}]
            }
        }


# ------------------------------- POST SCHEMAS -------------------------------
class PostSchema(BaseModel):
    index: Optional[int] = 0
    category: str = "question"
    post_to: str = "entire_class"
    summary: str = Field(...)
    details: str = Field(...)
    follow_ups: List[FollowUpSchema] = Field(...)
    student_answer: str = Field(...)
    instructor_answer: str = Field(...)
    marked_as_duplicate: bool = Field(...)

    @validator('category')
    def category_is_one_of_posttype(cls, v):
        if v not in post_types:
            raise ValueError('invalid post category')
        return v

    @validator('post_to')
    def post_to_one_of_post_readers(cls, v):
        if v not in post_readers:
            raise ValueError('invalid post to')
        return v

    class Config:
        schema_extra = {
            "example": {
                "index": 0,
                "category": "question",
                "post_to": "entire_class",
                "summary": "Why was the midterm so hard?",
                "details": ("I was stuck on q3 for most of the test "
                            "and I didnt even have enough time to "
                            "finish the whole thing"),
                "follow_ups": [],
                "student_answer": "Yeah it was really hard for me too!",
                "instructor_answer": "I thought I made it too easy actually.",
                "marked_as_duplicate": "False"
            }
        }


class UpdatePost(BaseModel):
    index: Optional[int] = None
    category: Optional[str] = None
    post_to: Optional[str] = None
    summary: Optional[str] = None
    details: Optional[str] = None
    follow_ups: List[str] = None
    student_answer: Optional[str] = None
    instructor_answer: Optional[str] = None
    marked_as_duplicate: Optional[bool] = None

    @validator('category')
    def category_is_one_of_posttype(cls, v):
        if v not in post_types:
            raise ValueError('invalid post category')
        return v

    @validator('post_to')
    def post_to_one_of_post_readers(cls, v):
        if v not in post_readers:
            raise ValueError('invalid post to')
        return v

    class Config:
        schema_extra = {
            "example": {
                "summary": "Why was the midterm so easy?"
            }
        }


# ------------------------------- CLASS SCHEMAS -------------------------------
class ClassSchema(BaseModel):
    class_name: str = Field(...)
    class_num: str = Field(...)
    estimated_enroll: int = Field(..., gt=0)
    term: str = Field(...)
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
                "instructors": ["ta1@utoronto.ca", "ta2@utoronto.ca",
                                "prof1@utoronto.ca"],
                "students": ["ak@utoronto.ca", "abij@utoronto.ca",
                             "kandice@utoronto.ca"],
                "post_num": 1,
                "posts": [{
                    "index": 0,
                    "category": "question",
                    "post_to": "entire_class",
                    "summary": "Why was the midterm so hard?",
                    "details": ("I was stuck on q3 for most of the test "
                                "and I didnt even have enough time to "
                                "finish the whole thing"),
                    "follow_ups": [],
                    "student_answer": "",
                    "instructor_answer": "",
                    "marked_as_duplicate": "False"
                }]
            }
        }


class ClassOutSchema(BaseModel):
    id: str = Field(...)
    class_name: str = Field(...)
    class_num: str = Field(...)
    estimated_enroll: int = Field(..., gt=0)
    term: str = Field(...)
    instructors: List[EmailStr] = Field(...)
    students: List[EmailStr] = Field(...)
    post_num: int = 1

    class Config:
        schema_extra = {
            "example": {
                "id": "60f8905176818ccf75c705e6",
                "class_name": "Intro. To Stat",
                "class_num": "STA256H5",
                "estimated_enroll": 50,
                "term": "FALL2020",
                "instructors": ["ta1@utoronto.ca",
                                "prof1@utoronto.ca"],
                "students": ["ak@utoronto.ca", "abij@utoronto.ca",
                             "kandice@utoronto.ca"],
                "post_num": 1,
            }
        }


class UpdateClass(BaseModel):
    class_name: Optional[str] = None
    class_num: Optional[str] = None
    estimated_enroll: Optional[int] = None
    term: Optional[str] = None
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
