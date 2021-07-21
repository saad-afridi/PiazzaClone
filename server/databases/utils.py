import os
import motor.motor_asyncio as m_asyncio
from bson.objectid import ObjectId
from dotenv import load_dotenv

load_dotenv()

MONGO_DETAILS = os.environ.get('MONGO_ATLAS_URI')

client = m_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.PiazzaClone


def convert_helper(data):
    """ Converts the _id attribute in data to id
    and from type ObjectId to str """
    ans = {k: v for k, v in data.items() if k != "_id"}
    ans["id"] = str(data["_id"])
    return ans
