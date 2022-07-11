const editPopUp = document.querySelector('.profileEdit-popup'); // PopUp редактирования профиля
const nameInput = editPopUp.querySelector('.popup__input'); // Поле ввода имени
const jobInput = nameInput.nextElementSibling; // Поле ввода работы
const profileName = document.querySelector('.profile__name'); // Имя в профиле
const profileJob = document.querySelector('.profile__description'); // Работа в профиле
const editButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const editCloseButton = document.querySelector('.popup__close-button'); // Кнопка закрытия окна с редактрованием профиля
const imagePopUp = document.querySelector('.imgAdd-popup'); // PopUp добавления изображений
const imageNameInput = imagePopUp.querySelector('.popup__input'); // Поле ввода названия нового фото
const imageLinkInput = imageNameInput.nextElementSibling; // Поле ввода ссылки на новое фото
const addButton = document.querySelector('.profile__add-button'); // Кнопка добавления новых фото
const imageFormElement = imagePopUp.querySelector('.popup__form'); // Форма добавления фото
const formElement = editPopUp.querySelector('.popup__form'); // Форма ввода данных профиля
const imageCloseButton = imagePopUp.querySelector('.popup__close-button'); // Кнопка закрытия окна с добавлением фото
const imageFullPopUp = document.querySelector('.imgFull-popup'); // PopUp с полным изображением
const imageFullCloseButton = imageFullPopUp.querySelector('.popup__close-button'); // Кнопка закрытия попапа с полным изображением
const galary = document.querySelector('.galary'); // Родитель GalaryCards
const galaryCards = document.querySelector('.galary__cards'); // Контейнер карточек
const cardTemplate = document.querySelector('.cardTemplate'); // Шаблон карточки
const caption = document.querySelector('.imgFull-popup__caption'); // Подпись попапа с полным изображением
const bigImg = document.querySelector('.imgFull-popup__image'); // Фото попапа с полным изображением
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
  


// Открытие/Закрытие окон

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

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



// Изменение информации в профиле

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); // Что-то отменяется

    profileName.textContent = nameInput.value; // Меняем имя на то, что ввёл пользователь в input'е
    profileJob.textContent = jobInput.value;

    closePopup(editPopUp); // PopUp закрывается
}

formElement.addEventListener('submit', handleProfileFormSubmit); 


// Создание карточек
function createCard(name, link) {

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



// Функция добавления обработчика для фото в полном размере

function addHandlerBigImg(item) {
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

function addHandlerLike(item) {
  item.addEventListener('click', function(e) {
    const likeButton = e.target.closest('.galary__like');
  if (!likeButton) { 
    return;
  }

  likeButton.classList.toggle('galary__like_active');
  });
};


// Функция добавления обработчика для мусорок

function addHandlerBin(item) {
  item.addEventListener('click', function(e) {
    const deleteButton = e.target.closest('.galary__delete');
  if (!deleteButton) {
    return;
  }

  deleteButton.parentElement.remove();
  });
};





