"use strict";

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const mapUrl = "https://www.google.com/maps?q=%D0%96%D0%9A%20Diamond%20City%2C%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%9C%D1%83%D0%BA%D0%B0%D1%8F%20%D0%AD%D0%BB%D0%B5%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%202%2C%20%D0%91%D0%B8%D1%88%D0%BA%D0%B5%D0%BA&output=embed";

function setupNavigation() {
  const list = document.querySelector(".nav__list");
  if (!list) return;

  const contactsItem = list.querySelector('[href="contacts.html"]')?.closest("li");
  const extraItems = [
    { href: "prices.html", label: "Цены" },
    { href: "process.html", label: "Как работаем" }
  ];

  extraItems.forEach(({ href, label }) => {
    if (list.querySelector(`[href="${href}"]`)) return;
    const item = document.createElement("li");
    item.innerHTML = `<a class="nav__link" href="${href}">${label}</a>`;
    list.insertBefore(item, contactsItem || null);
  });

  if (!list.querySelector(".nav__cta-item")) {
    const localForm = document.querySelector("#estimate, #contact-request");
    const item = document.createElement("li");
    item.className = "nav__cta-item";
    item.innerHTML = `<a class="button nav__cta" href="${localForm ? `#${localForm.id}` : "contacts.html#contact-request"}">Обсудить Проект</a>`;
    list.append(item);
  }

  list.querySelectorAll(".nav__link").forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === currentPage);
    if (link.classList.contains("is-active")) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function normalizeBrandMarks() {
  document.querySelectorAll(".brand").forEach((brand) => {
    if (brand.querySelector("img")) return;
    brand.innerHTML = '<img src="assets/images/logo/control-stroy-logo.png" width="1735" height="691" alt="Control Stroy">';
  });
}

function addSecondaryHeaderPhone() {
  const primaryPhone = document.querySelector(".site-header .header-phone");
  if (!primaryPhone || document.querySelector(".header-phones")) return;

  const location = primaryPhone.querySelector("small");
  if (location) location.textContent = "Бишкек. Кыргызстан";

  const phoneGroup = document.createElement("div");
  phoneGroup.className = "header-phones";
  primaryPhone.before(phoneGroup);

  const secondaryPhone = document.createElement("a");
  secondaryPhone.className = "header-phone header-phone--secondary";
  secondaryPhone.href = "tel:+996700211291";
  secondaryPhone.textContent = "+996 700 21 12 91";
  phoneGroup.append(secondaryPhone, primaryPhone);
}

function setupHeaderCta() {
  const currentCta = document.querySelector(".site-header .header-actions .button");
  if (!currentCta) return;

  const targets = {
    "index.html": "#estimate",
    "contacts.html": "#contact-request"
  };
  const link = document.createElement("a");
  link.className = currentCta.className;
  link.href = targets[currentPage] || "contacts.html#contact-request";
  link.textContent = "Обсудить Проект";
  currentCta.replaceWith(link);
}

function standardizeFooter() {
  let footer = document.querySelector(".site-footer");
  if (!footer) {
    footer = document.createElement("footer");
    footer.className = "site-footer";
    document.body.append(footer);
  }

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html" aria-label="Control Stroy — главная"><img src="assets/images/logo/control-stroy-logo.png" width="1735" height="691" alt="Control Stroy"></a>
          <p class="footer-copy">Ремонт и интерьерные решения для жилых и коммерческих пространств в Бишкеке.</p>
        </div>
        <div>
          <h2 class="footer-title">Навигация</h2>
          <ul class="footer-links"><li><a href="services.html">Услуги</a></li><li><a href="prices.html">Цены</a></li><li><a href="projects.html">Проекты</a></li><li><a href="process.html">Как работаем</a></li><li><a href="about.html">О компании</a></li><li><a href="contacts.html">Контакты</a></li></ul>
        </div>
        <div>
          <h2 class="footer-title">Контакты</h2>
          <ul class="footer-links"><li><a href="tel:+996558949488">+996 558 94 94 88</a></li><li><a href="tel:+996700211291">+996 700 21 12 91</a></li><li><a href="https://wa.me/996558949488" target="_blank" rel="noopener noreferrer">WhatsApp</a></li><li><a href="https://www.instagram.com/controlstroy.kg/" target="_blank" rel="noopener noreferrer">Instagram</a></li></ul>
        </div>
        <div>
          <h2 class="footer-title">Адрес</h2>
          <p class="footer-copy">Бишкек, ЖК Diamond City<br>ул. Мукая Элебаева, 2, 1 этаж<br>Ежедневно 09:00–20:00</p>
          <div class="footer-map"><iframe src="${mapUrl}" loading="lazy" title="Control Stroy на карте Google"></iframe></div>
        </div>
      </div>
      <div class="footer-bottom"><span>© <span data-year></span> Control Stroy</span><a href="privacy.html">Политика конфиденциальности</a><span>Бишкек · Кыргызстан</span></div>
    </div>`;
}

function addFloatingSocials() {
  if (document.querySelector(".floating-socials")) return;
  const rail = document.createElement("aside");
  rail.className = "floating-socials";
  rail.setAttribute("aria-label", "Быстрая связь");
  rail.innerHTML = `
    <a class="floating-socials__link" href="https://www.instagram.com/controlstroy.kg/" target="_blank" rel="noopener noreferrer" aria-label="Control Stroy в Instagram"><span class="floating-socials__label">Instagram</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10.5 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg></a>
    <a class="floating-socials__link" href="https://wa.me/996558949488" target="_blank" rel="noopener noreferrer" aria-label="Написать в WhatsApp"><span class="floating-socials__label">WhatsApp</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.64 15.03L2 22l5.09-1.34A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.07-1.11l-.29-.17-3.02.8.8-2.95-.19-.3A8 8 0 1 1 12 20Zm4.38-5.38c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-1.42-.71-2.35-1.27-3.29-2.88-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/></svg></a>`;
  document.body.append(rail);
}

function enhanceContactsMap() {
  const placeholder = document.querySelector(".map-placeholder");
  if (!placeholder) return;
  placeholder.innerHTML = `<iframe src="${mapUrl}" loading="lazy" title="Control Stroy на карте Google" allowfullscreen></iframe>`;
}

function enhanceServices() {
  if (currentPage !== "services.html") return;
  const faqSection = document.querySelector(".accordion")?.closest("section");
  if (!faqSection || document.querySelector(".verified-services")) return;

  const section = document.createElement("section");
  section.className = "section verified-services";
  section.innerHTML = `<div class="container verified-services__grid"><div><p class="eyebrow">Направления работ</p><h2>Строительные услуги Control Stroy</h2><p class="section-head__copy">Состав работ и возможность выполнения отдельного этапа уточняются после знакомства с объектом.</p></div><div><div class="verified-services__list"><div class="verified-service"><span>01</span><strong>Ремонт квартир</strong></div><div class="verified-service"><span>02</span><strong>Фасадные работы</strong></div><div class="verified-service"><span>03</span><strong>Сварочные работы</strong></div><div class="verified-service"><span>04</span><strong>Отделочные работы</strong></div><div class="verified-service"><span>05</span><strong>Кровельные работы</strong></div><div class="verified-service"><span>06</span><strong>Общестроительные работы</strong></div></div><div class="price-teaser"><div><strong>Ремонт квартир — ориентир от $200/м²</strong><small>Остальные позиции рассчитываются по объёму и особенностям объекта.</small></div><a class="button" href="prices.html">Смотреть цены</a></div></div></div>`;
  faqSection.before(section);
}

function addHomeResources() {
  if (currentPage !== "index.html") return;
  const split = document.querySelector(".split");
  if (!split || document.querySelector(".resource-grid")) return;
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `<div class="container"><div class="section-head"><div><p class="eyebrow">Полезные разделы</p><h2>До начала работ</h2></div><span class="section-head__line"></span><p class="section-head__copy">Изучите порядок работы, материалы и предварительные цены.</p></div><div class="resource-grid"><a class="resource-card" href="process.html"><span class="resource-card__number">01 / Процесс</span><h3>Как строится работа</h3><p>Этапы от обращения до передачи результата.</p></a><a class="resource-card" href="materials.html"><span class="resource-card__number">02 / Материалы</span><h3>Что влияет на выбор</h3><p>Практические критерии для отделки, мебели и камня.</p></a><a class="resource-card" href="prices.html"><span class="resource-card__number">03 / Стоимость</span><h3>Ориентиры по ценам</h3><p>Базовая структура расчёта и цена ремонта от $200/м².</p></a></div></div>`;
  split.before(section);
}

function createProjectCard({ image, type, title, details, category }) {
  const article = document.createElement("article");
  article.className = "project-card";
  article.dataset.category = category;
  article.innerHTML = `
    <div class="project-card__image">
      <span class="demo-badge">Пример решения</span>
      <img src="${image}" width="1456" height="1092" loading="lazy" alt="${title}">
      <a class="project-card__action" href="project.html">Смотреть проект</a>
    </div>
    <span class="project-card__type">${type}</span>
    <h3>${title}</h3>
    <p>${details}</p>`;
  return article;
}

function addMoreProjects() {
  const additions = [
    { image: "assets/images/generated/kitchen.png", type: "Частный дом", title: "Дом с открытой кухней", details: "Кухня · мебель · камень", category: "houses" },
    { image: "assets/images/generated/bathroom.png", type: "Коммерческий объект", title: "Графичный интерьер", details: "Отделка · инженерные решения · свет", category: "commercial" }
  ];

  if (currentPage === "index.html") {
    const track = document.querySelector(".projects-grid");
    if (!track || track.dataset.enhanced === "true") return;
    additions.forEach((project) => track.append(createProjectCard(project)));
    track.dataset.enhanced = "true";

    const originals = [...track.children];
    const projectCount = originals.length;
    originals.forEach((card, index) => {
      card.dataset.projectIndex = String(index);
      card.setAttribute("aria-label", `Проект ${index + 1} из ${projectCount}`);
    });

    const beforeClones = originals.map((card) => card.cloneNode(true));
    const afterClones = originals.map((card) => card.cloneNode(true));
    track.replaceChildren(...beforeClones, ...originals, ...afterClones);

    const viewport = document.createElement("div");
    viewport.className = "projects-carousel";
    track.before(viewport);
    viewport.append(track);

    const controls = document.createElement("div");
    controls.className = "carousel-controls";
    controls.innerHTML = `<span class="carousel-counter" aria-live="polite"><strong data-carousel-current>01</strong> / ${String(projectCount).padStart(2, "0")}</span><span class="carousel-hint">Листайте проекты</span><div class="carousel-buttons"><button type="button" data-carousel-prev aria-label="Предыдущий проект">←</button><button type="button" data-carousel-next aria-label="Следующий проект">→</button></div>`;
    viewport.after(controls);

    const cards = [...track.children];
    let activeIndex = projectCount;
    let scrollFrame = 0;
    let settleTimer = 0;
    let autoplayTimer = 0;

    const cardCenter = (card) => card.offsetLeft + card.offsetWidth / 2;
    const viewportCenter = () => track.scrollLeft + track.clientWidth / 2;
    const getNearestIndex = () => {
      let nearest = 0;
      cards.forEach((card, index) => {
        if (Math.abs(cardCenter(card) - viewportCenter()) < Math.abs(cardCenter(cards[nearest]) - viewportCenter())) nearest = index;
      });
      return nearest;
    };

    const updateFocus = () => {
      activeIndex = getNearestIndex();
      const center = viewportCenter();
      const step = cards[activeIndex].offsetWidth + parseFloat(getComputedStyle(track).gap || "0");

      cards.forEach((card, index) => {
        const distance = Math.abs(cardCenter(card) - center) / Math.max(step, 1);
        const scale = Math.max(.82, 1 - distance * .16);
        const opacity = Math.max(.46, 1 - distance * .42);
        card.style.setProperty("--card-scale", scale.toFixed(3));
        card.style.setProperty("--card-opacity", opacity.toFixed(3));
        card.classList.toggle("is-active", index === activeIndex);
        card.setAttribute("aria-hidden", String(index !== activeIndex));
        card.querySelectorAll("a").forEach((link) => {
          if (index === activeIndex) link.removeAttribute("tabindex");
          else link.setAttribute("tabindex", "-1");
        });
      });

      const realIndex = Number(cards[activeIndex].dataset.projectIndex);
      controls.querySelector("[data-carousel-current]").textContent = String(realIndex + 1).padStart(2, "0");
    };

    const scrollToIndex = (index, smooth = true) => {
      const card = cards[index];
      if (!card) return;
      if (!smooth) track.classList.add("is-jumping");
      track.scrollTo({
        left: cardCenter(card) - track.clientWidth / 2,
        behavior: smooth ? "smooth" : "auto"
      });
      if (!smooth) requestAnimationFrame(() => track.classList.remove("is-jumping"));
    };

    const keepInMiddleSet = () => {
      activeIndex = getNearestIndex();
      if (activeIndex < projectCount) scrollToIndex(activeIndex + projectCount, false);
      else if (activeIndex >= projectCount * 2) scrollToIndex(activeIndex - projectCount, false);
      requestAnimationFrame(updateFocus);
    };

    const restartAutoplay = () => {
      window.clearInterval(autoplayTimer);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      autoplayTimer = window.setInterval(() => scrollToIndex(getNearestIndex() + 1), 5200);
    };

    const handleScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(updateFocus);
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(keepInMiddleSet, 180);
    };

    controls.querySelector("[data-carousel-prev]").addEventListener("click", () => {
      scrollToIndex(getNearestIndex() - 1);
      restartAutoplay();
    });
    controls.querySelector("[data-carousel-next]").addEventListener("click", () => {
      scrollToIndex(getNearestIndex() + 1);
      restartAutoplay();
    });
    track.addEventListener("scroll", handleScroll, { passive: true });
    viewport.addEventListener("mouseenter", () => window.clearInterval(autoplayTimer));
    viewport.addEventListener("mouseleave", restartAutoplay);
    viewport.addEventListener("focusin", () => window.clearInterval(autoplayTimer));
    viewport.addEventListener("focusout", restartAutoplay);
    window.addEventListener("resize", () => scrollToIndex(projectCount + Number(cards[activeIndex].dataset.projectIndex), false));

    requestAnimationFrame(() => {
      scrollToIndex(projectCount, false);
      updateFocus();
      restartAutoplay();
    });
  }

  if (currentPage === "projects.html") {
    const catalog = document.querySelector(".catalog");
    if (!catalog || catalog.dataset.enhanced === "true") return;
    additions.forEach((project) => catalog.append(createProjectCard(project)));
    catalog.dataset.enhanced = "true";
  }
}

function setupMotion() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const items = document.querySelectorAll("section:not(.hero), .service-row, .material-card, .timeline-item, .price-card");
  items.forEach((item, index) => {
    item.classList.add("motion-ready");
    item.style.setProperty("--motion-delay", `${Math.min(index % 4, 3) * 70}ms`);
  });
  document.querySelectorAll(".service-row__image, .page-hero__image, .split__image").forEach((item) => item.classList.add("image-motion"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("motion-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .08, rootMargin: "0px 0px -5%" });
  document.querySelectorAll(".motion-ready, .image-motion").forEach((item) => observer.observe(item));
}

standardizeFooter();
normalizeBrandMarks();
addSecondaryHeaderPhone();
setupHeaderCta();
setupNavigation();
addFloatingSocials();
enhanceContactsMap();
enhanceServices();
addHomeResources();
addMoreProjects();
document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });
setupMotion();

const header = document.querySelector("[data-header]");
const updateHeader = () => header?.classList.toggle("is-sticky", window.scrollY > 20);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});
