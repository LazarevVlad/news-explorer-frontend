import '../pages/articles/articles.css';

const headerMenuArticles = document.querySelector(
  '.header__menu_type_articles',
);
const openMenuArticles = document.querySelector(
  '.header__menu-logo_type_articles',
);
const closeMenuArticles = document.querySelector(
  '.header__list-close_type_articles',
);

// Открытие мобильного меню
function actionWithMenu() {
  headerMenuArticles.classList.toggle('header__menu_type_articles_is-active');
}

openMenuArticles.addEventListener('click', actionWithMenu);
closeMenuArticles.addEventListener('click', actionWithMenu);
//
