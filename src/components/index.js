import '../pages/index.css';
import { closePopup, openPopup } from './modal.js';
import { enableValidation } from './validate.js';
import { createCard } from './card.js';
import { getUserData, getCards, editProfile, addCardOnServer, deleteCardOnServer, addLike, deleteLike, updateAvatar } from './api.js';
import { data } from 'autoprefixer';
const popupEdit = document.querySelector('.profileEdit-popup'); // PopUp редактирования профиля
const popups = Array.from(document.querySelectorAll('.popup')); // Все попапы (массив)
const nameInput = popupEdit.querySelector('.popup__input'); // Поле ввода имени
const jobInput = document.querySelector('.job-input') // Поле ввода работы
const profileName = document.querySelector('.profile__name'); // Имя в профиле
const profileJob = document.querySelector('.profile__description'); // Работа в профиле
const profileAvatarWrapper = document.querySelector('.profile__avatar-wrapper') // Обертка для аватара и кнопки
const profileAvatar = document.querySelector('.profile__avatar'); // Аватарка провиля
const profileAvatarButton = document.querySelector('.profile__avatar-button') // Кнопка редактирования аватара
const buttonEditProfile = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const imagePopUp = document.querySelector('.imgAdd-popup'); // PopUp добавления изображений
const imageNameInput = imagePopUp.querySelector('.popup__input'); // Поле ввода названия нового фото
const imageLinkInput = imagePopUp.querySelector('.popup__input-link'); // Поле ввода ссылки на новое фото
const avatarPopUp = document.querySelector('.avatar-popup') // Попап для смена аватара
const avatarInput = avatarPopUp.querySelector('.avatar-input'); // Поле ввода ссылки на изображение аватара
const buttonAdd = document.querySelector('.profile__add-button'); // Кнопка добавления новых фото
const imageFormElement = imagePopUp.querySelector('.popup__form'); // Форма добавления фото
const formElementEdit = popupEdit.querySelector('.popup__form'); // Форма ввода данных профиля
const avatarFormElement = avatarPopUp.querySelector('.popup__form'); // Форма для замены аватарки
const buttonCloseList = Array.from(document.querySelectorAll('.popup__close-button')); // Все крестики над попапами
const galaryCards = document.querySelector('.galary__cards'); // Контейнер карточек
const popupSaveBtnProfile = popupEdit.querySelector('.popup__save-button'); // Кнопка отправки формы профиля
const popupSaveBtnImage = imagePopUp.querySelector('.popup__save-button') // Кнопка отправки формы добавления фото
const popupSaveBtnAvatar = avatarPopUp.querySelector('.popup__save-button') // Кнопка отправки формы смены аватара
let user = {}


const validationSettings = {
    popupForm: '.popup__form',
    popupInput: '.popup__input',
    saveBtn: '.popup__save-button',
    saveBtnInactive: 'popup__save-button_inactive',
    inputError: 'form__input_type_error',
    inputErrorActive: 'form__input-error_active',
};


Promise.all([getUserData(), getCards()])
  .then(([serverUser, cards]) => {
    user = serverUser;
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profileAvatar.src = user.avatar;

    cards.forEach((card) => {
      galaryCards.append(createCard(card, user));
    })
  })
  .catch((err) => {
    console.error(err);
  })

const editProfileInfo = (e) => {
  e.preventDefault();
  popupSaveBtnProfile.textContent = 'Сохранение...';
  editProfile(nameInput.value, jobInput.value)
    .then(() => {
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupSaveBtnProfile.textContent = 'Сохранить';
    })
}

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




formElementEdit.addEventListener('submit', editProfileInfo); 



// Функция добавления новых карточек

function addNewCard(evt) {
  evt.preventDefault();
  popupSaveBtnImage.textContent = 'Создание...';

  addCardOnServer(imageLinkInput.value, imageNameInput.value)
  .then((card) => {
    const newCard = createCard(card, user);
    galaryCards.prepend(newCard);
    imageFormElement.reset();
    closePopup(imagePopUp);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    popupSaveBtnImage.textContent = 'Создать';
  })

};

imageFormElement.addEventListener('submit', addNewCard);

// Замена аватара

const editAvatar = (e) => {
  e.preventDefault();
  popupSaveBtnAvatar.textContent = 'Сохранение...'

  updateAvatar(avatarInput.value)
    .then(() => {
      profileAvatar.src = avatarInput.value;
      avatarFormElement.reset();
      closePopup(avatarPopUp);
    })

    .catch((err) => {
      console.error(err);
    })

    .finally(() => {
      popupSaveBtnAvatar.textContent = 'Сохранить'
    })

};

avatarFormElement.addEventListener('submit', editAvatar);


// Слушатели для аватара

profileAvatarWrapper.addEventListener('mouseenter', () => {
  profileAvatarButton.classList.add('profile__avatar-button_active');
  profileAvatar.classList.add('profile__avatar_active');
})

profileAvatarWrapper.addEventListener('mouseleave', () => {
  profileAvatarButton.classList.remove('profile__avatar-button_active');
  profileAvatar.classList.remove('profile__avatar_active');
})

profileAvatarWrapper.addEventListener('click', () => {
  openPopup(avatarPopUp);
});



enableValidation(validationSettings);


// Закрытие попапов на клик вне области

popups.forEach(popup => {
  popup.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('popup')) {
      closePopup(popup)
    }
  })
});








