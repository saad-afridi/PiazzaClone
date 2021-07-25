from fastapi import APIRouter, Body, Path, HTTPException

import server.databases.course as db

from server.models.course import (ClassSchema, UpdateClass,
                                  PostSchema, UpdatePost)
from server.models.utils import (ResponseModel)

router = APIRouter()

# Descriptions of parameters
ID_DESC = "The id of the course"
INDEX_DESC = "The index of the post"


# ------------------- ClASS SPECIFIC METHODS -----------------------------

@router.get('/get-courses')
async def get_all_courses():
    all_courses = await db.get_all_courses()
    return ResponseModel(all_courses, "Got courses successfully.")


@router.post('/create-course')
async def add_course(course: ClassSchema = Body(...)):
    dict_course = course.dict()
    new_course = await db.create_class(dict_course)
    return ResponseModel(new_course, "Course made successfully.", 201)


@router.get('/{id}')
async def get_course_with_id(id: str = Path(None, description=ID_DESC)):
    course = await db.get_class(id)
    if course:
        return ResponseModel(course, "Got Course {} successfully!".format(id))
    raise HTTPException(status_code=404, detail="Class ID not found")


# ------------------- POST SPECIFIC METHODS ------------------------------

@router.get('/{id}/get-post')
async def get_all_course_posts(id: str = Path(None, description=ID_DESC)):
    posts = await db.get_all_posts(id)
    if posts:
        return ResponseModel(posts, "Got all posts!")
    raise HTTPException(status_code=404, detail="Could not get all posts.")


@router.get('/{id}/get-post/{ind}')
async def get_post_by_index(id: str = Path(None, description=ID_DESC),
                            ind: int = Path(None, description=INDEX_DESC)):
    post = await db.get_post_by_index(id, ind)
    if post:
        return ResponseModel(post, "Got post!")
    raise HTTPException(status_code=404, detail="Could not get post.")


@router.post('/{id}/create-post')
async def create_post(id: str = Path(None, description=ID_DESC),
                      req: PostSchema = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    post = await db.create_post(id, req)
    if post:
        return ResponseModel(post, "Post created!", 201)
    raise HTTPException(status_code=404, detail="Post not created")


@router.patch('/{id}/update-post/{ind}')
async def update_post(id: str = Path(None, description=ID_DESC),
                      ind: int = Path(0, description=INDEX_DESC),
                      req: UpdatePost = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    u_post = await db.update_post(id, ind, req)
    if u_post:
        return ResponseModel(
            u_post,
            "Post updated successfully!")
    raise HTTPException(status_code=404, detail="Post not updated.")
