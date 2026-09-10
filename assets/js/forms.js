"use strict";

const WHATSAPP_NUMBER = "996558949488";

function showError(field, message) {
  const error = field.closest(".field")?.querySelector(".field-error");
  field.setAttribute("aria-invalid", String(Boolean(message)));
  if (error) error.textContent = message;
}

function validate(form) {
  let valid = true;

  form.querySelectorAll("[required]").forEach((field) => {
    const empty = field.type === "checkbox" ? !field.checked : !field.value.trim();
    showError(field, empty ? "Заполните это поле" : "");
    if (empty) valid = false;
  });

  const phone = form.querySelector('[name="phone"]');
  if (phone && phone.value.replace(/\D/g, "").length < 9) {
    showError(phone, "Проверьте номер телефона");
    valid = false;
  }

  return valid;
}

function buildMessage(form) {
  const data = new FormData(form);
  const value = (name, fallback = "не указано") => data.get(name)?.toString().trim() || fallback;

  return [
    "Здравствуйте! Хочу обсудить проект и получить предварительный расчёт.",
    `ФИО: ${value("name")}`,
    `Телефон: ${value("phone")}`,
    `Удобный способ связи: ${value("contactMethod")}`,
    `Тип объекта: ${value("objectType")}`,
    `Услуга: ${value("service")}`,
    `Площадь: ${value("area")}`,
    `Адрес объекта: ${value("address")}`,
    `Комментарий: ${value("message", "—")}`
  ].join("\n");
}

document.querySelectorAll("[data-lead-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate(form)) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(form))}`;
    const status = form.querySelector("[data-form-status]");
    if (status) status.textContent = "Открываем WhatsApp с подготовленным сообщением…";
    window.open(url, "_blank", "noopener,noreferrer");
  });
});
