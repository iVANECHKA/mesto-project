import { createCard, firstCards, addNewCard, addHandlerBigImg, addHandlerLike, addHandlerBin } from './card.js';
import { showInputError, hideInputError, checkInputValidity, toggleButtonState, hasInvalidInput, enableValidation, setEventListeners } from './validate.js';
import { openPopup, closePopup} from './modal.js';
import { handleProfileFormSubmit } from './utils.js';
import '../pages/index.css';
export const editPopUp = document.querySelector('.profileEdit-popup'); // PopUp редактирования профиля
const popups = Array.from(document.querySelectorAll('.popup')); // Все попапы (массив)
export const nameInput = editPopUp.querySelector('.popup__input'); // Поле ввода имени
export const jobInput = document.querySelector('.job-input') // Поле ввода работы
export const profileName = document.querySelector('.profile__name'); // Имя в профиле
export const profileJob = document.querySelector('.profile__description'); // Работа в профиле
const editButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const editCloseButton = document.querySelector('.popup__close-button'); // Кнопка закрытия окна с редактрованием профиля
const imageCloseButton = document.querySelector('.img-close-btn')
const addButton = document.querySelector('.profile__add-button'); // Кнопка добавления новых фото
const imageFormElement = document.querySelector('.img-form');
const imagePopUp = document.querySelector('.imgAdd-popup')
const editFormElement = editPopUp.querySelector('.popup__form'); // Форма ввода данных профиля
const imageFullPopUp = document.querySelector('.imgFull-popup'); // PopUp с полным изображением
const imageFullCloseButton = imageFullPopUp.querySelector('.popup__close-button'); // Кнопка закрытия попапа с полным изображением
const galary = document.querySelector('.galary'); // Родитель GalaryCards

  
firstCards();
// Открытие окна редактирования профиля
editButton.addEventListener('click', function() {
  openPopup(editPopUp);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// Закрытие окна редактирования профиля
editCloseButton.addEventListener('click', function() {
    closePopup(editPopUp);
});

// Открытие окна добавления фото
addButton.addEventListener('click', function() {
    openPopup(imagePopUp);
});

// Закрытие окна добавления фото
imageCloseButton.addEventListener('click', function() {
    closePopup(imagePopUp);
});

// Закрытие окна просмотра фото
imageFullCloseButton.addEventListener('click', function() {
  closePopup(imageFullPopUp);
});





editFormElement.addEventListener('submit', handleProfileFormSubmit); 




//Слушатель на добавление карточки по кнопке
imageFormElement.addEventListener('submit', addNewCard);







// Запуск валидаци
enableValidation();

// Закрытие попапов на Escape
document.addEventListener('keydown', function(event) {
  if(event.key === 'Escape') {
    popups.forEach(popUp => {
      popUp.classList.remove('popup_opened');
    })
  };
});

// Закрытие попапов на клик вне области
document.addEventListener('mousedown', function(event) {
  if(event.target.closest('.popup__window') === null && event.button == 0) {
    popups.forEach(popUp => {
      popUp.classList.remove('popup_opened');
    });
  };
});




