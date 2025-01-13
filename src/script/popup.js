// Проверяем размер экрана для закрытия бургера на экранах > 1366px
const screenWidth = window.screen.width;

// Селекторы меню
const menus = {
  burger: {
    menu: document.querySelector('.burger'),
    openBtn: document.querySelector('.open-burger'),
    closeBtn: document.querySelector('.close-burger'),
  },
  phone: {
    menu: document.querySelector('.phone'),
    openBtn: document.querySelector('.open-phone-burger'),
    closeBtn: document.querySelector('.close-phone'),
    additionalOpenBtn: document.querySelector('.open-phone'),
  },
  chat: {
    menu: document.querySelector('.chat'),
    openBtn: document.querySelector('.open-chat-burger'),
    closeBtn: document.querySelector('.close-chat'),
    additionalOpenBtn: document.querySelector('.open-chat'),
  },
};

// Функции для управления меню
const openMenu = (menu) => {
  menu.style.display = 'flex';
};

const closeMenu = (menu) => {
  menu.style.display = 'none';
};

const toggleMenu = (menu, isBurger = false) => {
  openMenu(menu);
  if (isBurger && screenWidth < 1366) {
    closeMenu(menus.burger.menu);
  }
};

// Установка слушателей для каждого меню
Object.keys(menus).forEach((key) => {
  const { menu, openBtn, closeBtn, additionalOpenBtn } = menus[key];

  // Закрытие меню при клике на его область
  menu.addEventListener('click', (e) => {
    if (e.target === menu) {
      closeMenu(menu);
    }
  });

  // Открытие меню
  if (openBtn) {
    openBtn.addEventListener('click', () => toggleMenu(menu, key !== 'burger'));
  }

  // Дополнительная кнопка открытия меню
  if (additionalOpenBtn) {
    additionalOpenBtn.addEventListener('click', () => openMenu(menu));
  }

  // Закрытие меню
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeMenu(menu));
  }
});
