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

CASES = [
    {
        "key": "rusty",
        "title": "Rusty Case",
        "price": 500,
        "img": "/assets/Case1.png",
        "items": [
            {"name": "SG 553", "desc": "Army Sheen (Minimal Wear)", "img": "/assets/or1.png"},
            {"name": "P250", "desc": "Boreal Forest (Battle-Scarred)", "img": "//assets/or2.png"},
            {"name": "Five-SeveN", "desc": "Anodized Gunmetal (Factory New)", "img": "/assets/or3.png"},
            {"name": "AWP", "desc": "Atheris (Field-Tested)", "img": "/assets/or4.png"},
            {"name": "AK-47", "desc": "Redline (Minimal Wear)", "img": "/assets/or5.png"},
            {"name": "Desert Eagle", "desc": "Code Red (Factory New)", "img": "https://community.akamai.steamstatic.com/economy/image/1k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k/360fx360f"},
            {"name": "AWP", "desc": "Dragon Lore (Factory New)", "img": "https://community.akamai.steamstatic.com/economy/image/0k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k/360fx360f"},
        ]
    },
    {
        "key": "tactical",
        "title": "Tactical Case",
        "price": 3000,
        "img": "/assets/Case2.png",
        "items": [
            {"name": "M4A1-S", "desc": "Guardian (Minimal Wear)", "img": "/assets/or6.png"},
            {"name": "USP-S", "desc": "Orion (Factory New)", "img": "/assets/or7.png"},
            {"name": "FAMAS", "desc": "Commemoration (Minimal Wear)", "img": "/assets/or8.png"},
            {"name": "AWP", "desc": "Atheris (Field-Tested)", "img": "/assets/or9.png"},
            {"name": "AK-47", "desc": "Redline (Minimal Wear)", "img": "/assets/or10.png"},
            {"name": "Desert Eagle", "desc": "Code Red (Factory New)", "img": "https://community.akamai.steamstatic.com/economy/image/1k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k/360fx360f"},
            {"name": "AWP", "desc": "Dragon Lore (Factory New)", "img": "https://community.akamai.steamstatic.com/economy/image/0k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k/360fx360f"},
        ]
    },
    {
        "key": "clutch",
        "title": "Clutch Case",
        "price": 5000,
        "img": "https://cdn3d.iconscout.com/3d/premium/thumb/black-box-6348830-5222331.png",
        "items": [
            {"name": "AWP", "desc": "Atheris (Field-Tested)", "img": "https://community.akamai.steamstatic.com/economy/image/3k2j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k/360fx360f"},
            {"name": "AK-47", "desc": "Redline (Minimal Wear)", "img": "https://community.akamai.steamstatic.com/economy/image/2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k/360fx360f"},
            {"name": "Desert Eagle", "desc": "Code Red (Factory New)", "img": "https://community.akamai.steamstatic.com/economy/image/1k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k/360fx360f"},
            {"name": "AWP", "desc": "Dragon Lore (Factory New)", "img": "https://community.akamai.steamstatic.com/economy/image/0k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k/360fx360f"},
            {"name": "Five-SeveN", "desc": "Anodized Gunmetal (Factory New)", "img": "https://community.akamai.steamstatic.com/economy/image/5k4j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k3j2k/360fx360f"},
            {"name": "SG 553", "desc": "Army Sheen (Minimal Wear)", "img": "https://community.akamai.steamstatic.com/economy/image/QmZyQ2Hf9W2v3bK7Wc3v5wqCz6QKzQ8Jz8Dq2F3F8h2D3Q/360fx360f"},
            {"name": "P250", "desc": "Boreal Forest (Battle-Scarred)", "img": "https://community.akamai.steamstatic.com/economy/image/8jYQ6v9U2n5k2v9k2m5k2v9k2m5k2v9k2m5k2v9k2m5k2v9k/360fx360f"},
        ]
    }
]

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/cases")
async def get_cases():
    return JSONResponse(content={"cases": CASES})

@app.get("/case-content")
async def get_case_content(case: str):
    for c in CASES:
        if c["key"] == case:
            return JSONResponse(content={"items": c["items"]})
    return JSONResponse(content={"items": []})

@app.post("/open-case")
async def open_case(case: str = Form(...)):
    for c in CASES:
        if c["key"] == case:
            won = random.choice(c["items"])
            return JSONResponse(content={"item": won})
    return JSONResponse(content={"error": "Нет такого кейса"}, status_code=400)

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)
