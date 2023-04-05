import '../pages/index.css';
import { enableValidation } from './validate.js';
import Card from './Card.js';
import { config } from "./config.js";
import Api from "./Api.js";
import { data } from 'autoprefixer';
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
  avatarFormElement,
  avatarPopUp,
  profileAvatarWrapper,
  profileAvatarButton,
  validationSettings,
  popups,
  caption,
  bigImg,
  imageFullPopUp, cardTemplate
} from './variables.js';
import Section from "./Section.js";
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

let user = {}

const api = new Api(config)

const userInfo = new UserInfo({ userName: profileName, userDescription: profileJob, userAvatar: profileAvatar });

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([serverUser, cards]) => {
    user = serverUser;
    userInfo.setUserInfo({ name: serverUser.name, description: serverUser.about });
    userInfo.setUserAvatar({ avatarLink: serverUser.avatar })
    const section = new Section({ items: cards, renderer: createCard }, galaryCards)
    section.renderItems()
  })
  .catch((err) => {
    console.error(err);
  })

function handleLikeClick(likeElement, id, likeNumber) {
  if (!likeElement.classList.contains('galary__like_active')) {
    api.addLike(id)
      .then((res) => {
        likeElement.classList.add('galary__like_active');
        // debugger
        likeNumber.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    api.deleteLike(id)
      .then((res) => {
        likeElement.classList.remove('galary__like_active');
        likeNumber.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error(err);
      })
  }
}

function handleDeleteClick(cardElement, id) {
  api.deleteCardOnServer(id)
    .then((res) => {
      cardElement.remove();
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    })
}


function createCard(data) {
  const card = new Card({ card: data, user },
    cardTemplate,
    (name, link) => {
      fullImagePopup.open(link, name);
    },
    (cardElement, id, likeNumber) => {
      handleLikeClick(cardElement, id, likeNumber);
    },
    (cardElement, id) => {
      handleDeleteClick(cardElement, id)
    }
  )
  return card.getRenderCard();
}


// Попап профиля
const profilePopup = new PopupWithForm(popupEdit, (e) => {
  e.preventDefault();
  popupSaveBtnProfile.textContent = 'Сохранение...';
  const formValues = profilePopup.getValues();

  api.editProfile(formValues.userName, formValues.userDescription).then((data) => {
    userInfo.setUserInfo({ name: data.name, description: data.about });
    profilePopup.close();
  })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupSaveBtnProfile.textContent = 'Сохранить';
    })
});

profilePopup.setEventListeners();

// Открытие окна редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  profilePopup.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});



// Попап добавления фото

const imageAddPopup = new PopupWithForm(imagePopUp, (e) => {

  e.preventDefault();
  popupSaveBtnImage.textContent = 'Создание...';
  const formValues = imageAddPopup.getValues();

  api.addCardOnServer(formValues.placeLink, formValues.placeName)
    .then((card) => {
      const newCard = createCard(card, user);
      galaryCards.prepend(newCard);
      imageFormElement.reset();
      imageAddPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupSaveBtnImage.textContent = 'Создать';
    })

});

imageAddPopup.setEventListeners(); 

// Открытие окна добавления фото
buttonAdd.addEventListener('click', function () {
  imageAddPopup.open();
});


// Попап аватара

const avatarPopup = new PopupWithForm(avatarPopUp, (e) => {
  e.preventDefault();
  popupSaveBtnProfile.textContent = 'Сохранение...';
  const formValues = avatarPopup.getValues();
  avatarFormElement.reset();

  api.updateAvatar(formValues.avatarLink).then((data) => {
    userInfo.setUserAvatar({ avatarLink: data.avatar });
    avatarPopup.close();
  })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupSaveBtnProfile.textContent = 'Сохранить';
    })
});

avatarPopup.setEventListeners();


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
  avatarPopup.open();
});


//Попап полного изображения

const fullImagePopup = new PopupWithImage(imageFullPopUp);
fullImagePopup.setEventListeners();

enableValidation(validationSettings);









