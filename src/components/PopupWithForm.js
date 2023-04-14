import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, handlerSubmit) {
        super(popup);
        this._formElement = this._popup.querySelector('.popup__form');
        this._formSubmitBtn = this._formElement.querySelector('.popup__save-button');
        this._formInputList = this._formElement.querySelectorAll('.popup__input');
        this._handlerSubmit = handlerSubmit;
    }

    _getInputValues() {
        const values = {};

        this._formInputList.forEach((input) => {
            values[input.name] = input.value;
        });

        return values;
    }

    getValues() {
        return this._getInputValues();
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (e) => {
            this._handlerSubmit(e);
        })

        super.setEventListeners();
    }

    close() {
        this._formElement.reset();
        super.close();
    }

    
}