import { animate } from "./helpers.js";

const calc = (price = 100) => {
  const calcBlock = document.querySelector(".calc-block");
  const calcType = document.querySelector(".calc-type");
  const calcSquare = document.querySelector(".calc-square");
  const calcCount = document.querySelector(".calc-count");
  const calcDay = document.querySelector(".calc-day");
  const total = document.querySelector("#total");

  if (!calcBlock || !total) return;

  const animateNumber = (el, to, duration = 600) => {
    const from = Number(el.textContent.replace(/\s/g, "")) || 0;

    animate({
      duration,

      draw(progress) {
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);

        const current = Math.round(from + (to - from) * eased);

        el.textContent = current;
      },

      done() {
        el.textContent = Math.round(to);
      },
    });
  };

  const countCalc = () => {
    const calcTypeValue = +calcType.options[calcType.selectedIndex].value;

    const calcSquareValue = +calcSquare.value;

    let totalValue = 0;

    let calcCountValue = 1;
    let calcDayValue = 1;

    if (+calcCount.value > 1) {
      calcCountValue += +calcCount.value / 10;
    }

    if (calcDay.value && +calcDay.value < 5) {
      calcDayValue = 2;
    } else if (calcDay.value && +calcDay.value < 10) {
      calcDayValue = 1.5;
    }

    if (calcTypeValue && calcSquareValue) {
      totalValue =
        price * calcTypeValue * calcSquareValue * calcCountValue * calcDayValue;
    }

    animateNumber(total, Math.round(totalValue));
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
