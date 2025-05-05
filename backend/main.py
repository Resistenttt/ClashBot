from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pathlib import Path
import random
import os

app = FastAPI()

# Настройка путей
BASE_DIR = Path(__file__).parent.parent
static_dir = BASE_DIR / "static"
app.mount("/static", StaticFiles(directory=static_dir), name="static")

# База данных (временная)
users_db = {1: {"balance": 5000}}

# Кейсы
cases = {
    "rusty": {
        "price": 500,
        "items": ["Glock-18 | Moonrise", "USP-S | Cortex", "P250 | Муравьиный улей"]
    },
    "tactical": {
        "price": 3000,
        "items": ["AWP | Красная линия", "AK-47 | Огненный змей", "★ Нож | Ультрафиолет"]
    }
}

@app.post("/open_case/{case_type}")
async def open_case(case_type: str, request: Request):
    data = await request.json()
    user_id = data.get("user_id", 1)
    
    if case_type not in cases:
        raise HTTPException(status_code=404, detail="Кейс не найден")
    
    user = users_db.get(user_id, {"balance": 0})
    case = cases[case_type]
    
    if user["balance"] < case["price"]:
        return JSONResponse(
            {"error": "Недостаточно средств"}, 
            status_code=400
        )
    
    user["balance"] -= case["price"]
    item = random.choice(case["items"])
    
    return {
        "item": item,
        "balance": user["balance"],
        "status": "success"
    }

@app.get("/")
async def root():
    return FileResponse(static_dir / "index.html")

@app.get("/favicon.ico")
async def favicon():
    return FileResponse(static_dir / "favicon.ico")
