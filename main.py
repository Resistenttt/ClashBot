import os
import logging
from fastapi import FastAPI, Request, Form, BackgroundTasks
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo, KeyboardButton, ReplyKeyboardMarkup
from aiogram.dispatcher.webhook import get_new_configured_app
from aiogram.utils.exceptions import TelegramAPIError

API_TOKEN = os.getenv("7692515430:AAGyPtaAOhHl5hcIYQOMmHqWoYJiVVee0Zc")  # Токен бота из BotFather
WEBAPP_URL = os.getenv("https://clashbot-5j34.onrender.com")  # URL твоего развернутого FastAPI приложения (сайт кейсов)

logging.basicConfig(level=logging.INFO)

bot = Bot(token=API_TOKEN)
dp = Dispatcher()

app = FastAPI()
BASE_DIR = os.path.dirname(__file__)
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")

# Данные кейсов (как в твоём коде)
CASES = [
    {
        "key": "rusty",
        "title": "Rusty Case",
        "price": 500,
        "img": "https://cdn-icons-png.flaticon.com/512/3468/3468376.png",
        "items": [
            {"name": "SG 553", "desc": "Army Sheen (Minimal Wear)", "img": "https://cdn-icons-png.flaticon.com/512/3468/3468376.png"},
            # ... остальные предметы ...
        ]
    },
    # ... другие кейсы ...
]

# --- FastAPI маршруты для сайта ---

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

# --- Aiogram webhook обработчики ---

@dp.message(commands=["start"])
async def cmd_start(message: types.Message):
    keyboard = ReplyKeyboardMarkup(resize_keyboard=True)
    button = KeyboardButton(text="Открыть кейсы", web_app=WebAppInfo(url=WEBAPP_URL))
    keyboard.add(button)
    await message.answer("Нажми кнопку, чтобы открыть Mini App с кейсами", reply_markup=keyboard)

@app.post("/webhook")
async def telegram_webhook(request: Request, background_tasks: BackgroundTasks):
    update = await request.json()
    telegram_update = types.Update(**update)

    async def process_update():
        try:
            await dp.process_update(telegram_update)
        except TelegramAPIError as e:
            logging.error(f"Telegram API error: {e}")

    background_tasks.add_task(process_update)
    return {"ok": True}

# --- Установка и удаление вебхука ---

@app.on_event("startup")
async def on_startup():
    webhook_url = f"{WEBAPP_URL}/webhook"
    await bot.set_webhook(webhook_url)
    logging.info(f"Webhook set to {webhook_url}")

@app.on_event("shutdown")
async def on_shutdown():
    await bot.delete_webhook()
    await bot.session.close()

# --- Запуск uvicorn ---

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, log_level="info")
