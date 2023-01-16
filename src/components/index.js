import '../pages/index.css';
import { closePopup, openPopup } from './modal.js';
import { enableValidation } from './validate.js';
import { createCard } from './card.js';
const popupEdit = document.querySelector('.profileEdit-popup'); // PopUp редактирования профиля
const popups = Array.from(document.querySelectorAll('.popup')); // Все попапы (массив)
const nameInput = popupEdit.querySelector('.popup__input'); // Поле ввода имени
const jobInput = document.querySelector('.job-input') // Поле ввода работы
const profileName = document.querySelector('.profile__name'); // Имя в профиле
const profileJob = document.querySelector('.profile__description'); // Работа в профиле
const buttonEditProfile = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const imagePopUp = document.querySelector('.imgAdd-popup'); // PopUp добавления изображений
const imageNameInput = imagePopUp.querySelector('.popup__input'); // Поле ввода названия нового фото
const imageLinkInput = imagePopUp.querySelector('.popup__input-link'); // Поле ввода ссылки на новое фото
const buttonAdd = document.querySelector('.profile__add-button'); // Кнопка добавления новых фото
const imageFormElement = imagePopUp.querySelector('.popup__form'); // Форма добавления фото
const formElementEdit = popupEdit.querySelector('.popup__form'); // Форма ввода данных профиля
const buttonCloseList = Array.from(document.querySelectorAll('.popup__close-button')); // Все крестики над попапами
const galaryCards = document.querySelector('.galary__cards'); // Контейнер карточек
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const validationSettings = {
    popupForm: '.popup__form',
    popupInput: '.popup__input',
    saveBtn: '.popup__save-button',
    saveBtnInactive: 'popup__save-button_inactive',
    inputError: 'form__input_type_error',
    inputErrorActive: 'form__input-error_active',
};

// Открытие окна редактирования профиля
buttonEditProfile.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// Открытие окна добавления фото
buttonAdd.addEventListener('click', function() {
    openPopup(imagePopUp);
});

// Вешаю слушатели на все крестики для закрытия окон

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});



// Изменение информации в профиле

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); // Что-то отменяется

    profileName.textContent = nameInput.value; // Меняем имя на то, что ввёл пользователь в input'е
    profileJob.textContent = jobInput.value;

    closePopup(popupEdit); // PopUp закрывается
}

formElementEdit.addEventListener('submit', handleProfileFormSubmit); 


// Добавление карточек по умолчанию в DOM
initialCards.forEach(card => {
  const cardElement = createCard(card.name, card.link);
  galaryCards.append(cardElement);
});


// Функция добавления новых карточек

function addNewCard(evt) {
  evt.preventDefault();

  const newCard = createCard(imageNameInput.value, imageLinkInput.value);
  galaryCards.prepend(newCard);

  imageFormElement.reset();

  closePopup(imagePopUp);

};

imageFormElement.addEventListener('submit', addNewCard);


enableValidation(validationSettings);


// Закрытие попапов на клик вне области

popups.forEach(popup => {
  popup.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('popup')) {
      closePopup(popup)
    }
  })
});




