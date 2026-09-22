"""Persistence of uploaded print documents."""
from pathlib import Path
from typing import BinaryIO

UPLOAD_DIR = Path("uploaded_files")


def save_file(filename: str, stream: BinaryIO) -> Path:
    UPLOAD_DIR.mkdir(exist_ok=True)
    location = UPLOAD_DIR / filename
    with location.open("wb") as destination:
        destination.write(stream.read())
    return location
