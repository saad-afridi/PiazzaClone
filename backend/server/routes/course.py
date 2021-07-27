from fastapi import APIRouter, Body, Path, HTTPException

import server.databases.course as db

from server.models.course import (ClassSchema, UpdateClass,
                                  PostSchema, UpdatePost, ClassOutSchema)

from typing import List

router = APIRouter()

# Descriptions of parameters
ID_DESC = "The id of the course"
INDEX_DESC = "The index of the post"


# ------------------- ClASS SPECIFIC METHODS -----------------------------

@router.get('/get-courses', response_model=List[ClassOutSchema])
async def get_all_courses():
    all_courses = await db.get_all_courses()
    return all_courses


@router.post('/create-course', response_model=ClassOutSchema)
async def add_course(course: ClassSchema = Body(...)):
    dict_course = course.dict()
    new_course = await db.create_class(dict_course)
    return new_course


@router.get('/{id}', response_model=ClassOutSchema)
async def get_course_with_id(id: str = Path(None, description=ID_DESC)):
    errors = []
    course = await db.get_class(id, errors)
    if course:
        return course
    raise HTTPException(status_code=404, detail=errors)


# ------------------- POST SPECIFIC METHODS ------------------------------

@router.get('/{id}/get-post', response_model=List[PostSchema])
async def get_all_course_posts(id: str = Path(None, description=ID_DESC)):
    errors = []
    posts = await db.get_all_posts(id, errors)
    if posts:
        return posts
    raise HTTPException(status_code=404, detail=errors)


@router.get('/{id}/get-post/{ind}', response_model=PostSchema)
async def get_post_by_index(id: str = Path(None, description=ID_DESC),
                            ind: int = Path(None, description=INDEX_DESC)):
    errors = []
    post = await db.get_post_by_index(id, ind, errors)
    if post:
        return post
    raise HTTPException(status_code=404, detail=errors)


@router.post('/{id}/create-post', response_model=PostSchema)
async def create_post(id: str = Path(None, description=ID_DESC),
                      req: PostSchema = Body(...)):
    errors = []
    req = {k: v for k, v in req.dict().items() if v is not None}
    post = await db.create_post(id, req, errors)
    if post:
        return post
    raise HTTPException(status_code=404, detail=errors)


@router.patch('/{id}/update-post/{ind}', response_model=PostSchema)
async def update_post(id: str = Path(None, description=ID_DESC),
                      ind: int = Path(0, description=INDEX_DESC),
                      req: UpdatePost = Body(...)):
    errors = []
    req = {k: v for k, v in req.dict().items() if v is not None}
    u_post = await db.update_post(id, ind, req, errors)
    if u_post:
        return u_post
    raise HTTPException(status_code=404, detail=errors)
