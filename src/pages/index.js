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

  for (const key in sections) {
    const section = sections[key];

    if (section.readMore) {
      section.readMore.style.display = screenWidth < 768 ? "none" : "";
    }

    if (section.list) {
      // Применяем overflow: hidden для секций "brands" и "techs" при ширине экрана больше 768
      if (screenWidth > 768 && (key === "brands" || key === "techs")) {
        section.list.style.overflow = "hidden";
      } else {
        section.list.style.overflow = "";
      }

      section.elements?.forEach((element, index) => {
        if (screenWidth >= 768 && index >= elementsToShow) {
          element.classList.add("hidden");
        } else {
          element.classList.remove("hidden");
        }
      });
    }
  }
}

// Функция для инициализации Swiper
function initializeSwiper(sectionKey) {
  const section = sections[sectionKey];
  if (!section || !section.container || !section.list || swipers[sectionKey]) return;

  section.container.classList.add("swiper-container");
  section.list.classList.add("swiper-wrapper");
  section.elements.forEach((e) => e.classList.add("swiper-slide"));

  swipers[sectionKey] = new Swiper(section.container, {
    slidesPerView: "auto",
    spaceBetween: 16,
    loop: true,
    autoplay: {
      delay: 10000, 
      disableOnInteraction: false, 
    },
    breakpoints: {
      320: { // Для мобильных устройств
        slidesPerView: 'auto', // Авто количество слайдов
      },
      520: { // Для планшетов
        slidesPerView: 2, // 2 слайда
      }
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // Показать пагинацию, если она существует
  const pagination = section.container.querySelector('.swiper-pagination');
  if (pagination) {
    pagination.style.display = "block";
  }
}

// Функция для уничтожения Swiper
function destroySwiper(sectionKey) {
  if (swipers[sectionKey]) {
    swipers[sectionKey].destroy(true, true);
    const section = sections[sectionKey];
    section.container?.classList.remove("swiper-container");
    section.list?.classList.remove("swiper-wrapper");
    section.elements.forEach((e) => e.classList.remove("swiper-slide"));

    // Скрыть пагинацию, если она существует
    const pagination = section.container.querySelector('.swiper-pagination');
    if (pagination) {
      pagination.style.display = "none";
    }

    delete swipers[sectionKey];
  }
}

// Инициализация или уничтожение слайдера в зависимости от ширины экрана
function initializeOrDestroySliders() {
  for (const key in sections) {
    if (screenWidth < 768) {
      initializeSwiper(key);
    } else {
      destroySwiper(key);
    }
  }
}

// Обработчики для кнопок "Показать все / Скрыть все"
for (const key in sections) {
  const section = sections[key];
  if (section.readMore) {
    section.readMore.addEventListener("click", () => {
      const isShown = section.readMore.classList.toggle("shown");
      toggleElements(key, isShown);
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

  if (showAll) {
    section.elements.forEach((element) => element.classList.remove("hidden"));
  } else {
    const elementsToShow = screenWidth < 768 ? 1000 : screenWidth < 1120 ? 6 : 8;
    section.elements.forEach((element, index) => {
      if (index >= elementsToShow) {
        element.classList.add("hidden");
      }
    });
  }

  if (swipers[sectionKey]) {
    swipers[sectionKey].update(); // Обновляем Swiper после изменения видимости элементов
  }
}

// Обновление при изменении размеров окна
window.addEventListener("resize", () => {
  screenWidth = window.innerWidth;
  updateElementsToShow();
  initializeOrDestroySliders();
});

// Инициализация
updateElementsToShow();
initializeOrDestroySliders();










