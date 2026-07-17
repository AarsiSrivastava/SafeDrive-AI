from fastapi import APIRouter, UploadFile, File
import shutil
import os
from app.services.detector import detect_video

router = APIRouter()

UPLOAD_DIR = "app/uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/video")
async def upload_video(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    result = detect_video(file_path)

    return {
        "message": "Video uploaded successfully",
        "filename": file.filename,
        "detection": result
    }