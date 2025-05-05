async function openCase(caseType) {
    const result = document.getElementById("result");
    result.textContent = "Открываем...";
    
    // Эмуляция API (так как бэкенд локальный)
    const response = await fetch(`http://localhost:8000/open_case/${caseType}?user_id=1`, {
        method: "POST"
    });
    const data = await response.json();
    
    if (data.error) {
        result.textContent = `Ошибка: ${data.error}`;
        return;
    }
    
    // Анимация дропа
    let counter = 0;
    const spin = setInterval(() => {
        result.textContent = ["🔫", "🔪", "💣"][counter % 3];
        counter++;
        if (counter > 10) {
            clearInterval(spin);
            result.textContent = `🎉 Выпало: ${data.item}! Баланс: ${data.balance}`;
        }
    }, 200);
}