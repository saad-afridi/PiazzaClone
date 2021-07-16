import os
import motor.motor_asyncio as m_asyncio
from bson.objectid import ObjectId
from dotenv import load_dotenv

load_dotenv()

MONGO_DETAILS = os.environ.get('MONGO_ATLAS_URI')

client = m_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.PiazzaClone
