export const popupEdit = document.querySelector('.profileEdit-popup'); // PopUp редактирования профиля
export const popups = Array.from(document.querySelectorAll('.popup')); // Все попапы (массив)
export const nameInput = popupEdit.querySelector('.popup__input'); // Поле ввода имени
export const jobInput = document.querySelector('.job-input') // Поле ввода работы
export const profileName = document.querySelector('.profile__name'); // Имя в профиле
export const profileJob = document.querySelector('.profile__description'); // Работа в профиле
export const profileAvatarWrapper = document.querySelector('.profile__avatar-wrapper') // Обертка для аватара и кнопки
export const profileAvatar = document.querySelector('.profile__avatar'); // Аватарка провиля
export const profileAvatarButton = document.querySelector('.profile__avatar-button') // Кнопка редактирования аватара
export const buttonEditProfile = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
export const imagePopUp = document.querySelector('.imgAdd-popup'); // PopUp добавления изображений
export const imageNameInput = imagePopUp.querySelector('.popup__input'); // Поле ввода названия нового фото
export const imageLinkInput = imagePopUp.querySelector('.popup__input-link'); // Поле ввода ссылки на новое фото
export const avatarPopUp = document.querySelector('.avatar-popup') // Попап для смена аватара
export const avatarInput = avatarPopUp.querySelector('.avatar-input'); // Поле ввода ссылки на изображение аватара
export const buttonAdd = document.querySelector('.profile__add-button'); // Кнопка добавления новых фото
export const imageFormElement = imagePopUp.querySelector('.popup__form'); // Форма добавления фото
export const formElementEdit = popupEdit.querySelector('.popup__form'); // Форма ввода данных профиля
export const avatarFormElement = avatarPopUp.querySelector('.popup__form'); // Форма для замены аватарки
export const buttonCloseList = Array.from(document.querySelectorAll('.popup__close-button')); // Все крестики над попапами
export const galaryCards = document.querySelector('.galary__cards'); // Контейнер карточек
export const popupSaveBtnProfile = popupEdit.querySelector('.popup__save-button'); // Кнопка отправки формы профиля
export const popupSaveBtnImage = imagePopUp.querySelector('.popup__save-button') // Кнопка отправки формы добавления фото
export const popupSaveBtnAvatar = avatarPopUp.querySelector('.popup__save-button') // Кнопка отправки формы смены аватара

export const cardTemplate = document.querySelector('.cardTemplate'); // Шаблон карточки
export const caption = document.querySelector('.imgFull-popup__caption'); // Подпись попапа с полным изображением
export const bigImg = document.querySelector('.imgFull-popup__image'); // Фото попапа с полным изображением
export const imageFullPopUp = document.querySelector('.imgFull-popup'); // PopUp с полным изображением

export const validationSettings = {
  popupForm: '.popup__form',
  popupInput: '.popup__input',
  saveBtn: '.popup__save-button',
  saveBtnInactive: 'popup__save-button_inactive',
  inputError: 'form__input_type_error',
  inputErrorActive: 'form__input-error_active',
};