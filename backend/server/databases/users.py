from server.databases.utils import database, convert_helper
from bson.objectid import ObjectId
from typing import List
from server.models.utils import ErrorModel


user_collection = database.get_collection("Users")


async def get_all_users() -> list:
    """ Get all users that are stored """
    users = []
    async for user in user_collection.find():
        users.append(convert_helper(user))
    return users


async def create_user(data: dict, errors: list) -> dict:
    """ Creates a User in the collection given <data> """
    if len(data) < 1:
        errors.append(ErrorModel(["body"], "no data", "value_error"))
    else:
        user_exists = await user_collection.find_one({"email": data["email"]})
        if user_exists:
            errors.append(ErrorModel(["body", "email"],
                                     "email is taken",
                                     "value_error"))
        else:
            user = await user_collection.insert_one(data)
            new_user = await user_collection.find_one({"_id": user.inserted_id})
            return convert_helper(new_user)


async def update_user(email: str, data: dict, errors: list) -> dict:
    """ Updates a User in the collection given their <id> and new <data> """
    if len(data) < 1:
        errors.append(ErrorModel(["body"], "no data", "value_error"))
    # Check if user with email exists
    user_exists = await user_collection.find_one({"email": email})
    if not user_exists:
        errors.append(ErrorModel(["query", "email"],
                                 "no user with email found",
                                 "value_error"))
        return

    # Check if new email isn't taken by anyone else
    if "email" in data:
        check_new_email = await user_collection.find_one({"email": data["email"]})
        if check_new_email and not check_new_email == user_exists:
            errors.append(ErrorModel(["body", "email"],
                                     "email is taken",
                                     "value_error"))
            return

    # Updating
    u_user = await user_collection.update_one(
        {"email": email},
        {"$set": data},
        upsert=False
    )

    # initailizing the missing values
    for prop in user_exists:
        if prop not in data:
            data[prop] = user_exists[prop]
    return data


async def login(userInfo: dict, errors: list) -> dict:
    """ Find a user given email """
    user = await user_collection.find_one({"email": userInfo["email"]})
    if user:
        if user["password"] == userInfo["password"]:
            return convert_helper(user)
        else:
            errors.append(ErrorModel(["body", "password"],
                                     "password is incorrect",
                                     "value_error"))
    else:
        errors.append(ErrorModel(["body", "email"], "email is incorrect",
                                 "value_error"))
