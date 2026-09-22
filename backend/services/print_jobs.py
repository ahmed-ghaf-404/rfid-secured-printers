"""Print-job orchestration and database operations, independent of HTTP."""
from dataclasses import dataclass
from typing import BinaryIO
from sqlalchemy.orm import Session
from models import PrintJob, User
from services import file_storage, printer


class UserNotFoundError(Exception):
    pass


@dataclass(frozen=True)
class PrintResult:
    user_name: str
    system_type: str


def get_history(db: Session) -> list[PrintJob]:
    return db.query(PrintJob).join(PrintJob.user).all()


def send_job(db: Session, user_id: int, filename: str, stream: BinaryIO) -> PrintResult:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise UserNotFoundError("User not found")

    location = file_storage.save_file(filename, stream)
    system_type = printer.print_file(location)
    job = PrintJob(user_id=user.id)
    db.add(job)
    db.commit()
    return PrintResult(user_name=user.name, system_type=system_type)
