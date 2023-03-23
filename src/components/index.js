import '../pages/index.css';
import {closePopup, openPopup} from './modal.js';
import {enableValidation} from './validate.js';
import {createCard} from './card.js';
import {config} from "./config.js";
import Api from "./Api.js";
import {data} from 'autoprefixer';
import {
  profileName,
  profileJob,
  profileAvatar,
  galaryCards,
  popupSaveBtnProfile,
  nameInput,
  jobInput,
  popupEdit,
  imageFormElement,
  buttonEditProfile,
  buttonAdd,
  imagePopUp,
  buttonCloseList,
  formElementEdit,
  popupSaveBtnImage,
  imageLinkInput,
  imageNameInput,
  popupSaveBtnAvatar,
  avatarInput,
  avatarFormElement, avatarPopUp, profileAvatarWrapper, profileAvatarButton, validationSettings, popups
} from './variables.js';

let user = {}

const api = new Api(config)

Promise.all([api.getUserData(), api.getInitialCards()])
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
  api.editProfile(nameInput.value, jobInput.value)
    .then(() => {
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
      closePopup(popupEdit);
      imageFormElement.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupSaveBtnProfile.textContent = 'Сохранить';
    })
};

// Открытие окна редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// Открытие окна добавления фото
buttonAdd.addEventListener('click', function () {
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

  api.addCardOnServer(imageLinkInput.value, imageNameInput.value)
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

  api.updateAvatar(avatarInput.value)
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








