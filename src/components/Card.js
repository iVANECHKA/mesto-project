export default class Card {
  constructor({card, user}, templateElement, handleCardClick, handleLikeClick, handleDeleteClick) {
    // debugger
    this._cardId = card._id;
    this._cardName = card.name;
    this._cardLink = card.link;
    this._cardLikes = card.likes;
    this._userId = user._id;
    this._ownerId = card.owner._id;
    this._templateElement = templateElement;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return this._templateElement.content.querySelector('.galary__card').cloneNode(true);
  }

  getRenderCard() {
    this._cardElement = this._getTemplate()
    this._img = this._cardElement.querySelector('.galary__image');
    this._cardTitle = this._cardElement.querySelector('.galary__name');
    this._like = this._cardElement.querySelector('.galary__like');
    this._likeNumber = this._cardElement.querySelector('.galary__like-number');
    this._cardBin = this._cardElement.querySelector('.galary__delete');

    this._img.src = this._cardLink;
    this._img.setAttribute('alt', this._cardName);
    this._cardTitle.textContent = this._cardName;
    this._likeNumber.textContent = this._cardLikes.length;

    if (this._userId !== this._ownerId) {
      this._cardBin.remove()
    }
    this._cardLikes.forEach(userLike => {
      if (userLike._id === this._userId) {
        this._like.classList.add('galary__like_active');
      }
    })

    this._setCardEventListeners()

    return this._cardElement;
  }

  _setCardEventListeners() {
    this._like.addEventListener('click', (e) => {
      this._handleLikeClick(this._like, this._cardId, this._likeNumber);
    });
    if (this._cardBin) {
      this._cardBin.addEventListener('click', () => {
        this._handleDeleteClick(this._cardElement, this._cardId);
      });
    }

    this._img.addEventListener('click', () => {
      this._handleCardClick(this._cardName, this._cardLink);
    });
  }
}


