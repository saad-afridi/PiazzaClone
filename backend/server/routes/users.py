from fastapi import APIRouter, Body, Path, Query, HTTPException

import server.databases.users as db

from server.models.users import (UserSchema, UpdateUser, UserLogin)
from server.models.utils import ErrorModel

from typing import List

router = APIRouter()


@router.get('/get-users', response_model=List[UserSchema])
async def get_all_users():
    all_users = await db.get_all_users()
    return all_users


@router.post('/register', response_model=UserSchema)
async def try_register(user: UserSchema = Body(...)):
    errors = []
    dict_user = user.dict()
    new_user = await db.create_user(dict_user, errors)
    if new_user:
        return new_user
    raise HTTPException(status_code=404, detail=errors)


@router.put('/update-user/', response_model=UpdateUser)
async def update_user(email: str = Query(None,
                                         description="Email of the user"),
                      req: UpdateUser = Body(...)):
    errors = []
    if email is None:
        errors.append(ErrorModel(["query", "email"], "no email found",
                                 "value_error"))
        raise HTTPException(status_code=404, detail=errors)
    
    req = {k: v for k, v in req.dict().items() if v is not None}
    user = await db.update_user(email, req, errors)
    if user:
        return user
    raise HTTPException(status_code=404, detail=errors)


@router.post('/login', response_model=UserSchema)
async def try_login(req: UserLogin = Body(...)):
    errors = []
    login_success = await db.login(req.dict(), errors)
    if login_success:
        return login_success
    raise HTTPException(status_code=404, detail=errors)
