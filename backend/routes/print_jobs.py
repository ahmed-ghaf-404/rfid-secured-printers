"""HTTP endpoints and response serialization for print jobs."""
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import get_db
from services import print_jobs
from services.printer import PrintError

router = APIRouter()


class PrintJobResponse(BaseModel):
    id: int
    user_id: int
    user_name: str
    status: str
    timestamp: str

    class Config:
        orm_mode = True


@router.get("/history", response_model=list[PrintJobResponse])
def get_print_history(db: Session = Depends(get_db)):
    return [
        PrintJobResponse(
            id=job.id,
            user_id=job.user_id,
            user_name=job.user.name,
            status=job.status,
            timestamp=job.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        )
        for job in print_jobs.get_history(db)
    ]


@router.post("/send")
def send_print_job(
    user_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    try:
        result = print_jobs.send_job(db, user_id, file.filename, file.file)
    except print_jobs.UserNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except PrintError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return {
        "message": f"File '{file.filename}' printed for user {result.user_name} on {result.system_type}"
    }
