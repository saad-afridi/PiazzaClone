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


async def create_user(data: dict) -> dict:
    """ Creates a User in the collection given <data> """
    if len(data) < 1:
        return
    user = await user_collection.insert_one(data)
    new_user = await user_collection.find_one({"_id": user.inserted_id})
    return convert_helper(new_user)


async def update_user(id: str, data: dict) -> dict:
    """ Updates a User in the collection given their <id> and new <data> """
    if len(data) < 1:
        return
    u_user = user_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": data}
    )
    if u_user:
        return data
