from aiogram import Bot, Dispatcher, types
from aiogram.utils import executor

API_TOKEN = "7692515430:AAGyPtaAOhHl5hcIYQOMmHqWoYJiVVee0Zc"
WEBAPP_URL = "https://clashbot-5j34.onrender.com"  # Ссылка на твой FastAPI сайт

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=["start"])
async def cmd_start(message: types.Message):
    kb = types.ReplyKeyboardMarkup(resize_keyboard=True)
    btn = types.KeyboardButton("Открыть кейсы", web_app=types.WebAppInfo(url=WEBAPP_URL))
    kb.add(btn)
    await message.answer("Открой мини-приложение:", reply_markup=kb)

if __name__ == "__main__":
    executor.start_polling(dp)
