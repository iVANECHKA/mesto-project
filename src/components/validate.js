// Валидация

  
  const checkInputValidity = (formElement, inputElement, validationSettings) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }
  
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
      hideInputError(formElement, inputElement, validationSettings);
    }
  };
  
  const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.inputErrorActive);
  };
  
  const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputError);
    errorElement.classList.remove(validationSettings.inputErrorActive);
    errorElement.textContent = '';
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }
  
  const toggleButtonState = (inputList, buttonElement, validationSettings) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationSettings.saveBtnInactive);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(validationSettings.saveBtnInactive);
      buttonElement.disabled = false;
    }
  }
  
  
  
  const setEventListeners = (formElement, validationSettings) => {
  
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.popupInput));
    const buttonElement = formElement.querySelector(validationSettings.saveBtn);
  
    toggleButtonState(inputList, buttonElement, validationSettings);
  
    formElement.addEventListener('submit', () => {
      toggleButtonState(inputList, buttonElement, validationSettings);
    })
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationSettings);
        toggleButtonState(inputList, buttonElement, validationSettings);
      });
    });
  };
  
 export const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.popupForm));
    formList.forEach((formElement) => {
  
      formList.forEach(formElement => {
        setEventListeners(formElement, validationSettings);
      })
      
    });
  };