from pathlib import Path

# Укажите абсолютный путь
static_path = Path(__file__).parent.parent / "static"
app.mount("/static", StaticFiles(directory=str(static_path)), name="static")
