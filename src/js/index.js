/* eslint-disable no-console */
import '../pages/index.css';

import Popup from './components/popup';
import MainApi from './api/mainApi';
import NewsApi from './api/newsApi';
import Header from './components/header';
import NewsCard from './components/newsCard';
import NewsCardList from './components/newsCardList';
import Form from './components/form';

import option from './constants/consatnts';

const result = document.querySelector('.result');
const searchError = document.querySelector('.not-found');
const preloader = document.querySelector('.circle');

const openPopupSignin = document.querySelector('.header__auth');
const openPopupSignup = document.querySelector('.popup__option-text_signup');
const openPopupSigninInForm = document.querySelector(
  '.popup__option-text_signin',
);
const popupResultText = document.querySelector('.popup__option-text_result');

const headerMenu = document.querySelector('.header__menu');
const openMenu = document.querySelector('.header__menu-logo');
const closeMenu = document.querySelector('.header__list-close');
const headerBlock = document.querySelector('.header');

const popupSignin = new Popup(document.querySelector('.popup_signin'));
const popupSignup = new Popup(document.querySelector('.popup_signup'));
const popupResult = new Popup(document.querySelector('.popup_result'));

const formSignUp = document.forms.signup;
const formSignIn = document.forms.signin;
const searchForm = document.forms.search;
const formButtonSignUp = document.querySelector('.popup__button_signup');
const formButtonSignIn = document.querySelector('.popup__button_signin');

openPopupSignin.addEventListener('click', popupSignin.open);
openPopupSignup.addEventListener('click', popupSignup.open);
openPopupSignup.addEventListener('click', popupSignin.close);
openPopupSigninInForm.addEventListener('click', popupSignin.open);
openPopupSigninInForm.addEventListener('click', popupSignup.close);
popupResultText.addEventListener('click', popupSignin.open);
popupResultText.addEventListener('click', popupResult.close);

const { newsApiUrl, mainApiUrl, newsKey } = option;

const mainApi = new MainApi(mainApiUrl);
const newsApi = new NewsApi(newsApiUrl, newsKey);
const header = new Header(headerBlock, mainApi);

const createNewCard = (cardData, api, keyword) => {
  const card = new NewsCard(cardData, mainApi, keyword);
  return card.createCard();
};
// const newsCardList = new NewsCardList(
//   result,
//   createNewCard,
//   newsApi,
//   searchError,
//   preloader,
//   keyWord,
// );

//
const chekFormSignUp = new Form(formSignUp);
const chekFormSignIn = new Form(formSignIn);

chekFormSignUp.setEventListeners();
chekFormSignIn.setEventListeners();

//

// Открытие мобильного меню
function actionWithMenu() {
  headerMenu.classList.toggle('header__menu_is-active');
}

openMenu.addEventListener('click', actionWithMenu);
closeMenu.addEventListener('click', actionWithMenu);
//

// Работа с формами

formSignUp.addEventListener('submit', (event) => {
  event.preventDefault();

  const formEmail = formSignUp.elements.emailSignup;
  const formPassword = formSignUp.elements.passwordSignup;
  const formName = formSignUp.elements.name;

  mainApi
    .signup(formEmail.value, formPassword.value, formName.value)
    .then(() => {
      popupSignup.close();
      formSignUp.reset();
      popupResult.open();
      formButtonSignUp.setAttribute('disabled', true);
    })
    .catch((err) => {
      chekFormSignUp.serverError(err);
      console.log(`Ошибка: ${err}`);
    });
});
formSignIn.addEventListener('submit', (event) => {
  event.preventDefault();

  const formEmail = formSignIn.elements.emailSignin;
  const formPassword = formSignIn.elements.passwordSignin;

  mainApi
    .signin(formEmail.value, formPassword.value)
    .then(() => {
      header.checkAuth();
      popupSignin.close();
      formSignIn.reset();
      formButtonSignIn.setAttribute('disabled', true);
    })
    .catch((err) => {
      chekFormSignIn.serverError(err);
      console.log(`Ошибка: ${err}`);
    });
});
//

// Форма поиска
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const keyWord = searchForm.elements.key.value;
  const newsCardList = new NewsCardList(
    result,
    createNewCard,
    newsApi,
    searchError,
    preloader,
    keyWord,
  );

  newsCardList.renderResult();
});
//
