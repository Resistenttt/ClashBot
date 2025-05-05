from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import random

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/open_case/{case_type}")
async def open_case(case_type: str, request: Request):
    cases = {
        "rusty": ["Glock-18 | Moonrise", "USP-S | Cortex"],
        "tactical": ["AWP | Красная линия", "AK-47 | Огненный змей"]
    }
    return {"item": random.choice(cases[case_type])}

@app.get("/")
async def root():
    return FileResponse("static/index.html")
