from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import random
import uvicorn

app = FastAPI()

# Монтирование статики
app.mount("/static", StaticFiles(directory="static"), name="static")

# База данных (временная)
users_db = {1: {"balance": 5000}}

# Логика кейсов
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
async def open_case(case_type: str, user_id: int = 1):
    if case_type not in cases:
        raise HTTPException(status_code=404, detail="Кейс не найден")
    
    user = users_db.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    
    case = cases[case_type]
    if user["balance"] < case["price"]:
        raise HTTPException(status_code=400, detail="Недостаточно средств")
    
    user["balance"] -= case["price"]
    item = random.choice(case["items"])
    
    return {
        "item": item,
        "balance": user["balance"],
        "status": "success"
    }

@app.get("/")
async def serve_index():
    return FileResponse("static/index.html")

@app.get("/favicon.ico")
async def favicon():
    return FileResponse("static/assets/logo.png")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
