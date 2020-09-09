/* eslint-disable no-restricted-syntax */
export default class NewsCardList {
  constructor(container, creatNewCard, api, error, preloader) {
    this.api = api;
    this.creatNewCard = creatNewCard;
    this.container = container;
    this.list = this.container.querySelector('.result__list');
    this.button = document.querySelector('.result__button');
    this.articles = undefined;
    this.error = error;
    this.preloader = preloader;
    this.showMore();
  }

  renderResult(keyword) {
    this.renderLoader();
    this.api
      .getNews(keyword)
      .then((res) => {
        this.renderLoader();
        if (res.articles.length === 0) {
          this.renderError();
        } else {
          this.container.classList.remove('result_invisible');
          this.articles = res.articles;
          this.addCard(keyword);
        }
      })
      .catch((err) => {
        this.renderLoader();
        this.renderError();
        console.log(err);
      });
  }

  addCard(keyword) {
    if (this.articles.length > 3) {
      for (let i = 0; i < 3; i += 1) {
        const templ = this.creatNewCard(this.articles[i], this.api, keyword);
        this.list.appendChild(templ);
      }
      this.articles = this.articles.slice(3);
    } else {
      this.button.classList.add('result__button_invisible');
      for (let i = 0; i < 3; i += 1) {
        const templ = this.creatNewCard(this.articles[i], this.api, keyword);
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
