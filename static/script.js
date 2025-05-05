// Конфигурация анимации
const CASE_OPEN_DURATION = 5000; // 5 секунд
const SPIN_ANIMATION_CLASS = 'spinning';

document.querySelectorAll('.tg-case').forEach(caseEl => {
    caseEl.addEventListener('click', async function() {
        const caseType = this.getAttribute('data-case');
        const caseImage = this.querySelector('img');
        
        // Блокируем кнопку на время анимации
        caseEl.style.pointerEvents = 'none';
        
        // Запускаем анимацию вращения
        caseImage.classList.add(SPIN_ANIMATION_CLASS);
        
        // Симулируем запрос к серверу
        setTimeout(async () => {
            try {
                const response = await fetch(`/open_case/${caseType}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user_id: 1 })
                });
                
                const result = await response.json();
                
                // Останавливаем анимацию
                caseImage.classList.remove(SPIN_ANIMATION_CLASS);
                
                // Показываем результат
                showResult(result.item);
                
            } catch (error) {
                console.error('Ошибка:', error);
                caseImage.classList.remove(SPIN_ANIMATION_CLASS);
                alert('Ошибка соединения');
            }
            
            // Разблокируем кнопку
            caseEl.style.pointerEvents = 'auto';
        }, CASE_OPEN_DURATION);
    });
});

function showResult(item) {
    const modal = document.createElement('div');
    modal.className = 'result-modal';
    modal.innerHTML = `
        <div class="result-content">
            <h2>🎉 Вы получили:</h2>
            <div class="item">${item}</div>
            <button class="close-btn">OK</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Закрытие по кнопке
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
    });
}
