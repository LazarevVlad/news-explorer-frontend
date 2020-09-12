/* eslint-disable no-console */
import formatDate from '../utils/dateForCard';

export default class NewsCard {
  constructor(cardData, api, keyword) {
    this.cardData = cardData;
    this.api = api;
    this.keyword = keyword;
    this.card = document.createElement('div');
    this.flag = document.getElementById('loginBtn');
  }

  renderMessage() {
    if (!this.flag.classList.contains('header__list-item_is-disabled')) {
      this.cardButton.addEventListener('mouseover', () => {
        this.cardMessage.classList.remove('result__save-text_invisible');
      });
      this.cardButton.addEventListener('mouseout', () => {
        this.cardMessage.classList.add('result__save-text_invisible');
      });
    }
  }

  renderIcon() {
    if (this.flag.classList.contains('header__list-item_is-disabled')) {
      if (this.cardButton.classList.contains('result__item-button_is-active')) {
        this.api
          .removeArticles(this.id)
          .then(() => {
            this.cardButton.classList.remove('result__item-button_is-active');
            this.cardButton.classList.add('result__item-button_hover');
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        this.api
          .createArticles(
            this.keyword,
            this.cardTitle.textContent,
            this.cardText.textContent,
            this.cardDate.textContent,
            this.cardSource.textContent,
            this.cardData.url,
            this.cardImage.src,
          )
          .then((res) => {
            this.id = res.data._id;
            this.cardButton.classList.add('result__item-button_is-active');
            this.cardButton.classList.remove('result__item-button_hover');
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    }
  }

  setListeners() {
    this.cardButton.addEventListener('click', this.renderIcon.bind(this));
  }

  createCard() {
    this.card.classList.add('result__item');
    this.card.insertAdjacentHTML(
      'beforeend',
      `<button class="result__item-button result__item-button_hover"></button>
      <p class="result__save-text result__save-text_invisible">Войдите, чтобы сохранять статьи</p>
    <img
      alt="Иллюстрация"
      class="result__image"
    />
    <p class="result__date"></p>
    <a class="result__link"  target="_blank">
    <h3 class="result__item-title"></h3>
    <p class="result__item-text"></p>
    <p class="result__source"></p>
    </a>`,
    );
    this.cardLink = this.card.querySelector('.result__link');
    this.cardImage = this.card.querySelector('.result__image');
    this.cardDate = this.card.querySelector('.result__date');
    this.cardTitle = this.card.querySelector('.result__item-title');
    this.cardText = this.card.querySelector('.result__item-text');
    this.cardSource = this.card.querySelector('.result__source');
    this.cardButton = this.card.querySelector('.result__item-button');
    this.cardMessage = this.card.querySelector('.result__save-text');
    this.cardLink.href = this.cardData.url;
    this.cardImage.src = this.cardData.urlToImage;
    this.cardDate.textContent = formatDate(this.cardData.publishedAt);
    this.cardTitle.textContent = this.cardData.title;
    this.cardText.textContent = this.cardData.description;
    this.cardSource.textContent = this.cardData.source.name;
    this.renderMessage();
    this.setListeners();
    return this.card;
  }
}
