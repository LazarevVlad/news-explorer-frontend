/* eslint-disable no-underscore-dangle */

import dateform from '../utils/dateForRequest';

export default class NewsApi {
  constructor() {
    // this.options = options;
    this.baseUrl = 'http://newsapi.org/v2/everything?';
    this.key = 'da16eee876a84da689fb591539326b29';
    this.pageSize = 100;
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

  getNews(keyWord) {
    return fetch(
      `${this.baseUrl}q=${keyWord}&from=${dateform().dateFrom}&to=${
        dateform().dateTo
      }&pageSize=${this.pageSize}&apiKey=${this.key}`,
    )
      .then((res) => NewsApi._getResponseData(res))
      .catch((err) => NewsApi._getError(err));
  }
}
