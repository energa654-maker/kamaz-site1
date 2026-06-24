function renderHeader() {
  document.write(`
    <script src="/api.js?v=postgres1"></script>
    <header class="header">
      <a class="logo" href="/index.html">КамАвтоВектор</a>

      <button class="menu-btn" type="button" aria-label="Открыть меню" onclick="toggleLayoutMenu()">≡</button>

      <nav class="nav" id="siteMenu" aria-label="Главная навигация">
        <a href="/index.html">Главная</a>
        <a href="/pages/catalog.html">Каталог</a>
        <a href="/pages/stock.html">В наличии</a>
        <a href="/pages/offers.html">Акции</a>
        <a href="/pages/leasing.html">Лизинг</a>
        <a href="/pages/service.html">Сервис</a>
        <a href="/pages/faq.html">FAQ</a>
        <a href="/pages/reviews.html">Отзывы</a>
        <a href="/pages/about.html">О компании</a>
        <a href="/pages/vacancies.html">Вакансии</a>
      </nav>
    </header>
  `);
}

function toggleLayoutMenu() {
  const menu = document.getElementById("siteMenu");
  if (menu) {
    menu.classList.toggle("open");
  }
}

function renderFooter() {
  document.write(`
    <footer class="footer" id="contacts">
      <div class="footer-grid">
        <div>
          <h3>Контакты</h3>
          <p><a href="tel:+79274191444">+7 (927) 419-14-44</a></p>
          <p><a href="mailto:energa432@mail.ru">energa432@mail.ru</a></p>
        </div>

        <div>
          <h3>Разделы</h3>
          <p><a href="/pages/catalog.html">Каталог техники</a></p>
          <p><a href="/pages/stock.html">Техника в наличии</a></p>
          <p><a href="/pages/offers.html">Акции и спецпредложения</a></p>
          <p><a href="/pages/leasing.html">Лизинг</a></p>
          <p><a href="/pages/service.html">Сервис и оформление</a></p>
          <p><a href="/pages/faq.html">Вопросы и ответы</a></p>
          <p><a href="/pages/documents.html">Документы для сделки</a></p>
          <p><a href="/pages/quote.html">Получить КП</a></p>
          <p><a href="/pages/reviews.html">Отзывы клиентов</a></p>
        </div>

        <div>
          <h3>Документы</h3>
          <p><a href="/privacy.html">Политика конфиденциальности</a></p>
          <p><a href="/consent.html">Согласие на обработку данных</a></p>
        </div>
      </div>

      <div class="copyright">
        © 2026 ООО "МеталлМаш" — проект КамАвтоВектор
      </div>
    </footer>
  `);
}
