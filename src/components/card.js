import { openPopup } from "./modal.js";
import { deleteCardOnServer, addLike, deleteLike } from "./api.js";
const cardTemplate = document.querySelector('.cardTemplate'); // Шаблон карточки
const caption = document.querySelector('.imgFull-popup__caption'); // Подпись попапа с полным изображением
const bigImg = document.querySelector('.imgFull-popup__image'); // Фото попапа с полным изображением
const imageFullPopUp = document.querySelector('.imgFull-popup'); // PopUp с полным изображением

// Создание карточек
export function createCard(card, user) {

  const cardClone = cardTemplate.content.cloneNode(true);

  const img = cardClone.querySelector('.galary__image');
  const cardTitle = cardClone.querySelector('.galary__name');
  const like = cardClone.querySelector('.galary__like');
  const likeNumber = cardClone.querySelector('.galary__like-number');
  const cardBin = cardClone.querySelector('.galary__delete');

  img.src = card.link;
  img.setAttribute('alt', card.name);
  cardTitle.textContent = card.name;
  likeNumber.textContent = card.likes.length;

  img.addEventListener('click', () => openImagePopup(card.name, card.link));

  // Обработка мусорных корзин, проверка владельца карточки
  if (user._id == card.owner._id) {
    cardBin.addEventListener('click', (e) => {
      deleteCardOnServer(card._id)
        .then(() => {
          e.target.closest('.galary__card').remove();
        })
        .catch((err) => {
          console.error(err);
        })
    })
  } else {
    cardBin.classList.add('galary__delete_inactive');
  }



  // Добавление и удаление лайка

  like.addEventListener('click', (e) => {
    if (!e.target.classList.contains('galary__like_active')) {
      addLike(card._id)
        .then((card) => {
          e.target.classList.add('galary__like_active');
          likeNumber.textContent = card.likes.length;
        })
        .catch((err) => {
          console.error(err);
        })
    } else {
      deleteLike(card._id)
      .then((card) => {
        e.target.classList.remove('galary__like_active');
        likeNumber.textContent = card.likes.length;
      })
      .catch((err) => {
        console.error(err);
      })
    }
  })


    // Проверка карточек на лайки

    for (const card of card.likes) {
      if (card._id.includes(user._id)) {
        like.classList.add('galary__like_active');
      }
    }

  return cardClone;
};

// Функция добавления обработчика для фото в полном размере

function openImagePopup(name, link) {
  caption.textContent = name;
  bigImg.src = link;
  bigImg.alt = name;
  openPopup(imageFullPopUp);
}


