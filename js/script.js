const editPopUp = document.querySelector('.popup'); // PopUp редактирования профиля
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

// Открытие окна редактирования профиля
editButton.addEventListener('click', function() {
    editPopUp.classList.toggle('popup_opened');
});

// Закрытие окна редактирования профиля
editCloseButton.addEventListener('click', function() {
    editPopUp.classList.toggle('popup_opened');
});

// Открытие окна добавления фото
addButton.addEventListener('click', function() {
    imagePopUp.classList.toggle('popup_opened');
});

// Закрытие окна добавления фото
imageCloseButton.addEventListener('click', function() {
    imagePopUp.classList.toggle('popup_opened');
});

// Закрытие окна просмотра фото
imageFullCloseButton.addEventListener('click', function() {
  imageFullPopUp.classList.toggle('popup_opened');
});

// Открытие окна просмотра фото
galaryCards.addEventListener('click', function(e) {

  const image = e.target.closest('.galary__image');
  const div = image.nextElementSibling;
  const h2 = div.firstChild;
  const caption = document.querySelector('.imgFull-popup__caption');
  const bigImg = document.querySelector('.imgFull-popup__image');

  if (!image) {
    return;
  }

  caption.textContent = h2.textContent;
  bigImg.src = image.src;
  imageFullPopUp.classList.toggle('popup_opened');

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


for (let i = 0; i < initialCards.length; ++i) {
    
    const li = document.createElement('li');  
    li.classList.add('galary__card');
    
    const image = document.createElement('img');
    image.src = initialCards[i].link;
    image.classList.add('galary__image');
    image.setAttribute('alt', initialCards[i].name);

    const div = document.createElement('div');
    div.classList.add('galary__info');

    const buttonDel = document.createElement('button');
    buttonDel.classList.add('galary__delete');
    buttonDel.setAttribute('type', 'button');


    const h2 = document.createElement('h2');
    h2.classList.add('galary__name');
    h2.textContent = initialCards[i].name;

    const likeButton = document.createElement('button');
    likeButton.classList.add('galary__like');
    likeButton.setAttribute('type', 'button');

    li.appendChild(image);
    li.appendChild(div);
    li.appendChild(buttonDel);
    div.appendChild(h2);
    div.appendChild(likeButton);

    galaryCards.appendChild(li);
};


// Добавление новых карточек

function addNewImage (evt) {
    evt.preventDefault(); // Что-то отменяется

    const li = document.createElement('li');  
    li.classList.add('galary__card');
    
    const image = document.createElement('img');
    image.src = imageLinkInput.value;
    image.classList.add('galary__image');
    image.setAttribute('alt', imageNameInput.value);

    const buttonDel = document.createElement('button');
    buttonDel.classList.add('galary__delete');
    buttonDel.setAttribute('type', 'button');

    const div = document.createElement('div');
    div.classList.add('galary__info');

    const h2 = document.createElement('h2');
    h2.classList.add('galary__name');
    h2.textContent = imageNameInput.value;

    const likeButton = document.createElement('button');
    likeButton.classList.add('galary__like');
    likeButton.setAttribute('type', 'button');

    li.appendChild(image);
    li.appendChild(div);
    li.appendChild(buttonDel);
    div.appendChild(h2);
    div.appendChild(likeButton);

    galaryCards.prepend(li);

    imagePopUp.classList.replace('popup_opened', 'popup_closed');

    imageNameInput.value = '';
    imageLinkInput.value = '';

};

imageFormElement.addEventListener('submit', addNewImage);


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





