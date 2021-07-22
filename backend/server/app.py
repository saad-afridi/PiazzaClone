from fastapi import FastAPI

from server.routes.course import router as ClassRouter
from server.routes.users import router as UserRouter

app = FastAPI()

app.include_router(ClassRouter, tags=['Courses'], prefix='/class')
app.include_router(UserRouter, tags=['Users'], prefix='')
