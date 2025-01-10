import './index.sass'
import '../script/popup'
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
// Общая пагинация
let pagination = document.querySelectorAll(".swiper-pagination");
// Селекторы секции брендов
const brands = document.querySelector(".brands")
const readMoreBrands = brands.querySelector(".read-more");
const brandsList = document.querySelector(".brands__list");
const brandsElements = document.querySelectorAll(".brands__element");
const readMoreIcon = readMoreBrands.querySelector(".read-more__icon");
const readMoreText = readMoreBrands.querySelector(".read-more__text");
// Селекторы секции видов техниики
const techs = document.querySelector(".tech")
const readMoreTechs = techs.querySelector(".read-more");
const techList = document.querySelector(".tech__list");
const techElements = document.querySelectorAll(".tech__element");
// Селекторы секции стоимости
const price = document.querySelector(".price")
const priceList = document.querySelector(".price__list");
const priceElements = document.querySelectorAll(".price__element");

// Измеряем размер экрана
const screenWidth = window.screen.width

const checkScreen = (screen) => {
  if (screen < 768) { // Условия для мобильной версии
    pagination.forEach(e => e.style = "visibility: visible")
    // Слайдер для брендов
    readMoreBrands.style = "display: none";
    brands.classList.add("swiper-container");
    brandsList.classList.add("swiper-wrapper");
    brandsElements.forEach(e => e.classList.add("swiper-slide"));
    const brandsSwiper = new Swiper('.brands ', {
      slidesPerView: 1,
      spaceBetween: 16,
      width: 240,
      height: 72,
      pagination: {
        el: '.swiper-pagination',
      },
    });
    // Слайдер для видов техники
    readMoreTechs.style = "display: none";
    techs.classList.add("swiper-container");
    techList.classList.add("swiper-wrapper");
    techElements.forEach(e => e.classList.add("swiper-slide"));
    const techSwiper = new Swiper('.tech ', {
      slidesPerView: 1,
      spaceBetween: 16,
      width: 240,
      height: 160,
      pagination: {
        el: '.swiper-pagination',
      },
    });
    price.classList.add("swiper-container");
    priceList.classList.add("swiper-wrapper");
    priceElements.forEach(e => e.classList.add("swiper-slide"));
    const priceSwiper = new Swiper('.price ', {
      slidesPerView: 1,
      spaceBetween: 16,
      width: 260,
      height: 200,
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
}

checkScreen(screenWidth)

const readMore = () => {
  if (readMoreText.textContent === 'Показать все') {
    brandsList.style = "height: 100%"
    readMoreIcon.style = 'transform: rotate(180deg)'
    readMoreText.textContent = 'Скрыть';
  } else {
    brandsList.style = "height: 160px"
    readMoreIcon.style = 'transform: rotate(0)'
    readMoreText.textContent = 'Показать все';
  }
}

readMoreBrands.addEventListener('click', readMore)
