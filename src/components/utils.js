// Изменение информации в профиле
import { editPopUp, nameInput, jobInput, profileName, profileJob } from "./index.js";
import { closePopup } from "./modal.js";
export function handleProfileFormSubmit (evt) {
    evt.preventDefault(); // Что-то отменяется

    profileName.textContent = nameInput.value; // Меняем имя на то, что ввёл пользователь в input'е
    profileJob.textContent = jobInput.value;

    closePopup(editPopUp); // PopUp закрывается
}