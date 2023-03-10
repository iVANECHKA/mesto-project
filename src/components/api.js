const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
    headers: {
        authorization: 'a6c27144-30c6-4018-999a-797280079787',
        'Content-Type': 'application/json'
    }
  }
  
  // Получаем информацию о пользователе
  
 export const getUserData = () => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/users/me', {
        method: 'GET',
        headers: config.headers
    })
  
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // Получаем загруженные карточки с сервера

  export const getCards = () => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/cards', {
      headers: config.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // Меняем данные профиля на сервере

  export const editProfile = (name, about) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/users/me', {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // Добавляем новую карточку

  export const addCardOnServer = (link, name) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/cards', {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // Удаляем карточку с сервера

  export const deleteCardOnServer = (card) => {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-20/cards/${card}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // Прибавляем лайк

  export const addLike = (card) => {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-20/cards/likes/${card}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // Удаляем лайк

  export const deleteLike = (card) => {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-20/cards/likes/${card}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  export const updateAvatar = (photo) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/users/me/avatar', {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: photo
      })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }