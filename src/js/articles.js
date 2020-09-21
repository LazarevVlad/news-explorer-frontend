/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import '../pages/articles/articles.css';

import Header from './components/header';
import MainApi from './api/mainApi';
import SaveCard from './components/saveCard';
import SaveCardList from './components/saveCardList';

import option from './constants/consatnts';

const headerBlock = document.querySelector('.header');
const info = document.querySelector('.info');
const list = document.querySelector('.result__list');

const headerMenuArticles = document.querySelector(
  '.header__menu_type_articles',
);
const openMenuArticles = document.querySelector(
  '.header__menu-logo_type_articles',
);
const closeMenuArticles = document.querySelector(
  '.header__list-close_type_articles',
);

const infoTitle = document.querySelector('.info__description');
const infoBlock = document.querySelector('.info__key-words');
const infoKey = document.querySelector('.info__key-word');
const userName = document.querySelector('.header__exit-text');

const { mainApiUrl } = option;

const mainApi = new MainApi(mainApiUrl);
const header = new Header(headerBlock, mainApi);

const createNewCard = (cardData) => {
  const card = new SaveCard(cardData, mainApi);
  return card.createCard();
};
const cardList = new SaveCardList(list, createNewCard, mainApi, info);
cardList.render();

// Открытие мобильного меню
function actionWithMenu() {
  headerMenuArticles.classList.toggle('header__menu_type_articles_is-active');
}

openMenuArticles.addEventListener('click', actionWithMenu);
closeMenuArticles.addEventListener('click', actionWithMenu);
//
const keywords = [];
const resiltkeyword = [];
//
mainApi.getArticles().then((res) => {
  res.data.forEach((item) => {
    keywords.push(item.keyword);
  });
  keywords.forEach((item) => {
    if (resiltkeyword[item] !== undefined) {
      ++resiltkeyword[item];
    } else {
      resiltkeyword[item] = 1;
    }
  });
  const keyList = Object.keys(resiltkeyword).sort(
    (a, b) => resiltkeyword[b] - resiltkeyword[a],
  );
  const firstKey = keyList[0];
  const secondKey = keyList[1];
  const allKey = keyList.length - 2;

  if (firstKey === undefined) {
    infoBlock.textContent = '';
    // info;
  }
  if (secondKey === undefined) {
    infoKey.textContent = firstKey;
  } else {
    infoKey.textContent = `${firstKey}, ${secondKey} и ${allKey} другим`;
  }
  const numberOfArticles = res.data.length;
  infoTitle.textContent = `${userName.textContent}, у вас ${numberOfArticles} сохраненных статей`;
});
