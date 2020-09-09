export default class Header {
  constructor(header, api) {
    this.header = header;
    this.api = api;
    this.authBtn = this.header.querySelector('#loginBtn');
    this.exitBtn = this.header.querySelector('#logoutBtn');
    this.articlesLink = this.header.querySelector('#articlesLink');
    this.checkAuth = this.checkAuth.bind(this);
    this.logOut = this.logOut.bind(this);
    this.render = this.render.bind(this);
    this.setHandlers();
    this.checkAuth();
  }

  setHandlers() {
    this.exitBtn.addEventListener('click', this.logOut);
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
      .catch((err) => {
        this.render({
          isLoggedIn: false,
        });
      });
  }

  render(props) {
    if (!props.isLoggedIn) {
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
      .then((res) => {
        this.render({
          isLoggedIn: false,
        });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}
