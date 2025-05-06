const CASES = [
    {
        key: "rusty",
        title: "Rusty Case",
        price: 500,
        img: "https://i.imgur.com/wZRCiJb.png"
    },
    {
        key: "tactical",
        title: "Tactical Case",
        price: 3000,
        img: "https://i.imgur.com/L2NqV8P.png"
    },
    {
        key: "clutch",
        title: "Clutch Case",
        price: 5000,
        img: "https://i.imgur.com/pQZtA9h.png"
    },
    {
        key: "allin",
        title: "All In Case",
        price: 10000,
        img: "https://i.imgur.com/8vCqSVZ.png"
    }
];

let balance = localStorage.getItem('balance') ? parseInt(localStorage.getItem('balance')) : 5000;
let inventory = JSON.parse(localStorage.getItem('inventory') || "[]");

function setBalance(val) {
    balance = val;
    document.querySelector('.navbar #balance').textContent = `💎 ${balance}`;
    localStorage.setItem('balance', balance);
}

function setInventory(inv) {
    inventory = inv;
    localStorage.setItem('inventory', JSON.stringify(inv));
}

function renderApp(tab = "cases") {
    document.getElementById('app').innerHTML = `
        <div class="navbar">
            <span>CS2 Бот</span>
            <span id="balance">💎 ${balance}</span>
        </div>
        <div id="main-content"></div>
        <div class="tabs">
            <div class="tab-btn ${tab === "cases" ? "active" : ""}" data-tab="cases">Кейсы</div>
            <div class="tab-btn ${tab === "inventory" ? "active" : ""}" data-tab="inventory">Инвентарь</div>
            <div class="tab-btn ${tab === "shop" ? "active" : ""}" data-tab="shop">Магазин</div>
            <div class="tab-btn ${tab === "profile" ? "active" : ""}" data-tab="profile">Профиль</div>
        </div>
    `;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => renderApp(btn.dataset.tab);
    });
    if (tab === "cases") renderCases();
    if (tab === "inventory") renderInventory();
    if (tab === "profile") renderProfile();
    if (tab === "shop") renderShop();
}

function renderCases() {
    const grid = CASES.map(c =>
        `<div class="case-card" data-key="${c.key}">
            <img src="${c.img}" alt="${c.title}">
            <span class="case-title">${c.title}</span>
            <span class="case-price">💎 ${c.price.toLocaleString()}</span>
        </div>`
    ).join("");
    document.getElementById('main-content').innerHTML = `
        <h1>Кейсы</h1>
        <div class="cases-grid">${grid}</div>
    `;
    document.querySelectorAll('.case-card').forEach(card => {
        card.onclick = () => openCasePreview(card.dataset.key);
    });
}

async function openCasePreview(caseKey) {
    // Получаем содержимое кейса с backend
    const res = await fetch(`/case-content?case=${caseKey}`);
    const data = await res.json();
    const items = data.items;
    let currentIndex = 0;

    function renderCaseModal() {
        document.body.insertAdjacentHTML('beforeend', `
            <div class="case-preview-modal" id="case-modal">
                <div class="case-preview-content">
                    <span class="close-btn" id="close-case-modal">&times;</span>
                    <div class="case-items-list" id="case-items-list">
                        ${items.map((item, idx) => `
                            <div class="case-item-row" style="${idx === currentIndex ? 'background:#222;' : ''}">
                                <img src="${item.img}" alt="${item.name}">
                                <div class="skin-title">${item.name}</div>
                                <div class="skin-desc">${item.desc}</div>
                            </div>
                        `).join("")}
                    </div>
                    <button class="open-btn" id="open-case-btn">Открыть 💎 ${CASES.find(c=>c.key===caseKey).price}</button>
                </div>
            </div>
        `);

        // Вертикальный скролл по свайпу/колесу мыши
        const list = document.getElementById('case-items-list');
        list.scrollTop = currentIndex * 110;
        list.onwheel = (e) => {
            if (e.deltaY > 0 && currentIndex < items.length - 1) currentIndex++;
            if (e.deltaY < 0 && currentIndex > 0) currentIndex--;
            renderCaseModalUpdate();
            e.preventDefault();
        };
        // Закрытие
        document.getElementById('close-case-modal').onclick = () => {
            document.getElementById('case-modal').remove();
        };
        // Открытие кейса
        document.getElementById('open-case-btn').onclick = () => {
            if (balance < CASES.find(c=>c.key===caseKey).price) {
                alert("Недостаточно баланса!");
                return;
            }
            openCaseSpin(caseKey, items);
        };
    }

    function renderCaseModalUpdate() {
        const list = document.getElementById('case-items-list');
        list.innerHTML = items.map((item, idx) => `
            <div class="case-item-row" style="${idx === currentIndex ? 'background:#222;' : ''}">
                <img src="${item.img}" alt="${item.name}">
                <div class="skin-title">${item.name}</div>
                <div class="skin-desc">${item.desc}</div>
            </div>
        `).join("");
        list.scrollTop = currentIndex * 110;
    }

    renderCaseModal();
}

async function openCaseSpin(caseKey, items) {
    document.getElementById('case-modal').remove();
    // Массив для спина: много предметов + выигрышный в конце
    let spinItems = [];
    for (let i = 0; i < 15; i++) spinItems.push(items[Math.floor(Math.random()*items.length)]);
    // Получаем выигрышный предмет с backend
    const res = await fetch('/open-case', {
        method: "POST",
        body: new URLSearchParams({case: caseKey})
    });
    const data = await res.json();
    spinItems.push(data.item);

    // Показываем анимацию спина (вертикальный прокрут)
    document.body.insertAdjacentHTML('beforeend', `
        <div class="case-preview-modal" id="spin-modal">
            <div class="case-preview-content">
                <div class="spin-roller">
                    <div class="spin-list" id="spin-list" style="transform:translateY(0);">
                        ${spinItems.map(item => `
                            <div class="spin-item">
                                <img src="${item.img}" alt="${item.name}">
                                <div class="skin-title">${item.name}</div>
                                <div class="skin-desc">${item.desc}</div>
                            </div>
                        `).join("")}
                    </div>
                </div>
                <button class="open-btn" id="spin-close-btn" style="display:none">Забрать</button>
            </div>
        </div>
    `);
    // Анимация
    setTimeout(() => {
        const list = document.getElementById('spin-list');
        list.style.transform = `translateY(-${spinItems.length-1}00%)`;
        setTimeout(() => {
            document.getElementById('spin-close-btn').style.display = '';
            // Добавляем предмет в инвентарь
            setBalance(balance - CASES.find(c=>c.key===caseKey).price);
            inventory.push(spinItems[spinItems.length-1]);
            setInventory(inventory);
        }, 2200);
    }, 80);
    document.getElementById('spin-close-btn').onclick = () => {
        document.getElementById('spin-modal').remove();
        renderApp("inventory");
    };
}

function renderInventory() {
    document.getElementById('main-content').innerHTML = `
        <h1>Инвентарь</h1>
        <div class="inventory-list">
            ${inventory.length === 0 ? "<p>Пусто</p>" : inventory.map(item => `
                <div class="inventory-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="skin-title">${item.name}</div>
                    <div class="skin-desc">${item.desc}</div>
                </div>
            `).join("")}
        </div>
    `;
}

function renderProfile() {
    document.getElementById('main-content').innerHTML = `
        <div class="profile-block">
            <h2>Профиль</h2>
            <div class="profile-balance">Баланс: 💎 ${balance}</div>
            <div>Ник: <b>user123</b></div>
            <button onclick="setBalance(balance+10000);renderApp('profile');">Пополнить +10 000</button>
        </div>
    `;
}

function renderShop() {
    document.getElementById('main-content').innerHTML = `
        <div class="shop-block">
            <h2>Магазин</h2>
            <div class="shop-desc">В будущем здесь появится магазин!</div>
            <button onclick="alert('Скоро!')">Купить что-то</button>
        </div>
    `;
}

// Init
window.onload = () => {
    renderApp();
};
