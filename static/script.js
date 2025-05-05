// Данные предметов для кейсов
const ITEMS = {
    basic: [
        { name: "Glock-18 | Moonrise", image: "https://cdn-icons-png.flaticon.com/512/2489/2489317.png", rarity: "common" },
        { name: "USP-S | Cortex", image: "https://cdn-icons-png.flaticon.com/512/2489/2489317.png", rarity: "common" },
        { name: "P250 | Муравьиный улей", image: "https://cdn-icons-png.flaticon.com/512/2489/2489317.png", rarity: "rare" }
    ],
    rare: [
        { name: "AWP | Красная линия", image: "https://cdn-icons-png.flaticon.com/512/2489/2489336.png", rarity: "rare" },
        { name: "AK-47 | Огненный змей", image: "https://cdn-icons-png.flaticon.com/512/2489/2489336.png", rarity: "epic" },
        { name: "★ Нож | Ультрафиолет", image: "https://cdn-icons-png.flaticon.com/512/2489/2489336.png", rarity: "legendary" }
    ]
};

// Состояние игры
let state = {
    balance: 5000,
    currentCase: null,
    isSpinning: false,
    spinInterval: null,
    spinSpeed: 50,
    wonItem: null
};

// Инициализация
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

    // Кнопка STOP в рулетке
    document.querySelector('.stop-btn').addEventListener('click', stopRoulette);

    // Закрытие модального окна
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('win-modal').classList.remove('active');
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

// Переключение вкладок
function switchTab(tabId) {
    // Скрыть все вкладки
    document.querySelectorAll('.content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Показать выбранную
    document.getElementById(tabId).classList.add('active');
    
    // Обновить активную кнопку
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`.nav-btn[data-tab="${tabId}"]`).classList.add('active');
}

// Открытие кейса
function openCase(caseType, price) {
    state.currentCase = caseType;
    state.balance -= price;
    updateBalance();
    
    // Показать рулетку
    document.querySelector('.roulette-container').classList.remove('hidden');
    
    // Заполнить рулетку предметами
    const roulette = document.getElementById('roulette');
    roulette.innerHTML = '';
    
    // Добавляем больше предметов для эффекта прокрутки
    for (let i = 0; i < 30; i++) {
        const randomItem = ITEMS[caseType][Math.floor(Math.random() * ITEMS[caseType].length)];
        
        const itemEl = document.createElement('div');
        itemEl.className = 'roulette-item';
        itemEl.innerHTML = `
            <img src="${randomItem.image}" alt="${randomItem.name}">
            <h4>${randomItem.name}</h4>
        `;
        roulette.appendChild(itemEl);
    }
    
    // Начать анимацию
    startRoulette();
}

// Запуск рулетки
function startRoulette() {
    state.isSpinning = true;
    const roulette = document.getElementById('roulette');
    let position = 0;
    
    state.spinInterval = setInterval(() => {
        position -= 5;
        roulette.style.transform = `translateX(${position}px)`;
    }, state.spinSpeed);
    
    // Через 3 секунды разрешаем остановку
    setTimeout(() => {
        document.querySelector('.stop-btn').disabled = false;
    }, 3000);
}

// Остановка рулетки
function stopRoulette() {
    if (!state.isSpinning) return;
    
    clearInterval(state.spinInterval);
    document.querySelector('.stop-btn').disabled = true;
    
    // Выбираем случайный предмет как выигрыш
    const wonItem = ITEMS[state.currentCase][Math.floor(Math.random() * ITEMS[state.currentCase].length)];
    state.wonItem = wonItem;
    
    // Плавная остановка
    setTimeout(() => {
        state.isSpinning = false;
        document.querySelector('.roulette-container').classList.add('hidden');
        showWinModal(wonItem);
    }, 1000);
}

// Показать модальное окно выигрыша
function showWinModal(item) {
    document.getElementById('won-item-img').src = item.image;
    document.getElementById('won-item-name').textContent = item.name;
    document.getElementById('win-modal').classList.add('active');
}

// Обновление баланса
function updateBalance() {
    document.getElementById('balance').textContent = state.balance;
}
