from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import random
import os

app = FastAPI()
BASE_DIR = os.path.dirname(__file__)
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")

# Мок-контент кейсов (7 предметов в каждом)
CASES = {
    'rusty': [
        {"name": "SG 553", "desc": "Army Sheen (Minimal Wear)", "img": "https://i.imgur.com/1.png", "rarity": "common"},
        {"name": "P250", "desc": "Boreal Forest (Battle-Scarred)", "img": "https://i.imgur.com/2.png", "rarity": "common"},
        {"name": "Five-SeveN", "desc": "Anodized Gunmetal (Factory New)", "img": "https://i.imgur.com/3.png", "rarity": "uncommon"},
        {"name": "AWP", "desc": "Atheris (Field-Tested)", "img": "https://i.imgur.com/4.png", "rarity": "rare"},
        {"name": "AK-47", "desc": "Redline (Minimal Wear)", "img": "https://i.imgur.com/5.png", "rarity": "epic"},
        {"name": "Desert Eagle", "desc": "Code Red (Factory New)", "img": "https://i.imgur.com/6.png", "rarity": "legendary"},
        {"name": "AWP", "desc": "Dragon Lore (Factory New)", "img": "https://i.imgur.com/7.png", "rarity": "legendary"},
    ],
    # ... другие кейсы (копируй структуру)
}

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/cases")
async def get_cases():
    return JSONResponse(content={"cases": list(CASES.keys())})

@app.get("/case-content")
async def get_case_content(case: str):
    return JSONResponse(content={"items": CASES.get(case, [])})

@app.post("/open-case")
async def open_case(case: str = Form(...)):
    items = CASES.get(case, [])
    if not items:
        return JSONResponse(content={"error": "Нет такого кейса"}, status_code=400)
    won = random.choice(items)
    return JSONResponse(content={"item": won})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
