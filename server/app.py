from fastapi import FastAPI

from server.routes.course import router as ClassRouter

app = FastAPI()

app.include_router(ClassRouter, tags=['Class'], prefix='')


@app.get('/', tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}
