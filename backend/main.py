from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import random

app = FastAPI()

# Статика
static_path = Path(__file__).parent.parent / "static"
app.mount("/static", StaticFiles(directory=str(static_path)), name="static")

# Логика кейсов
cases = {
    "rusty": {
        "price": 500,
        "items": [
            "Glock-18 | Moonrise",
            "USP-S | Cortex",
            "P250 | Муравьиный улей"
        ]
    },
    "tactical": {
        "price": 3000,
        "items": [
            "AWP | Красная линия",
            "AK-47 | Огненный змей",
            "★ Нож | Ультрафиолет"
        ]
    }
}

@app.post("/open_case/{case_type}")
async def open_case(case_type: str, user_id: int):
    if case_type not in cases:
        raise HTTPException(status_code=404, detail="Кейс не найден")
    
    case = cases[case_type]
    item = random.choice(case["items"])
    
    return {
        "item": item,
        "balance": 5000 - case["price"]  # В реальном приложении храните баланс в БД
    }

@app.get("/")
async def root():
    return FileResponse("static/index.html")
