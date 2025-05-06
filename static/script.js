// Пример данных предметов
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
    targetItem: null,
    currentAngle: 0,
    spinSpeed: 0
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
    document.getElementById('result-screen').classList.add('hidden');
    
    const spinningContainer = document.getElementById('spinning-items');
    spinningContainer.innerHTML = '';
    
    // Добавляем предметы в круг
    const items = ITEMS[caseType];
    const angleStep = 360 / items.length;
    
    items.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'spinning-item';
        itemEl.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
        
        const angle = index * angleStep;
        const rad = angle * (Math.PI / 180);
        const x = Math.sin(rad) * 150;
        const y = -Math.cos(rad) * 150;
        
        itemEl.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
        spinningContainer.appendChild(itemEl);
    });
    
    // Выбираем случайный предмет для остановки
    state.targetItem = items[Math.floor(Math.random() * items.length)];
    
    // Запускаем вращение
    startSpin();
}

function startSpin() {
    state.currentAngle = 0;
    state.spinSpeed = 30;
    const spinningContainer = document.getElementById('spinning-items');
    
    function animate() {
        if (state.spinSpeed > 0.1) {
            state.currentAngle += state.spinSpeed;
            state.spinSpeed *= 0.98; // Постепенное замедление
            
            spinningContainer.style.transform = `rotate(${state.currentAngle}deg)`;
            requestAnimationFrame(animate);
        } else {
            // Плавная остановка на выбранном предмете
            const items = ITEMS[state.currentCase];
            const targetIndex = items.findIndex(item => item.name === state.targetItem.name);
            const angleStep = 360 / items.length;
            const targetAngle = 360 - (targetIndex * angleStep);
            
            const spinDuration = 1000; // 1 секунда для точной остановки
            const startTime = Date.now();
            const startAngle = state.currentAngle % 360;
            
            function finalSpin() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / spinDuration, 1);
                const easing = Math.sin(progress * Math.PI / 2); // Easing out
                
                state.currentAngle = startAngle + (targetAngle - startAngle) * easing;
                spinningContainer.style.transform = `rotate(${state.currentAngle}deg)`;
                
                if (progress < 1) {
                    requestAnimationFrame(finalSpin);
                } else {
                    setTimeout(showResult, 500);
                }
            }
            
            finalSpin();
        }
    }
    
    animate();
}

function showResult() {
    document.getElementById('won-item-img').src = state.targetItem.image;
    document.getElementById('won-item-name').textContent = state.targetItem.name;
    
    const rarityBadge = document.getElementById('rarity-badge');
    rarityBadge.textContent = state.targetItem.rarity.toUpperCase();
    rarityBadge.className = `rarity-badge ${state.targetItem.rarity}`;
    
    document.getElementById('result-screen').classList.remove('hidden');
}

function updateBalance() {
    document.getElementById('balance').textContent = state.balance;
}
