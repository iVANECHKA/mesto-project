import '../pages/index.css';
import Card from '../components/Card.js';
import { config } from "../utils/config.js";
import Api from "../components/Api.js";
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
} from '../utils/variables.js';
import Section from "../components/Section.js";
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

let user = {}

const api = new Api(config)

const userInfo = new UserInfo({ userName: profileName, userDescription: profileJob, userAvatar: profileAvatar });

const section = new Section({ renderer: createCard }, galaryCards)

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.popupForm))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(validationSettings);

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([serverUser, cards]) => {
    user = serverUser;
    userInfo.setUserInfo({ name: serverUser.name, description: serverUser.about });
    userInfo.setUserAvatar({ avatarLink: serverUser.avatar })
    section.renderItems(cards)
  })
  .catch((err) => {
    console.error(err);
  })
function handleLikeClick(card) {
  if (!card._isLiked()) {
    api.addLike(card._cardId)
      .then((res) => {
        card._addLike(res)
      })
      .catch((err) => {
        console.log(err);
      })
  } else
  {
    api.deleteLike(card._cardId)
      .then((res) => {
        card._removeLike(res)
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
    (card) => {
      handleLikeClick(card);
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
  nameInput.value = userInfo.getUserInfo().profileName;
  jobInput.value = userInfo.getUserInfo().profileDescription;
  formValidators['profileEdit'].resetValidation();
  profilePopup.open();
});



// Попап добавления фото

const imageAddPopup = new PopupWithForm(imagePopUp, (e) => {

  e.preventDefault();
  popupSaveBtnImage.textContent = 'Создание...';
  const formValues = imageAddPopup.getValues();

  api.addCardOnServer(formValues.placeLink, formValues.placeName)
    .then((card) => {
      section.renderItem(card)
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
  formValidators['addingNewImage'].resetValidation();
  imageAddPopup.open();
});


// Попап аватара

const avatarPopup = new PopupWithForm(avatarPopUp, (e) => {
  e.preventDefault();
  popupSaveBtnProfile.textContent = 'Сохранение...';
  const formValues = avatarPopup.getValues();

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
  formValidators['edittingAvatar'].resetValidation();
  avatarPopup.open();
});


//Попап полного изображения

const fullImagePopup = new PopupWithImage(imageFullPopUp);
fullImagePopup.setEventListeners();

// enableValidation(validationSettings);









