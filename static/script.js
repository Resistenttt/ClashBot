document.addEventListener('DOMContentLoaded', () => {
    const cases = document.querySelectorAll('.case');
    const modal = document.getElementById('result-modal');
    const wonItem = document.getElementById('won-item');
    const closeModal = document.getElementById('close-modal');
    let balance = 5000;

    // Цены кейсов
    const prices = {
        rusty: 500,
        tactical: 3000
    };

    // Предметы в кейсах
    const items = {
        rusty: ["Glock-18 | Moonrise", "USP-S | Cortex", "P250 | Муравьиный улей"],
        tactical: ["AWP | Красная линия", "AK-47 | Огненный змей", "★ Нож | Ультрафиолет"]
    };

    // Обновление баланса
    function updateBalance() {
        document.getElementById('balance').textContent = balance;
    }

    // Открытие кейса
    async function openCase(caseType) {
        if (balance < prices[caseType]) {
            alert('Недостаточно средств!');
            return;
        }

        try {
            const response = await fetch(`/open_case/${caseType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: 1 })
            });

            const result = await response.json();
            
            if (result.status === 'success') {
                balance = result.balance;
                updateBalance();
                wonItem.textContent = result.item;
                modal.classList.add('active');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    // Назначение обработчиков
    cases.forEach(caseElement => {
        caseElement.addEventListener('click', () => {
            const caseType = caseElement.getAttribute('data-type');
            openCase(caseType);
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Инициализация
    updateBalance();
});
