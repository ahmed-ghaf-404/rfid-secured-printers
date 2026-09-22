"""Communication with the host operating system's printing service."""
from pathlib import Path
import platform
import subprocess


class PrintError(Exception):
    pass


def print_file(location: Path) -> str:
    system_type = platform.system()
    try:
        if system_type == "Windows":
            import win32api
            import win32print

            win32print.GetDefaultPrinter()
            win32api.ShellExecute(0, "print", str(location), None, ".", 0)
        elif system_type in ("Linux", "Darwin"):
            subprocess.run(["lpr", str(location)], check=True)
        else:
            raise RuntimeError(f"Unsupported OS: {system_type}")
    except Exception as exc:
        raise PrintError(f"Print error: {exc}") from exc
    return system_type
