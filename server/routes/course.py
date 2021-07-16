from fastapi import APIRouter, Body, Path, Query, HTTPException
from fastapi.encoders import jsonable_encoder

from server.databases.course import (
    create_class,
    get_class,
    get_all_posts,
    get_post_by_index,
    update_post
)
from server.models.course import (ClassSchema, UpdateClass)
from server.models.utils import (ResponseModel)

router = APIRouter()


@router.get('/{id}', response_description="Get Class with id")
async def get_class_with_id(id: str = Path(None, description="The id of the"
                                           "course you'd like to get")):
    course = get_class(id)
    if course:
        return course
    return HTTPException(status_code=404, detail="Class ID not found")


@router.post('/create', response_description="Add class")
async def add_class(course: ClassSchema = Body(...)):
    course = jsonable_encoder(course)
    new_course = create_class(course)
    return ResponseModel(new_course, "Course made successfully.")


@router.put('/{id}/', response_description="Update Post in Course <ID>")
async def update_post_by_index(id: str = Path(None, description="The id of the"
                                              "course you'd like to find post"
                                              "from")):
    pass
