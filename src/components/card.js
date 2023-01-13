import { initialCards, cardTemplate, galaryCards, caption, bigImg, imageFullPopUp } from "./data.js";
import { openPopup, closePopup } from "./modal.js";
export function createCard(name, link) {

    const cardClone = cardTemplate.content.cloneNode(true);
  
    const img = cardClone.querySelector('.galary__image');
    const h2 = cardClone.querySelector('.galary__name');
    const like = cardClone.querySelector('.galary__like');
    const deleteBtn = cardClone.querySelector('.galary__delete');
    
    img.src = link;
    img.setAttribute('alt', name);
    h2.textContent = name;
  
    addHandlerBigImg(img);
    addHandlerLike(like);
    addHandlerBin(deleteBtn);
  
    return cardClone;
  };

  // Функция добавления новых карточек

export function addNewCard(evt) {
    evt.preventDefault();

    const imagePopUp = document.querySelector('.imgAdd-popup'); // PopUp добавления изображений
    const imageNameInput = imagePopUp.querySelector('.popup__input'); // Поле ввода названия нового фото
    const imageLinkInput = imagePopUp.querySelector('.popup__input-link'); // Поле ввода ссылки на новое фото
    const imageFormElement = imagePopUp.querySelector('.popup__form'); // Форма добавления фото
    
    const newCard = createCard(imageNameInput.value, imageLinkInput.value);
    galaryCards.prepend(newCard);
  
    imageFormElement.reset();
  
    closePopup(imagePopUp);
  
  };

// Функция добавления обработчика для фото в полном размере

export function addHandlerBigImg(item) {
    item.addEventListener('click', function(e) {
      const image = e.target.closest('.galary__image');
      const li = image.closest('.galary__card');
      const h2 = li.querySelector('.galary__name');
    
      if (!image) {
        return;
      }
    
      caption.textContent = h2.textContent;
      bigImg.src = image.src;
      bigImg.alt = h2.textContent;
      openPopup(imageFullPopUp);
    });
  };
  
  
  // Функция добавления обработчика для лайков
  
 export function addHandlerLike(item) {
    item.addEventListener('click', function(e) {
      const likeButton = e.target.closest('.galary__like');
    if (!likeButton) { 
      return;
    }
  
    likeButton.classList.toggle('galary__like_active');
    });
  };
  
  
  // Функция добавления обработчика для мусорок
  
 export function addHandlerBin(item) {
    item.addEventListener('click', function(e) {
      const deleteButton = e.target.closest('.galary__delete');
    if (!deleteButton) {
      return;
    }
  
    deleteButton.parentElement.remove();
    });
  };

  // Добавление карточек по умолчанию в DOM
export function firstCards () {
    initialCards.forEach(card => {
    const cardElement = createCard(card.name, card.link);
    galaryCards.append(cardElement);
  })
  };