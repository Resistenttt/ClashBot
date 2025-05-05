// Переключение вкладок
document.querySelectorAll('.tg-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Удаляем активный класс у всех
        document.querySelectorAll('.tg-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tg-tab-content').forEach(c => c.classList.remove('active'));
        
        // Активируем текущую
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

// Открытие кейса
document.querySelectorAll('.tg-case').forEach(caseEl => {
    caseEl.addEventListener('click', async () => {
        const caseType = caseEl.getAttribute('data-case');
        const response = await fetch(`/open_case/${caseType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: 1 })
        });
        const result = await response.json();
        alert(`Вы получили: ${result.item}`);
    });
});

// Инициализация Telegram WebApp
if (window.Telegram?.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.enableClosingConfirmation();
}
