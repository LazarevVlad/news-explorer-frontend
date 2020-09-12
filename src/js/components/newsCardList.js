/* eslint-disable no-console */
export default class NewsCardList {
  constructor(container, creatNewCard, api, error, preloader, keyword) {
    this.api = api;
    this.creatNewCard = creatNewCard;
    this.container = container;
    this.list = this.container.querySelector('.result__list');
    this.button = this.container.querySelector('.result__button');
    this.articles = undefined;
    this.error = error;
    this.preloader = preloader;
    this.keyword = keyword;
    this.showMore();
  }

  renderResult() {
    this.renderLoader();
    this.api
      .getNews(this.keyword)
      .then((res) => {
        this.renderLoader();
        if (res.articles.length === 0) {
          this.renderError();
        } else {
          const items = this.list.querySelectorAll('.result__item');
          if (items.length !== 0) {
            items.forEach((item) => {
              this.list.removeChild(item);
            });
          }

          this.container.classList.remove('result_invisible');
          this.articles = res.articles;
          this.addCard(this.keyword);
        }
      })
      .catch((err) => {
        this.renderLoader();
        this.renderError();
        console.log(`Ошибка: ${err}`);
      });
  }

  addCard() {
    if (this.articles.length > 3) {
      for (let i = 0; i < 3; i += 1) {
        const templ = this.creatNewCard(
          this.articles[i],
          this.api,
          this.keyword,
        );
        this.list.appendChild(templ);
      }
      this.articles = this.articles.slice(3);
    } else {
      this.button.classList.add('result__button_invisible');
      for (let i = 0; this.articles.length < 3; i += 1) {
        const templ = this.creatNewCard(
          this.articles[i],
          this.api,
          this.keyword,
        );
        this.list.appendChild(templ);
      }
    }
  }

  renderLoader() {
    if (this.preloader.classList.contains('circle_invisible')) {
      this.preloader.classList.remove('circle_invisible');
    } else {
      this.preloader.classList.add('circle_invisible');
    }
  }

  renderError() {
    if (this.error.classList.contains('not-found_invisible')) {
      this.error.classList.remove('not-found_invisible');
    } else {
      this.error.classList.add('not-found_invisible');
    }
  }

  showMore() {
    this.button.addEventListener('click', this.addCard.bind(this));
  }
}
