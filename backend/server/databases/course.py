from server.databases.utils import database, convert_helper
from bson.objectid import ObjectId
from bson.errors import InvalidId
from typing import List, Tuple
from server.models.utils import ErrorModel


course_collection = database.get_collection("Classes")


async def get_all_courses() -> List[dict]:
    """ Get all classes in db """
    courses = []
    async for course in course_collection.find():
        changed_course = convert_helper(course)
        courses.append(changed_course)
    return courses


async def create_class(data: dict) -> dict:
    """ Creates a new class with <data> """
    # print(f"DATA: {data}, TYPE: {type(data)}")
    course = await course_collection.insert_one(data)
    new_course = await course_collection.find_one({"_id": course.inserted_id})
    return convert_helper(new_course)


async def get_class(id: str, errors: list) -> Tuple[dict, List[dict]]:
    """ Gets class from db with ObjectID(<id>) """
    course = {}
    try:
        course = await course_collection.find_one({"_id": ObjectId(id)})
        if course:
            return convert_helper(course)
        else:
            errors.append(ErrorModel(["path", "id"],
                                     "course with {} not found".format(
                id),
                "value_error"))
    except InvalidId:
        errors.append(ErrorModel(["path", "id"],
                                 "{} is not a valid id".format(id),
                                 "value_error"))


# ------------------- POST SPECIFIC METHODS ------------------------------


async def get_all_posts(id: str, errors: list) -> List[dict]:
    """ Get all posts for class with ObjectID(id) """
    course = await get_class(id, errors)
    if course:
        return course["posts"]


async def get_post_by_index(id: str, ind: int, errors: list) -> dict:
    """Get a single post with index = <ind> from all posts in class with
    _id = <ObjectID(id)>"""
    course = await get_class(id, errors)
    if course["post_num"] < 0 or course["post_num"] <= ind:
        errors.append(ErrorModel(["path", "index"], "invalid index", 
                                 "value_error"))
    else:
        return course["posts"][ind]


async def create_post(id: str, data: dict, errors: list) -> dict:
    """ Creates a single post in class with <id> """
    course = await get_class(id, errors)
    if course:
        data["index"] = course["post_num"]
        
        # add post
        post = await course_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"posts." + str(course["post_num"]): data}},
            upsert=False
        )
        # Update post_num in course after adding post
        await course_collection.update_one(
            {"_id": ObjectId(id)},
            {"$inc": {"post_num": 1}},
            upsert=False
        )
        return data


async def update_post(id: str, ind: int, data: dict, errors: list) -> dict:
    """ Updates a single field in class <id> and has post <ind> with
    new <data>"""
    if len(data) < 1:
        return
    post = await get_post_by_index(id, ind, errors)
    if post:
        for field in post:
            if field not in data:
                data[field] = post[field]
        updated_post = await course_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"posts." + str(ind): data}}, upsert=False)
        return data
