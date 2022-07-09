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
const imageFullPopUp = document.querySelector('.imgFull-popup');
const imageFullCloseButton = imageFullPopUp.querySelector('.popup__close-button'); 
const galary = document.querySelector('.galary');
const galaryCards = document.querySelector('.galary__cards'); 
const cardTemplate = document.querySelector('.cardTemplate');
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

// Открытие окна просмотра фото
galaryCards.addEventListener('click', function(e) {

  const image = e.target.closest('.galary__image');
  const div = image.nextElementSibling;
  const h2 = div.firstElementChild;
  const caption = document.querySelector('.imgFull-popup__caption');
  const bigImg = document.querySelector('.imgFull-popup__image');

  if (!image) {
    return;
  }

  caption.textContent = h2.textContent;
  bigImg.src = image.src;
  openPopup(imageFullPopUp);

});



// В полях ввода по умолчанию появляются актуальные данные

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;



// Изменение информации в профиле

function formSubmitHandler (evt) {
    evt.preventDefault(); // Что-то отменяется

    profileName.textContent = nameInput.value; // Меняем имя на то, что ввёл пользователь в input'е
    profileJob.textContent = jobInput.value;

    editPopUp.classList.replace('popup_opened', 'popup_closed'); // PopUp закрывается
}

formElement.addEventListener('submit', formSubmitHandler); 


// Добавляем карточки через JS


function createFirstCards(name, link) {

  const cardClone = cardTemplate.content.cloneNode(true);

  const img = cardClone.querySelector('.galary__image');
  const h2 = cardClone.querySelector('.galary__name');
  
  img.src = link;
  img.setAttribute('alt', name);
  h2.textContent = name;

  return cardClone;
};

initialCards.forEach(card => {
  const cardElement = createFirstCards(card.name, card.link);
  galaryCards.append(cardElement);
});

// Создание новых карточек

function createNewCard () {

  const cardClone = cardTemplate.content.cloneNode(true);

  const img = cardClone.querySelector('.galary__image');
  const h2 = cardClone.querySelector('.galary__name');
  
  img.src = imageLinkInput.value;
  img.setAttribute('alt', imageNameInput.value);
  h2.textContent = imageNameInput.value;

  return cardClone;

};

// Функция добавления новых карточек

function addNewCard(evt) {
  evt.preventDefault();

  const newCard = createNewCard();
  galaryCards.prepend(newCard);

  imagePopUp.classList.toggle('popup_opened');

  imageNameInput.value = '';
  imageLinkInput.value = '';
};

imageFormElement.addEventListener('submit', addNewCard);


// Удаление карточек

galaryCards.addEventListener('click', function(e) {
  const deleteButton = e.target.closest('.galary__delete');
  if (!deleteButton) {
    return;
  }

  deleteButton.parentElement.remove();
})

// Лайки

galaryCards.addEventListener('click', function(e) {
  const likeButton = e.target.closest('.galary__like');
  if (!likeButton) {
    return;
  }

  likeButton.classList.toggle('galary__like_active');
});





