from fastapi import APIRouter, Body, Path, Query, HTTPException

import server.databases.users as db

from server.models.users import (UserSchema, UpdateUser)
from server.models.utils import ResponseModel

router = APIRouter()


@router.get('/get-users')
async def get_all_users():
    all_users = await db.get_all_users()
    return ResponseModel(all_users, "Got users successfully")


@router.post('/create-user')
async def create_user(user: UserSchema = Body(...)):
    dict_user = user.dict()
    new_user = await db.create_user(dict_user)
    if new_user:
        return ResponseModel(new_user, "User created!")
    raise HTTPException(status_code=404, detail="User creation failed")


@router.post('/update-user/')
async def update_user(email: str = Query(None,
                                         description="Email of the user"),
                      req: UpdateUser = Body(...)):
    if req.email is None:
        raise HTTPException(status_code=400, detail="No email given")
    req = {k: v for k, v in req.dict().items() if v is not None}
    user = await db.update_user(email, req)
    if user:
        return ResponseModel(user, "User updated!")
    raise HTTPException(status_code=404, detail="User update failed")


@router.post('/login')
async def try_login(req: dict = Body(...)):
    if "email" not in req or "password" not in req:
        raise HTTPException(
            status_code=400,
            detail="No email or password given")
    login_success = await db.login(req["email"], req["password"])
    if login_success:
        return ResponseModel(login_success, "Login Successful!")
    raise HTTPException(status_code=404, detail="User not found")
