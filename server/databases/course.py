from server.databases.utils import database
from bson.objectid import ObjectId

course_collection = database.get_collection("Classes")


# Helper Function
def _class_helper(course):
    return {
        "id": str(course["_id"]),
        "class_name": course["class_name"],
        "class_num": course["class_num"],
        "estimated_enroll": course["estimated_enroll"],
        "term": course["term"],
        "folders": course["folders"],
        "instructors": course["instructors"],
        "students": course["students"],
        "post_num": course["post_num"],
        "posts": course["posts"]
    }


async def get_all_courses():
    courses = []
    async for course in course_collection.find():
        changed_course = _class_helper(course)
        del changed_course["posts"]
        courses.append(changed_course)
    return courses


async def create_class(data: dict):
    """ Creates a new class with <data> """
    # print(f"DATA: {data}, TYPE: {type(data)}")
    course = await course_collection.insert_one(data)
    new_course = await course_collection.find_one({"_id": course.inserted_id})
    return _class_helper(new_course)


async def get_class(id: str):
    """ Gets class from db with ObjectID(<id>) """
    course = await course_collection.find_one({"_id": ObjectId(id)})
    if course:
        return _class_helper(course)


async def get_all_posts(id: str):
    """ Get all posts for class with ObjectID(id) """
    course = await get_class(id)
    if course:
        return course["posts"]


async def get_post_by_index(id: str, ind: int):
    """Get a single post with index = <ind> from all posts in class with
    _id = <ObjectID(id)>"""
    course = await get_class(id)
    if course["post_num"] < 0 or course["post_num"] <= ind:
        return False
    return course["posts"][ind]


async def update_post(id: str, ind: int, data: dict):
    """ Updates a single field in class <id> and has post <ind> with new <data>"""
    if len(data) < 1:
        return False
    post = await get_post_by_index(id, ind)
    if post:
        for field in post:
            if field not in data:
                data[field] = post[field]
        updated_post = await course_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"posts." + str(ind): data}}, upsert=False)
        print(f"UPDATED P: {updated_post}")
        if updated_post:
            return data
