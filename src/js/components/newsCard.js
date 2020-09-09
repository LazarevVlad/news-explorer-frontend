import formatDate from '../utils/dateForCard';

export default class NewsCard {
  constructor(cardData, api, keyword) {
    this.cardData = cardData;
    this.api = api;
    this.keyword = keyword;
    this.card = document.createElement('div');
  }

  createCard() {
    this.card.classList.add('result__item');
    this.card.insertAdjacentHTML(
      'beforeend',
      `<button class="result__item-button"></button>
      <p class="result__save-text">Войдите, чтобы сохранять статьи</p>
    <img
      alt="Иллюстрация"
      class="result__image"
    />
    <p class="result__date"></p>
    <h3 class="result__item-title"></h3>
    <p class="result__item-text"></p>
    <p class="result__source"></p>`,
    );
    this.card.querySelector('.result__image').src = this.cardData.urlToImage;
    this.card.querySelector('.result__date').textContent = formatDate(
      this.cardData.publishedAt,
    );
    this.card.querySelector(
      '.result__item-title',
    ).textContent = this.cardData.title;
    this.card.querySelector(
      '.result__item-text',
    ).textContent = this.cardData.description;
    this.card.querySelector(
      '.result__source',
    ).textContent = this.cardData.source.name;

    return this.card;
  }

  renderIcon() {}
}
