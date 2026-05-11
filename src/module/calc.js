const calc = (price = 100) => {
  const calcBlock = document.querySelector(".calc-block");
  const calcType = document.querySelector(".calc-type");
  const calcSquare = document.querySelector(".calc-square");
  const calcCount = document.querySelector(".calc-count");
  const calcDay = document.querySelector(".calc-day");
  const total = document.querySelector("#total");

  if (!calcBlock || !total) return;

  // --- анимация перебора цифр ---
  const animateNumber = (el, to, duration = 500) => {
    // если уже идет анимация — отменим
    if (el._raf) cancelAnimationFrame(el._raf);

    const from = Number(el.textContent.replace(/\s/g, "")) || 0;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);

      // easeOutCubic (можно заменить на linear)
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = Math.round(from + (to - from) * eased);
      el.textContent = current; // или current.toLocaleString('ru-RU')

      if (progress < 1) {
        el._raf = requestAnimationFrame(step);
      } else {
        el.textContent = Math.round(to); // финальное значение точно
        el._raf = null;
      }
    };

    el._raf = requestAnimationFrame(step);
  };

  const countCalc = () => {
    const calcTypeValue = +calcType.options[calcType.selectedIndex].value;
    const calcSquareValue = +calcSquare.value; // число
    let totalValue = 0;

    let calcCountValue = 1;
    let calcDayValue = 1;

    if (+calcCount.value > 1) calcCountValue += +calcCount.value / 10;

    if (calcDay.value && +calcDay.value < 5) calcDayValue = 2;
    else if (calcDay.value && +calcDay.value < 10) calcDayValue = 1.5;

    if (calcTypeValue && calcSquareValue) {
      totalValue =
        price * calcTypeValue * calcSquareValue * calcCountValue * calcDayValue;
    }

    // вместо total.textContent = totalValue;
    animateNumber(total, Math.round(totalValue), 600);
  };

  calcBlock.addEventListener("input", (e) => {
    if (
      e.target === calcType ||
      e.target === calcSquare ||
      e.target === calcCount ||
      e.target === calcDay
    ) {
      countCalc();
    }
  });
};

export default calc;
