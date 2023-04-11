export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserData() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  editProfile(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  addCardOnServer(link, name) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCardOnServer(card) {
    return this._request(`${this._baseUrl}/cards/${card}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  addLike(card) {
    return this._request(`${this._baseUrl}/cards/likes/${card}`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  deleteLike(card) {
    return this._request(`${this._baseUrl}/cards/likes/${card}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  updateAvatar(photo) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: photo
      })
    })
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }
}