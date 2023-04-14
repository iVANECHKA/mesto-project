import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupImage = this._popup.querySelector('.imgFull-popup__image');
        this._popupName = this._popup.querySelector('.imgFull-popup__caption');
    }

    open(imageLink, imageCaption) {
        this._popupImage.src = imageLink;
        this._popupImage.alt = imageCaption;
        this._popupName.textContent = imageCaption;
        super.open();
    }
}