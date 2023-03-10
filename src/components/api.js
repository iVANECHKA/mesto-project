import { checkResponse } from "./utils.js";
const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
    headers: {
        authorization: 'a6c27144-30c6-4018-999a-797280079787',
        'Content-Type': 'application/json'
    }
  }
  
  // Получаем информацию о пользователе
  
 export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
  
    .then(checkResponse);
  }

  // Получаем загруженные карточки с сервера

  export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(checkResponse);
  }

  // Меняем данные профиля на сервере

  export const editProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(checkResponse);
  }

  // Добавляем новую карточку

  export const addCardOnServer = (link, name) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(checkResponse);
  }

  // Удаляем карточку с сервера

  export const deleteCardOnServer = (card) => {
    return fetch(`${config.baseUrl}/cards/${card}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(checkResponse);
  }

  // Прибавляем лайк

  export const addLike = (card) => {
    return fetch(`${config.baseUrl}/cards/likes/${card}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then(checkResponse);
  }

  // Удаляем лайк

  export const deleteLike = (card) => {
    return fetch(`${config.baseUrl}/cards/likes/${card}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(checkResponse);
  }

  export const updateAvatar = (photo) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: photo
      })
    })
    .then(checkResponse);
  }
