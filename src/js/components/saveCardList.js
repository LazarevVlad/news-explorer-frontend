/* eslint-disable no-restricted-syntax */
export default class SaveCardList {
  constructor(container, createNewCard, api, info) {
    this.container = container;
    this.createNewCard = createNewCard;
    this.api = api;
    this.info = info;
  }

  addCard(cardData) {
    const templ = this.createNewCard(cardData);
    this.container.appendChild(templ);
  }

  render() {
    this.api
      .getArticles()
      .then((res) => {
        console.log(res.data);
        const cards = res.data;
        for (const card of cards) {
          this.addCard(card);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}
