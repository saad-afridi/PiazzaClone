from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from server.database import (
    add_student,
    delete_student,
    retrieve_student,
    retrieve_students,
    update_student
)

from server.models.student import (
    StudentSchema,
    UpdateStudent
)

from server.models.utils import (
    ResponseModel,
    ErrorResponseModel
)

router = APIRouter()


@router.get('/', response_description="Get all Students")
async def get_all_students():
    all_students = await retrieve_students()
    return ResponseModel(all_students, "Retrieved all students sucessfully.")


@router.post('/', response_description="Student data added into the database")
async def add_student_data(student: StudentSchema = Body(...)):
    student = jsonable_encoder(student)
    new_student = await add_student(student)
    return ResponseModel(new_student, "Student added successfully.")


@router.put('/{id}', response_description="Student data updated in database")
async def update_student_data(id: str, req: UpdateStudent = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_student = await update_student(id, req)
    if updated_student:
        return ResponseModel(
            "Student with ID: {} updated".format(id),
            "Student name updated sucessfully."
        )
    return ErrorResponseModel(
        "An error occurred!", 404, "There was an error updating student data."
    )


@router.delete('/{id}',
               response_description="Student data deleted from database")
async def delete_student_data(id: str):
    deleted_student = await delete_student(id)
    if deleted_student:
        return ResponseModel(
            "Student with ID: {} deleted.".format(id),
            "Student deleted sucessfully."
        )
    return ErrorResponseModel(
        "An error occurred!", 404, "There was an error deleting student data."
    )
