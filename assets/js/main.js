"use strict";

const year = document.querySelector("[data-year]");
const checkButton = document.querySelector('[data-action="check"]');
const status = document.querySelector("[data-status]");

if (year) {
  year.textContent = new Date().getFullYear();
}

checkButton?.addEventListener("click", () => {
  if (status) {
    status.textContent = "JavaScript работает корректно.";
  }
});
