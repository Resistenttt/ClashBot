// Данные кейсов (ЗАМЕНИТЕ НА СВОИ КАРТИНКИ)
const ITEMS = {
    basic: [
        { name: "Пистолет", image: "/static/assets/or1.png", rarity: "common" },
        { name: "Дробовик", image: "/static/assets/or2.png", rarity: "common" },
        { name: "Винтовка", image: "/static/assets/or3.png", rarity: "rare" },
        { name: "Снайперка", image: "/static/assets/or4.png", rarity: "rare" },
        { name: "Меч", image: "/static/assets/or5.png", rarity: "epic" }
    ],
    rare: [
        { name: "Золотой пистолет", image: "/static/assets/or6.png", rarity: "rare" },
        { name: "АК-47", image: "/static/assets/or7.png", rarity: "epic" },
        { name: "AWP", image: "/static/assets/or8.png", rarity: "epic" },
        { name: "Кристальный меч", image: "/static/assets/or9.png", rarity: "legendary" },
        { name: "Мифический артефакт", image: "/static/assets/or10.png", rarity: "legendary" }
    ]
};

let state = {
    balance: 5000,
    currentCase: null,
    isSpinning: false,
    spinInterval: null
};

document.addEventListener('DOMContentLoaded', () => {
    // Навигация по вкладкам
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Открытие кейсов
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
        document.querySelector('.spin-reveal-container').classList.remove('active');
        document.querySelector('.reveal-stage').classList.remove('active');
        state.isSpinning = false;
    });

    // Инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
        Telegram.WebApp.expand();
        Telegram.WebApp.enableClosingConfirmation();
        
        const user = Telegram.WebApp.initDataUnsafe?.user;
        if (user) {
            document.querySelector('.profile-header h2').textContent = user.first_name || 'Игрок';
            if (user.photo_url) {
                document.querySelector('.profile-header .avatar').src = user.photo_url;
            }
        }
    }
});

function openCase(caseType, price) {
    state.currentCase = caseType;
    state.balance -= price;
    updateBalance();
    state.isSpinning = true;
    
    const container = document.querySelector('.spin-reveal-container');
    container.classList.remove('hidden');
    container.classList.add('active');
    
    // Заполняем рулетку предметами
    const rouletteContainer = document.getElementById('roulette-items');
    rouletteContainer.innerHTML = '';
    
    // Добавляем 20 копий предметов для плавной прокрутки
    for (let i = 0; i < 20; i++) {
        ITEMS[caseType].forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'roulette-item';
            itemEl.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
            rouletteContainer.appendChild(itemEl);
        });
    }
    
    // Запуск анимации прокрутки
    startRoulette();
    
    // Автоматическая остановка через 3 секунды
    setTimeout(() => {
        stopRoulette();
    }, 3000);
}

function startRoulette() {
    const roulette = document.getElementById('roulette-items');
    let position = 0;
    const speed = 5; // Скорость прокрутки
    
    state.spinInterval = setInterval(() => {
        position -= speed;
        roulette.style.transform = `translateX(${position}px)`;
        
        // Если дошли до конца - перескакиваем в начало
        if (position <= -roulette.scrollWidth / 2) {
            position = 0;
        }
    }, 16); // ~60 FPS
}

function stopRoulette() {
    clearInterval(state.spinInterval);
    
    // Выбираем случайный предмет
    const items = ITEMS[state.currentCase];
    const wonItem = items[Math.floor(Math.random() * items.length)];
    
    // Показываем выигрыш
    document.getElementById('won-item-img').src = wonItem.image;
    document.getElementById('won-item-name').textContent = wonItem.name;
    
    // Устанавливаем редкость
    const rarityBadge = document.getElementById('rarity-badge');
    rarityBadge.textContent = wonItem.rarity.toUpperCase();
    rarityBadge.className = `rarity-badge ${wonItem.rarity}`;
    
    // Переход к фазе раскрытия
    document.querySelector('.spin-stage').classList.add('hidden');
    document.querySelector('.reveal-stage').classList.remove('hidden');
    document.querySelector('.reveal-stage').classList.add('active');
}

function updateBalance() {
    document.getElementById('balance').textContent = state.balance;
}

function switchTab(tabId) {
    document.querySelectorAll('.content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.nav-btn[data-tab="${tabId}"]`).classList.add('active');
}
