import '../pages/index.css';
import {closePopup, openPopup} from './modal.js';
import {enableValidation} from './validate.js';
import Card from './Card.js';
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

let user = {}

const api = new Api(config)

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([serverUser, cards]) => {
    user = serverUser;
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profileAvatar.src = user.avatar;
    const section = new Section({items: cards, renderer: createCard}, galaryCards)
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

function handleCardClick(name, link) {
  caption.textContent = name;
  bigImg.src = link;
  bigImg.alt = name;
  // function stub for class Popup
  openPopup(imageFullPopUp);
}

function createCard(data) {
  const card = new Card({card: data, user},
    cardTemplate,
    (name, link) => {
      handleCardClick(name, link);
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








