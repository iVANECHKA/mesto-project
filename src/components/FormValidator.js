export default class FormValidator {

    constructor(validatorSettings, form) {
        this._validatorSettings = validatorSettings;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._formButton = this._form.querySelector('.popup__save-button');
    };


    _showInputError(inputElement, validationMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validatorSettings.inputError);
        errorElement.textContent = validationMessage;
        errorElement.classList.add(this._validatorSettings.inputErrorActive);
    };

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validatorSettings.inputError);
        errorElement.textContent = '';
        errorElement.classList.remove(this._validatorSettings.inputErrorActive);
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _checkInputValidity(inputElement) {

        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity('');
        }

        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };


    toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._formButton.classList.add(this._validatorSettings.saveBtnInactive);
            this._formButton.disabled = true;
        } else {
            this._formButton.classList.remove(this._validatorSettings.saveBtnInactive);
            this._formButton.disabled = false;
        }
    }

    _setEventListeners() {
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }

    resetValidation() {
        this.toggleButtonState();
  
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
  
      }

}