let balance = 5000;

async function openCase(caseType) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '<div class="spinner">⌛</div>';

    try {
        const response = await fetch(`/open_case/${caseType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: 1 })
        });
        
        const data = await response.json();

        if (data.error) {
            resultElement.textContent = `Ошибка: ${data.error}`;
            return;
        }

        balance = data.balance;
        document.getElementById('balance').textContent = balance;

        // Анимация
        resultElement.innerHTML = `
            <div class="item-reveal">
                <h3>Вы получили:</h3>
                <p>${data.item}</p>
            </div>
        `;
        
    } catch (error) {
        resultElement.textContent = 'Ошибка соединения';
    }
}

// Инициализация Telegram WebApp
if (window.Telegram?.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.enableClosingConfirmation();
}
