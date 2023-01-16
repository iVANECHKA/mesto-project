import { openPopup } from "./modal.js";
const cardTemplate = document.querySelector('.cardTemplate'); // Шаблон карточки
const caption = document.querySelector('.imgFull-popup__caption'); // Подпись попапа с полным изображением
const bigImg = document.querySelector('.imgFull-popup__image'); // Фото попапа с полным изображением
const imageFullPopUp = document.querySelector('.imgFull-popup'); // PopUp с полным изображением

// Создание карточек
export function createCard(name, link) {

    const cardClone = cardTemplate.content.cloneNode(true);
  
    const img = cardClone.querySelector('.galary__image');
    const cardTitle = cardClone.querySelector('.galary__name');
    const like = cardClone.querySelector('.galary__like');
    const cardBin = cardClone.querySelector('.galary__delete');
    
    img.src = link;
    img.setAttribute('alt', name);
    cardTitle.textContent = name;
  
    img.addEventListener('click', () => openImagePopup(name, link));
    like.addEventListener('click', addHandlerLike(like));
    cardBin.addEventListener('click', addHandlerBin(cardBin));
  
    return cardClone;
  };

  // Функция добавления обработчика для фото в полном размере

function openImagePopup(name, link) {      
    caption.textContent = name;
    bigImg.src = link;
    bigImg.alt = name;
    openPopup(imageFullPopUp);
  } 
  
  
  // Функция добавления обработчика для лайков
  
  function addHandlerLike(item) {
    item.addEventListener('click', () => {
  
    if (!item) { 
      return;
    }
  
    item.classList.toggle('galary__like_active');
    });
  };
  
  
  // Функция добавления обработчика для мусорок
  
  function addHandlerBin(item) {
    item.addEventListener('click', function(e) {
      
    if (!item) {
      return;
    }
  
    e.target.closest('.galary__card').remove();
    });
  };