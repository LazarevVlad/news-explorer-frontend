/* eslint-disable no-console */
export default class Header {
  constructor(header, api) {
    this.header = header;
    this.api = api;
    this.authBtn = this.header.querySelector('#loginBtn');
    this.exitBtn = this.header.querySelector('#logoutBtn');
    this.articlesLink = this.header.querySelector('#articlesLink');
    this.checkAuth = this.checkAuth.bind(this);
    this.checkAuth();
    this.render = this.render.bind(this);
    this.setHandlers();
  }

  setHandlers() {
    this.exitBtn.addEventListener('click', this.logOut.bind(this));
  }

  checkAuth() {
    this.api
      .getUserData()
      .then((res) => {
        this.render({
          isLoggedIn: true,
          name: res.name,
        });
      })
      .catch(() => {
        this.render({
          isLoggedIn: false,
        });
      });
  }

  render(props) {
    if (this.header.classList.contains('header_type_articles')) {
      if (!props.isLoggedIn) {
        document.location.href = './';
      } else {
        // eslint-disable-next-line operator-linebreak
        this.exitBtn.querySelector('.header__exit-text').textContent =
          props.name;
      }
    } else if (!props.isLoggedIn) {
      this.exitBtn.classList.add('header__list-item_is-disabled');
      this.authBtn.classList.remove('header__list-item_is-disabled');
      this.articlesLink.classList.add('header__list-item_is-disabled');
    } else {
      this.exitBtn.classList.remove('header__list-item_is-disabled');
      this.authBtn.classList.add('header__list-item_is-disabled');
      this.articlesLink.classList.remove('header__list-item_is-disabled');
      this.exitBtn.querySelector('.header__exit-text').textContent = props.name;
    }
  }

  logOut() {
    this.api
      .logOut()
      .then(() => {
        this.render({
          isLoggedIn: false,
        });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}
