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
        "img": "/static/Case1.png",
        "items": [
            {"name": "SG 553", "desc": "Army Sheen (Minimal Wear)", "img": "/static/or1.png"},
            {"name": "P250", "desc": "Boreal Forest (Battle-Scarred)", "img": "/static/or2.png"},
            {"name": "Five-SeveN", "desc": "Anodized Gunmetal (Factory New)", "img": "/static/or3.png"},
            {"name": "AWP", "desc": "Atheris (Field-Tested)", "img": "/static/or4.png"},
            {"name": "AK-47", "desc": "Redline (Minimal Wear)", "img": "/static/or5.png"},
            {"name": "Desert Eagle", "desc": "Code Red (Factory New)", "img": "/static/or6.png"},
            {"name": "AWP", "desc": "Dragon Lore (Factory New)", "img": "/static/or7.png"},
        ]
    },
    {
        "key": "tactical",
        "title": "Tactical Case",
        "price": 3000,
        "img": "/static/Case1.png",
        "items": [
            {"name": "M4A1-S", "desc": "Guardian (Minimal Wear)", "img": "https://cdn-icons-png.flaticon.com/512/3468/3468391.png"},
            {"name": "USP-S", "desc": "Orion (Factory New)", "img": "https://cdn-icons-png.flaticon.com/512/3468/3468389.png"},
            {"name": "FAMAS", "desc": "Commemoration (Minimal Wear)", "img": "https://cdn-icons-png.flaticon.com/512/3468/3468384.png"},
            {"name": "AWP", "desc": "Atheris (Field-Tested)", "img": "https://cdn-icons-png.flaticon.com/512/3468/3468382.png"},
            {"name": "AK-47", "desc": "Redline (Minimal Wear)", "img": "https://cdn-icons-png.flaticon.com/512/3468/3468383.png"},
            {"name": "Desert Eagle", "desc": "Code Red (Factory New)", "img": "https://cdn-icons-png.flaticon.com/512/3468/3468388.png"},
            {"name": "AWP", "desc": "Dragon Lore (Factory New)", "img": "https://cdn-icons-png.flaticon.com/512/3468/3468382.png"},
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
