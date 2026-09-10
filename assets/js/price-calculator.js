"use strict";

const calculator = document.querySelector("[data-calculator]");

if (calculator) {
  const range = calculator.querySelector("[data-calc-range]");
  const number = calculator.querySelector("[data-calc-number]");
  const result = calculator.querySelector("[data-calc-result]");
  const rate = 200;

  function update(value) {
    const area = Math.min(500, Math.max(20, Number(value) || 20));
    range.value = area;
    number.value = area;
    result.textContent = `$${new Intl.NumberFormat("ru-RU").format(area * rate)}`;
  }

  range.addEventListener("input", () => update(range.value));
  number.addEventListener("input", () => update(number.value));
}
