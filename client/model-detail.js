function renderModelPage(slug) {
  const model = getKamazModel(slug);
  const root = document.getElementById("modelPage");

  if (!model || !root) {
    document.title = "Модель не найдена — КамЦентр";
    if (root) {
      root.innerHTML = `
        <section class="model-empty">
          <h1>Модель не найдена</h1>
          <p>Откройте каталог и выберите подходящую технику.</p>
          <a class="btn btn-primary" href="/pages/catalog.html">Вернуться в каталог</a>
        </section>
      `;
    }
    return;
  }

  document.title = `${model.title} — КамЦентр`;

  const mainImage = model.image;
  const fallback = model.fallbackImage || model.image;
  const gallery = (model.gallery || [mainImage]).slice(0, 3);

  root.innerHTML = `
    <section class="model-hero">
      <div class="page-inner model-hero-grid">
        <div>
          <a class="back-link" href="/pages/catalog.html">Назад в каталог</a>
          <span class="kicker">${model.categoryName}</span>
          <h1>${model.title}</h1>
          <p>${model.short}</p>
          <div class="hero-specs">${model.specs.map(item => `<span>${item}</span>`).join("")}</div>
          <div class="hero-actions">
            <a class="btn btn-primary" href="/index.html#lead-form" onclick="sessionStorage.setItem('kamazLeadModel', '${model.title}')">Запросить расчет</a>
            <a class="btn btn-outline" href="/pages/leasing.html">Рассчитать лизинг</a>
          </div>
        </div>
        <div class="model-photo">
          <img src="${mainImage}" alt="${model.title}" onerror="this.onerror=null; this.src='${fallback}'">
        </div>
      </div>
    </section>

    <section class="model-section section-white">
      <div class="page-inner model-grid">
        <article class="model-card">
          <h2>Для каких задач подходит</h2>
          <ul>${model.tasks.map(item => `<li>${item}</li>`).join("")}</ul>
        </article>
        <article class="model-card">
          <h2>Почему стоит рассмотреть</h2>
          <ul>${model.benefits.map(item => `<li>${item}</li>`).join("")}</ul>
        </article>
        <article class="model-card accent-card">
          <h2>Ориентир по цене</h2>
          <strong>${model.price}</strong>
          <p>${model.note}</p>
        </article>
      </div>
    </section>

    <section class="model-section">
      <div class="page-inner">
        <div class="section-head">
          <h2>Фотографии модели</h2>
          <p>Посмотрите внешний вид автомобиля, кабину и рабочие ракурсы. Если нужны дополнительные фото или конкретная комплектация, менеджер пришлет подборку под ваш запрос.</p>
        </div>
        <div class="gallery-grid">
          ${gallery.map((src, index) => `
            <img src="${src}" alt="${model.title}, фото ${index + 1}" onerror="this.onerror=null; this.src='${fallback}'">
          `).join("")}
        </div>
      </div>
    </section>

    <section class="model-section section-white">
      <div class="page-inner deal-panel">
        <div>
          <span class="kicker dark">Как купить</span>
          <h2>Подберем комплектацию и рассчитаем сделку</h2>
          <p>Опишите задачу: груз, маршрут, город, бюджет и желаемый формат оплаты. Менеджер подготовит варианты и объяснит, что лучше подойдет под вашу работу.</p>
        </div>
        <div class="deal-steps">
          <span>1. Заявка</span>
          <span>2. Подбор</span>
          <span>3. Расчет</span>
          <span>4. Документы</span>
          <span>5. Передача техники</span>
        </div>
        <div class="deal-actions">
          <a class="btn btn-primary" href="/index.html#lead-form" onclick="sessionStorage.setItem('kamazLeadModel', '${model.title}')">Оставить заявку</a>
          <a class="btn btn-outline" href="https://wa.me/79274191444" target="_blank" rel="noopener">WhatsApp</a>
          <a class="btn btn-outline" href="https://max.ru/" target="_blank" rel="noopener">MAX</a>
        </div>
      </div>
    </section>
  `;
}
