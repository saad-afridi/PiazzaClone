from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.routes.course import router as ClassRouter
from server.routes.users import router as UserRouter

app = FastAPI()

app.include_router(ClassRouter, tags=['Courses'], prefix='/class')
app.include_router(UserRouter, tags=['Users'], prefix='')

origins = [
    'http://localhost:3000',
    'http://localhost',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
