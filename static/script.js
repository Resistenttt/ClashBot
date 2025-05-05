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

let state = {
    balance: 5000,
    currentCase: null,
    isSpinning: false,
    spinInterval: null,
    spinSpeed: 50
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

    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('win-modal').classList.remove('active');
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
    
    const rouletteContainer = document.querySelector('.roulette-container');
    rouletteContainer.classList.remove('hidden');
    state.isSpinning = true;
    
    const roulette = document.getElementById('roulette');
    roulette.innerHTML = '';
    roulette.style.transform = 'translateX(0)';
    
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
    
    startRoulette();
}

function startRoulette() {
    const roulette = document.getElementById('roulette');
    let position = 0;
    
    state.spinInterval = setInterval(() => {
        position -= 5;
        roulette.style.transform = `translateX(${position}px)`;
    }, state.spinSpeed);
    
    setTimeout(() => {
        stopRoulette();
    }, 3000);
}

function stopRoulette() {
    clearInterval(state.spinInterval);
    state.isSpinning = false;
    
    const wonItem = ITEMS[state.currentCase][Math.floor(Math.random() * ITEMS[state.currentCase].length)];
    
    setTimeout(() => {
        document.querySelector('.roulette-container').classList.add('hidden');
        showWinModal(wonItem);
    }, 1000);
}

function showWinModal(item) {
    document.getElementById('won-item-img').src = item.image;
    document.getElementById('won-item-name').textContent = item.name;
    document.getElementById('win-modal').classList.add('active');
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
