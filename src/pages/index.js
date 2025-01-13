import './index.sass'; // Импорт стилей
import '../script/popup'; // Импорт скрипта для всплывающих окон
import '../script/valid'; // Импорт валидации форм
import Swiper from 'swiper/bundle'; // Импорт Swiper
import 'swiper/css/bundle'; // Импорт стилей для Swiper

// Описание секций
const sections = {
  brands: {
    container: document.querySelector(".brands"),
    readMore: document.querySelector(".brands .read-more"),
    list: document.querySelector(".brands__list"),
    elements: document.querySelectorAll(".brands__element"),
  },
  techs: {
    container: document.querySelector(".tech"),
    readMore: document.querySelector(".tech .read-more-tech"),
    list: document.querySelector(".tech__list"),
    elements: document.querySelectorAll(".tech__element"),
  },
  price: {
    container: document.querySelector(".price"),
    list: document.querySelector(".price__list"),
    elements: document.querySelectorAll(".price__element"),
  },
};

// Переменные для ширины экрана и количества элементов
let screenWidth = window.innerWidth;
const swipers = {}; // Хранилище для экземпляров Swiper

// Функция для обновления количества отображаемых элементов
function updateElementsToShow() {
  const elementsToShow = screenWidth < 768 ? 1000 : screenWidth < 1120 ? 6 : 8;

  // Скрываем кнопку "Показать все" на мобильных устройствах
  for (const key in sections) {
    const section = sections[key];
    if (section.readMore) {
      section.readMore.style.display = screenWidth < 768 ? "none" : "";
    }

    // Показываем только первые элементы, если это не мобильное устройство
    if (section.list) {
      section.elements?.forEach((element, index) => {
        element.style.display = index < elementsToShow || screenWidth < 768 ? "" : "none";
      });
    }
  }
}

// Функция для инициализации Swiper
function initializeSwiper(sectionKey) {
  const section = sections[sectionKey];
  if (!section || !section.container || !section.list || section.elements.length === 0) return;

  section.container.classList.add("swiper-container");
  section.list.classList.add("swiper-wrapper");
  section.elements.forEach((e) => e.classList.add("swiper-slide"));

  swipers[sectionKey] = new Swiper(section.container, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  swipers[sectionKey].update();
}

// Функция для уничтожения Swiper
function destroySwiper(sectionKey) {
  if (swipers[sectionKey]) {
    swipers[sectionKey].destroy(true, true);
    const section = sections[sectionKey];
    section.container?.classList.remove("swiper-container");
    section.list?.classList.remove("swiper-wrapper");
    section.elements.forEach((e) => e.classList.remove("swiper-slide"));
    delete swipers[sectionKey];
  }
}

// Инициализация слайдеров
function initializeSliders() {
  for (const key in sections) {
    if (screenWidth < 768) {
      initializeSwiper(key);
    } else {
      destroySwiper(key);
    }
  }
}

// Обновление Swiper после отображения скрытых слайдов
function updateSwiperOnToggle(sectionKey) {
  const section = sections[sectionKey];
  if (swipers[sectionKey]) {
    section.elements.forEach((element) => {
      element.style.display = "";
    });
    swipers[sectionKey].update();
  }
}

// Обработчики для кнопок "Показать все / Скрыть все"
for (const key in sections) {
  const section = sections[key];
  if (section.readMore) {
    section.readMore.addEventListener("click", () => {
      const isShown = section.readMore.classList.toggle("shown");
      toggleElements(key, isShown);
      if (isShown) {
        updateSwiperOnToggle(key);
      }
    });
  }
}

// Функция для переключения между полным и ограниченным списком
function toggleElements(sectionKey, showAll) {
  const section = sections[sectionKey];
  if (!section || !section.list) return;

  section.list.style.height = showAll ? `${section.list.scrollHeight}px` : "";
  if (section.readMore) {
    section.readMore.textContent = showAll ? "Скрыть все" : "Показать все";
  }
}

// Инициализация после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  if (!sections) return; // Проверка наличия секций
  screenWidth = window.innerWidth;
  updateElementsToShow();
  initializeSliders();
});







