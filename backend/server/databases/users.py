from server.databases.utils import database, convert_helper
from bson.objectid import ObjectId
from typing import List

user_collection = database.get_collection("Users")


async def get_all_users() -> list:
    """ Get all users that are stored """
    users = []
    async for user in user_collection.find():
        users.append(convert_helper(user))
    return users


async def login(email: str, password: str) -> dict:
    """ Find a user given email """
    if email:
        user = await user_collection.find_one({"email": email})
        if user and password == user["password"]:
            return convert_helper(user)


async def create_user(data: dict) -> dict:
    """ Creates a User in the collection given <data> """
    if len(data) < 1 or "email" not in data:
        return
    user_exists = await user_collection.find_one({"email": data["email"]})
    if user_exists:
        return
    user = await user_collection.insert_one(data)
    new_user = await user_collection.find_one({"_id": user.inserted_id})
    return convert_helper(new_user)


async def update_user(email: str, data: dict) -> dict:
    """ Updates a User in the collection given their <id> and new <data> """
    if len(data) < 1:
        return
    u_user = await user_collection.update_one(
        {"email": email},
        {"$set": data}
    )
    if u_user:
        return data
