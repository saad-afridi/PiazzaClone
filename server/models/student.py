from typing import Optional
from pydantic import BaseModel, EmailStr, Field   

class StudentSchema(BaseModel):
    fullname: str = Field(...)
    email: EmailStr = Field(...)
    year: int = Field(..., gt=0, lt=9)
    gpa: float = Field(..., le=4.0)
    
    class Config: 
        schema_extra = {
            "example": {
                "fullname": "John Doe",
                "email": "jdoe@gmail.com",
                "year": 2,
                "gpa": 3.2
            }
        }
        
        
class UpdateStudent(BaseModel):
    fullname: Optional[str] = None
    email: Optional[EmailStr] = None 
    year: Optional[str] = None
    gpa: Optional[str] = None
    
    class Config: 
        schema_extra = {
            "example": {
                "fullname": "John Doe",
                "email": "jdoe@gmail.com",
                "year": 2,
                "gpa": 3.2
            }
        }
    
def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message
    }
    
def ErrorResponseModel(error, code, message):
    return {"ERROR": error, "code": code, "message": message}