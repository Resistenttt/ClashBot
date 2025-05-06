from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles  # Импортируем StaticFiles
from pydantic import BaseModel
import random

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

# Пример данных для кейсов
ITEMS = {
    'basic': [
        { "name": "AK-47 | Красная линия", "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKkPLLMrfFqWNU6dNoxLzD9I6j3Qzk_EFlY2qhI9KUc1M3YV6D-ljqwu-505C7vZvJynIx6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", "rarity": "rare" },
        { "name": "AWP | Фея", "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", "rarity": "epic" },
        { "name": "M4A4 | Зверь внутри", "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", "rarity": "legendary" },
        { "name": "Glock-18 | Водянистый", "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", "rarity": "common" },
        { "name": "Нож | Бабочка | Синий сталь", "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", "rarity": "legendary" }
    ],
    'rare': [
        { "name": "AWP | Драконья икона", "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", "rarity": "epic" },
        { "name": "AK-47 | Вулкан", "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", "rarity": "legendary" },
        { "name": "M4A1-S | Кибербезопасность", "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", "rarity": "rare" },
        { "name": "Нож | Коготь | Ультрафиолет", "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", "rarity": "legendary" },
        { "name": "Desert Eagle | Кобра", "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", "rarity": "epic" }
    ]
}

# Вероятности для каждого предмета в кейсе (пример)
PROBABILITIES = {
    'basic': [0.2, 0.2, 0.2, 0.2, 0.2],
    'rare': [0.1, 0.1, 0.3, 0.3, 0.2]
}

@app.get("/")
async def read_root():
    return FileResponse("static/index.html")

class OpenCaseRequest(BaseModel):
    caseType: str

def spin_case(items, probabilities):
    selected_item = random.choices(items, weights=probabilities, k=1)[0]
    return selected_item

@app.post("/open-case")
async def open_case(request: OpenCaseRequest):
    case_type = request.caseType
    
    if case_type not in ITEMS:
        return JSONResponse(content={"error": "Неверный тип кейса"}, status_code=400)
    
    items = ITEMS[case_type]
    probabilities = PROBABILITIES[case_type]
    
    won_item = spin_case(items, probabilities)
    return JSONResponse(content={"item": won_item})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
