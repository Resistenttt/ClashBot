from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
from pathlib import Path
import random
import os

app = FastAPI()

# Пути к статике
BASE_DIR = Path(__file__).parent.parent
static_path = BASE_DIR / "static"
app.mount("/static", StaticFiles(directory=static_path), name="static")

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

# Хранение балансов (временное решение)
user_balances = {}

@app.post("/open_case/{case_type}")
async def open_case(case_type: str, request: Request):
    data = await request.json()
    user_id = data.get("user_id", 0)
    
    if case_type not in cases:
        raise HTTPException(status_code=404, detail="Кейс не найден")
    
    # Инициализация баланса
    if user_id not in user_balances:
        user_balances[user_id] = 5000
    
    case = cases[case_type]
    
    # Проверка баланса
    if user_balances[user_id] < case["price"]:
        raise HTTPException(status_code=400, detail="Недостаточно средств")
    
    # Списание и выдача предмета
    user_balances[user_id] -= case["price"]
    item = random.choice(case["items"])
    
    return {
        "item": item,
        "balance": user_balances[user_id],
        "status": "success"
    }

@app.get("/", response_class=HTMLResponse)
async def root():
    return FileResponse(static_path / "index.html")

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(static_path / "favicon.ico")

# Для Telegram WebApp проверки
@app.get("/initData")
async def get_init_data(request: Request):
    return {
        "is_telegram": "Telegram-WebApp" in request.headers.get("user-agent", "")
    }
