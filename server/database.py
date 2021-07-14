import os 
import motor.motor_asyncio as m_asyncio
from bson.objectid import ObjectId
from dotenv import load_dotenv 

load_dotenv()

MONGO_DETAILS = os.environ.get('MONGO_ATLAS_URI')

client = m_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.PiazzaClone

student_collection = database.get_collection("students_collection")

# Helpers
def student_hlper(student) -> dict:
    return {
        "id": str(student["_id"]),
        "fullname": student["fullname"],
        "email": student["email"],
        "year": student["year"],
        "gpa": student["gpa"]
    }

# Retrieve all students from Database
async def retrieve_students():
    students = []
    async for student in student_collection.find():
        students.append(student_hlper(student))
    return students 

# Add new student in database
async def add_student(student_data: dict):
    student = await student_collection.insert_one(student_data)
    new_student = await student_collection.find_one({"_id": student.inserted_id})
    return student_hlper(new_student)

# Retrieve a student with matching ID
async def retrieve_student(id: str, data: dict):
    if len(data) < 1:
        return False 
    student = await student_collection.find_one({"_id": ObjectId(id)});
    if student:
        return student_hlper(student);
    
# Update a student with matching ID
async def update_student(id: str, data: dict):
    # Return false if an empty request body is sent
    if len(data) < 1:
        return False
    student = await student_collection.find_one({"_id": ObjectId(id)});
    if student:
        updated_student = await student_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_student:
            return True 
        return False
    
# Delete a student from the database
async def delete_student(id: str):
    student = await student_collection.find_one({"_id": ObjectId(id)});
    if student:
        await student_collection.delete_one({"_id": ObjectId(id)});
        return True 
     