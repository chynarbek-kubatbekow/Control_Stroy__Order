"use strict";

const menuToggle = document.querySelector("[data-menu-toggle]");
const menuBackdrop = document.querySelector("[data-menu-backdrop]");
const navigation = document.querySelector("[data-nav]");
const mobileCall = document.querySelector(".mobile-call");

let phonePopover = null;

function closePhonePopover() {
  if (!phonePopover || !mobileCall) return;
  phonePopover.hidden = true;
  mobileCall.setAttribute("aria-expanded", "false");
}

function closeMenu() {
  menuToggle?.setAttribute("aria-expanded", "false");
  navigation?.classList.remove("is-open");
  menuBackdrop?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

function openMenu() {
  closePhonePopover();
  menuToggle?.setAttribute("aria-expanded", "true");
  navigation?.classList.add("is-open");
  menuBackdrop?.classList.add("is-open");
  document.body.classList.add("menu-open");
}

if (mobileCall) {
  mobileCall.setAttribute("aria-haspopup", "dialog");
  mobileCall.setAttribute("aria-expanded", "false");
  mobileCall.setAttribute("aria-controls", "mobile-phone-popover");
  mobileCall.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.7 2.8 9.2 6a1.4 1.4 0 0 1 .1 1.5L8 9.5a14.8 14.8 0 0 0 6.5 6.5l2-1.3a1.4 1.4 0 0 1 1.5.1l3.2 2.5a1.5 1.5 0 0 1 .5 1.7l-.7 2a2 2 0 0 1-1.9 1.3C9.5 22.3 1.7 14.5 1.7 4.9A2 2 0 0 1 3 3l2-.7a1.5 1.5 0 0 1 1.7.5Z"/></svg>';

  phonePopover = document.createElement("div");
  phonePopover.id = "mobile-phone-popover";
  phonePopover.className = "phone-popover";
  phonePopover.hidden = true;
  phonePopover.setAttribute("role", "dialog");
  phonePopover.setAttribute("aria-label", "Контакты Control Stroy");
  phonePopover.innerHTML = `
    <span class="phone-popover__label">Позвонить нам</span>
    <a href="tel:+996700211291">+996 700 21 12 91</a>
    <a href="tel:+996558949488">+996 558 94 94 88</a>
    <small>Бишкек. Кыргызстан</small>
    <a class="phone-popover__whatsapp" href="https://wa.me/996558949488" target="_blank" rel="noopener noreferrer">Написать в WhatsApp →</a>`;
  mobileCall.parentElement?.append(phonePopover);

  mobileCall.addEventListener("click", (event) => {
    event.preventDefault();
    const willOpen = phonePopover.hidden;
    closeMenu();
    phonePopover.hidden = !willOpen;
    mobileCall.setAttribute("aria-expanded", String(willOpen));
  });
}

menuToggle?.addEventListener("click", () => {
  if (menuToggle.getAttribute("aria-expanded") === "true") closeMenu();
  else openMenu();
});

menuBackdrop?.addEventListener("click", () => {
  closeMenu();
  closePhonePopover();
});

navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("click", (event) => {
  if (!phonePopover || phonePopover.hidden) return;
  if (!phonePopover.contains(event.target) && !mobileCall?.contains(event.target)) closePhonePopover();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeMenu();
  closePhonePopover();
});
