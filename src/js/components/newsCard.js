import formatDate from '../utils/dateForCard';

export default class NewsCard {
  constructor(cardData, api, keyword) {
    this.cardData = cardData;
    this.api = api;
    this.keyword = keyword;
    this.card = document.createElement('div');
    this.isLoggedIn = false;
    this.checkAuth();
    console.log(this.isLoggedIn);
  }

  checkAuth() {
    this.api
      .getUserData()
      .then((res) => {
        this.isLoggedIn = true;
      })
      .catch((err) => {
        this.isLoggedIn = false;
      });
  }

  renderMessage() {
    this.cardButton.addEventListener('mouseover', () => {
      this.cardMessage.classList.remove('result__save-text_invisible');
    });
    this.cardButton.addEventListener('mouseout', () => {
      this.cardMessage.classList.add('result__save-text_invisible');
    });
  }

  toggleIcon() {
    this.cardButton.addEventListener('click', () => {
      this.cardButton.classList.toggle('result__item-button_is-active');
    });
  }

  renderIcon() {}

  createCard() {
    this.card.classList.add('result__item');
    this.card.insertAdjacentHTML(
      'beforeend',
      `<button class="result__item-button"></button>
      <p class="result__save-text result__save-text_invisible">Войдите, чтобы сохранять статьи</p>
    <img
      alt="Иллюстрация"
      class="result__image"
    />
    <p class="result__date"></p>
    <h3 class="result__item-title"></h3>
    <p class="result__item-text"></p>
    <p class="result__source"></p>`,
    );
    this.cardImage = this.card.querySelector('.result__image');
    this.cardDate = this.card.querySelector('.result__date');
    this.cardTitle = this.card.querySelector('.result__item-title');
    this.cardText = this.card.querySelector('.result__item-text');
    this.cardSource = this.card.querySelector('.result__source');
    this.cardButton = this.card.querySelector('.result__item-button');
    this.cardMessage = this.card.querySelector('.result__save-text');
    this.cardImage.src = this.cardData.urlToImage;
    this.cardDate.textContent = formatDate(this.cardData.publishedAt);
    this.cardTitle.textContent = this.cardData.title;
    this.cardText.textContent = this.cardData.description;
    this.cardSource.textContent = this.cardData.source.name;
    this.renderMessage();
    this.toggleIcon();
    return this.card;
  }
}
