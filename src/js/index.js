import '../pages/index.css';

const openPopupSignin = document.querySelector('.header__auth');
const openPopupSignup = document.querySelector('.popup__option-text_signup');
const openPopupSigninInForm = document.querySelector(
  '.popup__option-text_signin',
);
const headerMenu = document.querySelector('.header__menu');
const openMenu = document.querySelector('.header__menu-logo');
const closeMenu = document.querySelector('.header__list-close');

class Popup {
  constructor(popup) {
    this.popup = popup;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.popup
      .querySelector('.popup__close')
      .addEventListener('click', this.close);
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }
}

const popupSignin = new Popup(document.querySelector('.popup_signin'));
const popupSignup = new Popup(document.querySelector('.popup_signup'));
const popupResult = new Popup(document.querySelector('.popup_result'));

openPopupSignin.addEventListener('click', popupSignin.open);
openPopupSignup.addEventListener('click', popupSignup.open);
openPopupSignup.addEventListener('click', popupSignin.close);
openPopupSigninInForm.addEventListener('click', popupSignin.open);
openPopupSigninInForm.addEventListener('click', popupSignup.close);

// Открытие мобильного меню
function actionWithMenu() {
  headerMenu.classList.toggle('header__menu_is-active');
}

openMenu.addEventListener('click', actionWithMenu);
closeMenu.addEventListener('click', actionWithMenu);
//
