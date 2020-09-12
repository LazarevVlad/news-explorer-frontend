/* eslint-disable no-underscore-dangle */
export default class MainApi {
  constructor(url) {
    this.url = url;
  }

  static _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(res.status));
  }

  static _getError(err) {
    return Promise.reject(new Error(err.message));
  }

  signup(email, password, name) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => MainApi._getResponseData(res))
      .catch((err) => MainApi._getError(err));
  }

  signin(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => MainApi._getResponseData(res))
      .catch((err) => MainApi._getError(err));
  }

  logOut() {
    return fetch(`${this.url}/users/cookie`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => MainApi._getResponseData(res))
      .catch((err) => MainApi._getError(err));
  }

  getUserData() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => MainApi._getResponseData(res))
      .catch((err) => MainApi._getError(err));
  }

  getArticles() {
    return fetch(`${this.url}/articles/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => MainApi._getResponseData(res))
      .catch((err) => MainApi._getError(err));
  }

  createArticles(keyword, title, text, date, source, link, image) {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    })
      .then((res) => MainApi._getResponseData(res))
      .catch((err) => MainApi._getError(err));
  }

  removeArticles(articlesId) {
    return fetch(`${this.url}/articles/${articlesId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => MainApi._getResponseData(res))
      .catch((err) => MainApi._getError(err));
  }
}
