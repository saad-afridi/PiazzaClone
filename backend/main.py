import uvicorn

if __name__ == "__main__":
    uvicorn.run('server.app:app', reload=True, port=8000)
    
