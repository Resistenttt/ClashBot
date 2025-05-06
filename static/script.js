let balance = localStorage.getItem('balance') ? parseInt(localStorage.getItem('balance')) : 5000;
let inventory = JSON.parse(localStorage.getItem('inventory') || "[]");
let CASES = [];
let userName = "Игрок";

function setBalance(val) {
    balance = val;
    document.querySelector('.navbar #balance').textContent = `💎 ${balance}`;
    localStorage.setItem('balance', balance);
}
function setInventory(inv) {
    inventory = inv;
    localStorage.setItem('inventory', JSON.stringify(inv));
}
async function renderApp(tab = "cases") {
    if (!CASES.length) {
        const res = await fetch('/cases');
        CASES = (await res.json()).cases;
    }
    userName = window.tgUserName || "Игрок";

    document.getElementById('app').innerHTML = `
        <div class="navbar">
            <span>CS2 Бот</span>
            <span id="balance">💎 ${balance}</span>
        </div>
        <div id="main-content"></div>
        <div class="tabs">
            <div class="tab-btn ${tab === "cases" ? "active" : ""}" data-tab="cases">Кейсы</div>
            <div class="tab-btn ${tab === "inventory" ? "active" : ""}" data-tab="inventory">Инвентарь</div>
            <div class="tab-btn ${tab === "profile" ? "active" : ""}" data-tab="profile">Профиль</div>
        </div>
    `;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => renderApp(btn.dataset.tab);
    });
    if (tab === "cases") renderCases();
    if (tab === "inventory") renderInventory();
    if (tab === "profile") renderProfile();
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
        const list = document.getElementById('case-items-list');
        list.scrollTop = currentIndex * 110;
        list.onwheel = (e) => {
            if (e.deltaY > 0 && currentIndex < items.length - 1) currentIndex++;
            if (e.deltaY < 0 && currentIndex > 0) currentIndex--;
            renderCaseModalUpdate();
            e.preventDefault();
        };
        document.getElementById('close-case-modal').onclick = () => {
            document.getElementById('case-modal').remove();
        };
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
    let spinItems = [];
    for (let i = 0; i < 15; i++) spinItems.push(items[Math.floor(Math.random()*items.length)]);
    const res = await fetch('/open-case', {
        method: "POST",
        body: new URLSearchParams({case: caseKey})
    });
    const data = await res.json();
    spinItems.push(data.item);

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

    const list = document.getElementById('spin-list');
    const spinHeight = 180 * (spinItems.length - 1);
    setTimeout(() => {
        list.style.transition = "transform 2.2s cubic-bezier(0.22, 1.0, 0.36, 1)";
        list.style.transform = `translateY(-${spinHeight}px)`;
        setTimeout(() => {
            document.getElementById('spin-close-btn').style.display = '';
            setBalance(balance - CASES.find(c=>c.key===caseKey).price);
            inventory.push(spinItems[spinItems.length-1]);
            setInventory(inventory);
        }, 2300);
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
            <div>Ник: <b>${userName}</b></div>
            <button onclick="setBalance(balance+10000);renderApp('profile');">Пополнить +10 000</button>
        </div>
    `;
}
window.onload = () => {
    renderApp();
};
