from fastapi import APIRouter, Body, Path, Query, HTTPException

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

# Descriptions of parameters
ID_DESC = "The id of the course"
INDEX_DESC = "The index of the post"


@router.post('/create', response_description="Add class")
async def add_class(course: ClassSchema = Body(...)):
    dict_course = course.dict()
    new_course = await create_class(dict_course)
    return ResponseModel(new_course, "Course made successfully.")


@router.get('/{id}', response_description="Get course")
async def get_class_with_id(id: str = Path(None, description=ID_DESC)):
    course = await get_class(id)
    print(course)
    if course:
        return ResponseModel(course, "Got Course {} successfully!".format(id))
    return HTTPException(status_code=404, detail="Class ID not found")


@router.get('/{id}/get-post',
            response_description="Get all posts from course")
async def get_all_class_posts(id: str = Path(None, description=ID_DESC)):
    posts = await get_all_posts(id)
    if posts:
        return ResponseModel(posts, "Got all posts successfully")
    return HTTPException(status_code=404, detail="Something went wrong!")


@router.get('/{id}/get-post/',
            response_description="Get a specific post with index from course")
async def get_post_by_index(id: str = Path(None, description=ID_DESC),
                            ind: int = Query(0, title="Index",
                                             description=INDEX_DESC)):
    post = await get_post_by_index(id, ind)
    if post:
        return ResponseModel(post, "Got post successfully!")
    return HTTPException(status_code=404, detail="Could not get post")


@router.put('/{id}/update-post/',
            response_description="Update post in Course using id")
async def update_post(id: str = Path(None, description=ID_DESC),
                      ind: int = Query(0, title="Index",
                                       description=INDEX_DESC),
                      data: ClassSchema = Body(...)):
    u_post = update_post(id, ind, data)
    if u_post:
        return ResponseModel(
            "Post with index {ind} in Class {id} updated".format(ind, id),
            "Post updated successfully!")
    return HTTPException(status_code=404, detail="Post not updated")
