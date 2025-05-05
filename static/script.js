let balance = 5000;

async function openCase(caseType) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '<div class="spinner"></div>';

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

        balance -= getCasePrice(caseType);
        document.getElementById('balance').textContent = balance;
        
        // Анимация открытия
        animateCaseOpening(data.item);
    } catch (error) {
        resultElement.textContent = 'Ошибка соединения';
    }
}

function getCasePrice(caseType) {
    const prices = { rusty: 500, tactical: 3000 };
    return prices[caseType];
}

function animateCaseOpening(item) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';
    
    const items = [
        "AK-47 | Красная линия",
        "AWP | Черный грифон",
        "Нож | Сапфир",
        item // Последним будет выигранный предмет
    ];
    
    let counter = 0;
    const spin = setInterval(() => {
        resultElement.textContent = items[counter % items.length];
        counter++;
        if (counter > 15) {
            clearInterval(spin);
            resultElement.innerHTML = `
                <div class="won-item">
                    <h3>🎉 Вы выиграли:</h3>
                    <p>${item}</p>
                </div>
            `;
        }
    }, 100);
}
