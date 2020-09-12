export default class SaveCard {
  constructor(cardData, api) {
    this.cardData = cardData;
    this.api = api;
    this.card = document.createElement('div');
    this.deleteCard = this.deleteCard.bind(this);
  }

  createCard() {
    this.card.classList.add('result__item');
    this.card.insertAdjacentHTML(
      'beforeend',
      `<button class="result__item-button result__item-button_type_articles"></button>
      <p class="result__key-word"></p>
      <p class="result__save-text result__save-text_type_articles result__save-text_invisible">
        Убрать из сохранённых
      </p>
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
    this.cardKeyword = this.card.querySelector('.result__key-word');
    this.cardDate = this.card.querySelector('.result__date');
    this.cardTitle = this.card.querySelector('.result__item-title');
    this.cardText = this.card.querySelector('.result__item-text');
    this.cardSource = this.card.querySelector('.result__source');
    this.cardButton = this.card.querySelector(
      '.result__item-button_type_articles',
    );
    this.cardMessage = this.card.querySelector(
      '.result__save-text_type_articles',
    );
    this.cardLink.href = this.cardData.link;
    this.cardImage.src = this.cardData.image;
    this.cardKeyword.textContent = this.cardData.keyword;
    this.cardDate.textContent = this.cardData.date;
    this.cardTitle.textContent = this.cardData.title;
    this.cardText.textContent = this.cardData.text;
    this.cardSource.textContent = this.cardData.source;
    console.log(this.card);
    this.setListener();
    return this.card;
  }

  setListener() {
    this.card
      .querySelector('.result__item-button_type_articles')
      .addEventListener('click', this.deleteCard);
    this.cardButton.addEventListener('mouseover', () => {
      this.cardMessage.classList.remove('result__save-text_invisible');
    });
    this.cardButton.addEventListener('mouseout', () => {
      this.cardMessage.classList.add('result__save-text_invisible');
    });
  }

  removeListener() {
    this.card
      .querySelector('.result__item-button_type_articles')
      .removeEventListener('click', this.deleteCard);
    this.cardButton.removeEventListener('mouseover', () => {
      this.cardMessage.classList.remove('result__save-text_invisible');
    });
    this.cardButton.removeEventListener('mouseout', () => {
      this.cardMessage.classList.add('result__save-text_invisible');
    });
  }

  deleteCard(event) {
    this.api
      .removeArticles(this.cardData._id)
      .then(() => {
        this.removeListener();
        event.target.closest('.result__item').remove();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }
}
