// Пример данных предметов (замените на свои)
const ITEMS = {
    basic: [
        { name: "AK-47 | Красная линия", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKkPLLMrfFqWNU6dNoxLzD9I6j3Qzk_EFlY2qhI9KUc1M3YV6D-ljqwu-505C7vZvJynIx6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "rare" },
        { name: "AWP | Фея", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "epic" },
        { name: "M4A4 | Зверь внутри", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "legendary" },
        { name: "Glock-18 | Водянистый", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "common" },
        { name: "Нож | Бабочка | Синий сталь", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "legendary" }
    ],
    rare: [
        { name: "AWP | Драконья икона", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "epic" },
        { name: "AK-47 | Вулкан", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "legendary" },
        { name: "M4A1-S | Кибербезопасность", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "rare" },
        { name: "Нож | Коготь | Ультрафиолет", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "legendary" },
        { name: "Desert Eagle | Кобра", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdD5H09K3m5a0n_L1JaKfkWgIu8Um0rLE8Y2n3gzs8xY5N2rzd4WSewc9M1nW-1W-kO-50ZG5vszOyXUy6SQj4H_EqkO9n1gYPGI9JmXWJw/360fx360f", rarity: "epic" }
    ]
};

let state = {
    balance: 5000,
    currentCase: null,
    isSpinning: false,
    spinInterval: null,
    currentPosition: 0,
    spinSpeed: 50,
    targetItem: null
};

document.addEventListener('DOMContentLoaded', () => {
    // Обработчики кейсов
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

    // Кнопка "Забрать"
    document.querySelector('.collect-btn').addEventListener('click', () => {
        document.getElementById('case-opening').style.display = 'none';
        document.getElementById('main').classList.add('active');
        document.getElementById('result-screen').classList.add('hidden');
        state.isSpinning =
