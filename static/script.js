/**
 * CatsClash - Game Logic
 * Полная версия с:
 * - Определением мобильных устройств
 * - Анимацией открытия кейсов
 * - Интеграцией Telegram WebApp
 * - Обработкой ошибок
 */

// Конфигурация
const CONFIG = {
  CASE_OPEN_DURATION: 5000, // 5 секунд анимации
  SPIN_ANIMATION_CLASS: 'case-spin',
  BALANCE_CHANGE_ANIMATION_CLASS: 'balance-pulse'
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  // Проверка платформы
  const isMobile = checkMobileDevice();
  initTelegramWebApp();
  setupCases();
  setupEventListeners();
  
  if (isMobile) {
    optimizeForMobile();
  }
});

// ======================
// Основные функции
// ======================

/**
 * Проверяет мобильное устройство
 */
function checkMobileDevice() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  console.log(`Mobile device: ${isMobile}`);
  return isMobile;
}

/**
 * Оптимизация для мобильных устройств
 */
function optimizeForMobile() {
  // Фикс для 100vh на мобилках
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  });

  // Отключаем масштабирование
  document.addEventListener('touchmove', (e) => {
    if (e.scale !== 1) e.preventDefault();
  }, { passive: false });

  // Ленивая загрузка изображений
  document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
  });
}

/**
 * Инициализация Telegram WebApp
 */
function initTelegramWebApp() {
  if (window.Telegram?.WebApp) {
    console.log('Telegram WebApp detected');
    Telegram.WebApp.expand();
    Telegram.WebApp.enableClosingConfirmation();
    
    // Используем данные пользователя из Telegram
    const user = Telegram.WebApp.initDataUnsafe?.user;
    if (user) {
      updateUserProfile(user);
    }
  }
}

/**
 * Обновление профиля пользователя
 */
function updateUserProfile(user) {
  const usernameElement = document.querySelector('.username');
  const avatarElement = document.querySelector('.profile-img');
  
  if (usernameElement) {
    usernameElement.textContent = user.first_name || 'Player';
  }
  
  if (avatarElement && user.photo_url) {
    avatarElement.src = user.photo_url;
  }
}

// ======================
// Логика кейсов
// ======================

/**
 * Настройка кейсов
 */
function setupCases() {
  const cases = document.querySelectorAll('.case-card');
  
  cases.forEach(caseElement => {
    caseElement.addEventListener('click', () => {
      if (caseElement.classList.contains('disabled')) return;
      
      const caseType = caseElement.getAttribute('data-case');
      openCase(caseElement, caseType);
    });
  });
}

/**
 * Анимация открытия кейса
 */
async function openCase(caseElement, caseType) {
  try {
    // Блокируем кнопку
    caseElement.classList.add('disabled');
    
    // Запускаем анимацию
    const caseImage = caseElement.querySelector('.case-image');
    caseImage.classList.add(CONFIG.SPIN_ANIMATION_CLASS);
    
    // Симулируем задержку сервера
    const result = await simulateCaseOpening(caseType);
    
    // Останавливаем анимацию
    caseImage.classList.remove(CONFIG.SPIN_ANIMATION_CLASS);
    
    // Показываем результат
    showResultModal(result.item);
    
    // Обновляем баланс
    updateBalance(result.balance);
    
  } catch (error) {
    console.error('Case opening error:', error);
    showError('Ошибка при открытии кейса');
  } finally {
    // Разблокируем кнопку
    caseElement.classList.remove('disabled');
  }
}

/**
 * Симуляция открытия кейса (замените на реальный API)
 */
async function simulateCaseOpening(caseType) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = {
        rusty: ["Glock-18 | Moonrise", "USP-S | Cortex", "P250 | Муравьиный улей"],
        tactical: ["AWP | Красная линия", "AK-47 | Огненный змей", "★ Нож | Ультрафиолет"]
      };
      
      const prices = {
        rusty: 500,
        tactical: 3000
      };
      
      // Текущий баланс
      const currentBalance = parseInt(document.getElementById('balance').textContent) || 5000;
      const newBalance = currentBalance - prices[caseType];
      
      resolve({
        item: getRandomItem(items[caseType]),
        balance: newBalance,
        case_type: caseType
      });
    }, CONFIG.CASE_OPEN_DURATION);
  });
}

/**
 * Показ модального окна с результатом
 */
function showResultModal(item) {
  const modal = document.createElement('div');
  modal.className = 'result-modal';
  modal.innerHTML = `
    <div class="result-content">
      <h2>🎉 Вы получили:</h2>
      <div class="won-item">${item}</div>
      <button class="tg-button close-btn">OK</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Закрытие по кнопке
  modal.querySelector('.close-btn').addEventListener('click', () => {
    modal.remove();
  });
}

/**
 * Обновление баланса с анимацией
 */
function updateBalance(newBalance) {
  const balanceElement = document.getElementById('balance');
  if (!balanceElement) return;
  
  // Анимация изменения
  balanceElement.classList.add(CONFIG.BALANCE_CHANGE_ANIMATION_CLASS);
  balanceElement.textContent = newBalance;
  
  // Удаляем класс анимации после завершения
  setTimeout(() => {
    balanceElement.classList.remove(CONFIG.BALANCE_CHANGE_ANIMATION_CLASS);
  }, 1000);
}

// ======================
// Вспомогательные функции
// ======================

/**
 * Случайный предмет из массива
 */
function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Показ ошибки
 */
function showError(message) {
  const errorToast = document.createElement('div');
  errorToast.className = 'error-toast';
  errorToast.textContent = message;
  document.body.appendChild(errorToast);
  
  setTimeout(() => {
    errorToast.remove();
  }, 3000);
}

/**
 * Настройка обработчиков событий
 */
function setupEventListeners() {
  // Дополнительные обработчики можно добавить здесь
  window.addEventListener('online', () => showError('Соединение восстановлено'));
  window.addEventListener('offline', () => showError('Нет интернет-соединения'));
}
