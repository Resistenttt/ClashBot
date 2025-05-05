from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

# Подключение статики
app.mount("/static", StaticFiles(directory="/home/Resistent/clash/static"), name="static")

@app.get("/")
async def main():
    return FileResponse("/home/Resistent/Clash/static/index.html")

# Пример API
@app.post("/open_case/{case_type}")
async def open_case(case_type: str):
    return {"item": "test_item", "case": case_type}