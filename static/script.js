// Пример данных предметов (замените на свои)
const ITEMS = {
    basic: [
        { name: "AK-47 | Красная линия", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKkPLLMrfFqWNU6dNoxLzD9I6j3Qzk_EFlY2qhI9KUc1M3YV6D-ljqwu-505C7vZvJynIx6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "rare" },
        { name: "AWP | Фея", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "epic" },
        { name: "M4A4 | Зверь внутри", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "legendary" },
        { name: "Glock-18 | Водянистый", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "common" },
        { name: "Нож | Бабочка | Синий сталь", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "legendary" }
    ],
    rare: [
        { name: "AWP | Драконья икона", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "epic" },
        { name: "AK-47 | Вулкан", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "legendary" },
        { name: "M4A1-S | Кибербезопасность", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "rare" },
        { name: "Нож | Коготь | Ультрафиолет", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "legendary" },
        { name: "Desert Eagle | Кобра", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "epic" }
    ]
};

let state = {
    balance: 5000,
    currentCase: null,
    isSpinning: false,
    spinInterval: null,
    currentPosition: 0,
    spinSpeed: 50,
    targetItem: null
};

document.addEventListener('DOMContentLoaded', () => {
    // Обработчики кейсов
    document.querySelectorAll('.case').forEach(caseEl => {
        caseEl.addEventListener('click', () => {
            if (state.isSpinning) return;
            
            const caseType = caseEl.getAttribute('data-type');
            const casePrice = parseInt(caseEl.getAttribute('data-price'));
            
            if (state.balance >= casePrice) {
                openCase(caseType, casePrice);
            } else {
                alert('Недостаточно средств!');
            }
        });
    });

    // Кнопка "Забрать"
    document.querySelector('.collect-btn').addEventListener('click', () => {
        document.getElementById('case-opening').style.display = 'none';
        document.getElementById('main').classList.add('active');
        document.getElementById('result-screen').classList.add('hidden');
        state.isSpinning = false;
    });

    // Инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
        Telegram.WebApp.expand();
        Telegram.WebApp.enableClosingConfirmation();
    }
});

function openCase(caseType, price) {
    state.currentCase = caseType;
    state.balance -= price;
    updateBalance();
    state.isSpinning = true;
    
    document.getElementById('main').classList.remove('active');
    document.getElementById('case-opening').style.display = 'flex';
    
    const rouletteContainer = document.getElementById('roulette-items');
    rouletteContainer.innerHTML = '';
    
    // Добавляем предметы в рулетку (3 копии для плавности)
    for (let i = 0; i < 3; i++) {
        ITEMS[caseType].forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'roulette-item';
            itemEl.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
            rouletteContainer.appendChild(itemEl);
        });
    }
    
    // Выбираем случайный предмет для остановки
    const items = ITEMS[caseType];
    state.targetItem = items[Math.floor(Math.random() * items.length)];
    
    startSpin();
}

function startSpin() {
    const roulette = document.getElementById('roulette-items');
    const itemHeight = 220; // Высота одного предмета
    const spinDuration = 3000; // 3 секунды
    
    // Начальная позиция
    state.currentPosition = 0;
    roulette.style.transform = `translateY(${state.currentPosition}px)`;
    
    // Запуск анимации
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        
        // Замедление к концу анимации
        const easing = 1 - Math.pow(1 - progress, 3);
        
        // Прокрутка с замедлением
        state.currentPosition = -easing * (roulette.scrollHeight / 2 - itemHeight * 3);
        roulette.style.transform = `translateY(${state.currentPosition}px)`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            finishSpin();
        }
    }
    
    requestAnimationFrame(animate);
}

function finishSpin() {
    // Показываем выигранный предмет
    document.getElementById('won-item-img').src = state.targetItem.image;
    document.getElementById('won-item-name').textContent = state.targetItem.name;
    
    const rarityBadge = document.getElementById('rarity-badge');
    rarityBadge.textContent = state.targetItem.rarity.toUpperCase();
    rarityBadge.className = `rarity-badge ${state.targetItem.rarity}`;
    
    // Показываем экран результата
    document.getElementById('result-screen').classList.remove('hidden');
}

function updateBalance() {
    document.getElementById('balance').textContent = state.balance;
}
