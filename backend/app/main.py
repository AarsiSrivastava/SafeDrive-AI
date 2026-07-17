from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.routes.upload import router as upload_router

app = FastAPI(

    title="SafeDrive AI API"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Serve processed videos
app.mount(
    "/outputs",
    StaticFiles(directory="app/outputs"),
    name="outputs"
)

app.include_router(
    upload_router,
    prefix="/upload",
    tags=["Video Upload"]
)

@app.get("/")
def home():
    return {
        "message": "SafeDrive AI Backend Running"
    }