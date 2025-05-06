// Данные кейсов
const ITEMS = {
    basic: [
        { name: "Обычный кот", image: "https://cdn-icons-png.flaticon.com/512/616/616408.png", rarity: "common" },
        { name: "Рыжий кот", image: "https://cdn-icons-png.flaticon.com/512/2227/2227326.png", rarity: "common" },
        { name: "Серый кот", image: "https://cdn-icons-png.flaticon.com/512/2190/2190552.png", rarity: "rare" },
        { name: "Белый кот", image: "https://cdn-icons-png.flaticon.com/512/194/194279.png", rarity: "rare" },
        { name: "Черный кот", image: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png", rarity: "epic" }
    ],
    rare: [
        { name: "Золотой кот", image: "https://cdn-icons-png.flaticon.com/512/2583/2583344.png", rarity: "rare" },
        { name: "Кот в шляпе", image: "https://cdn-icons-png.flaticon.com/512/3069/3069172.png", rarity: "epic" },
        { name: "Космический кот", image: "https://cdn-icons-png.flaticon.com/512/3293/3293488.png", rarity: "epic" },
        { name: "Кот-ангел", image: "https://cdn-icons-png.flaticon.com/512/2102/2102647.png", rarity: "legendary" },
        { name: "Кот-демон", image: "https://cdn-icons-png.flaticon.com/512/2489/2489713.png", rarity: "legendary" }
    ]
};

let state = {
    balance: 5000,
    currentCase: null,
    isSpinning: false,
    spinInterval: null
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

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

    document.querySelector('.collect-btn').addEventListener('click', () => {
        document.querySelector('.spin-reveal-container').classList.remove('active');
        document.querySelector('.reveal-stage').classList.remove('active');
        state.isSpinning = false;
    });

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
    
    const rouletteContainer = document.getElementById('roulette-items');
    rouletteContainer.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
        ITEMS[caseType].forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'roulette-item';
            itemEl.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
            rouletteContainer.appendChild(itemEl);
        });
    }
    
    startRoulette();
    
    setTimeout(() => {
        stopRoulette();
    }, 3000);
}

function startRoulette() {
    const roulette = document.getElementById('roulette-items');
    let position = 0;
    const speed = 5;
    
    state.spinInterval = setInterval(() => {
        position += speed;
        roulette.style.transform = `translateY(${-position}px)`;
        
        if (position >= roulette.scrollHeight / 2) {
            position = 0;
        }
    }, 16);
}

function stopRoulette() {
    clearInterval(state.spinInterval);
    
    const items = ITEMS[state.currentCase];
    const wonItem = items[Math.floor(Math.random() * items.length)];
    
    document.getElementById('won-item-img').src = wonItem.image;
    document.getElementById('won-item-name').textContent = wonItem.name;
    
    const rarityBadge = document.getElementById('rarity-badge');
    rarityBadge.textContent = wonItem.rarity.toUpperCase();
    rarityBadge.className = `rarity-badge ${wonItem.rarity}`;
    
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
