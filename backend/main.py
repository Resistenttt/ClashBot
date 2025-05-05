from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path

# Сначала создаем приложение
app = FastAPI()

# Затем настраиваем статику
static_path = Path(__file__).parent.parent / "static"
app.mount("/static", StaticFiles(directory=str(static_path)), name="static")

@app.get("/")
async def root():
    return {"message": "Hello World"}
