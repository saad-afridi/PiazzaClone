from fastapi import APIRouter, Body 
from fastapi.encoders import jsonable_encoder

from FastAPI.server.database import (
    add_student,
    delete_student,
    retrieve_student,
    retrieve_students,
    update_student
)

from FastAPI.server.models.student import (
    ErrorResponseModel,
    ResponseModel,
    StudentSchema,
    UpdateStudent
)

router = APIRouter();