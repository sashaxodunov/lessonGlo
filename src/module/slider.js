const slider = ({
  sliderSelector,
  slideSelector,
  nextBtnSelector,
  prevBtnSelector,
  activeSlideClass = "slide-active",
  activeDotClass = "dot-active",
}) => {
  const sliderBlock = document.querySelector(sliderSelector);

  // Проверка существования слайдера
  if (!sliderBlock) {
    return;
  }

  const slides = document.querySelectorAll(slideSelector);

  // Проверка существования слайдов
  if (!slides.length) {
    return;
  }

  // Создание контейнера точек
  const dotsWrap = document.createElement("ul");
  dotsWrap.classList.add("portfolio-dots");

  // Создание точек
  slides.forEach((_, index) => {
    const dot = document.createElement("li");

    dot.classList.add("dot");

    if (index === 0) {
      dot.classList.add(activeDotClass);
    }

    dotsWrap.append(dot);
  });

  sliderBlock.append(dotsWrap);

  const dots = dotsWrap.querySelectorAll(".dot");

  const timeInterval = 2000;

  let currentSlide = 0;
  let interval;

  // Активируем первый слайд
  slides[currentSlide].classList.add(activeSlideClass);

  const prevSlide = (elems, index, strClass) => {
    elems[index].classList.remove(strClass);
  };

  const nextSlide = (elems, index, strClass) => {
    elems[index].classList.add(strClass);
  };

  const autoSlide = () => {
    prevSlide(slides, currentSlide, activeSlideClass);
    prevSlide(dots, currentSlide, activeDotClass);

    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    nextSlide(slides, currentSlide, activeSlideClass);
    nextSlide(dots, currentSlide, activeDotClass);
  };

  const startSlide = (timer = 1500) => {
    clearInterval(interval);
    interval = setInterval(autoSlide, timer);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  sliderBlock.addEventListener("click", (e) => {
    e.preventDefault();

    if (!e.target.matches(".dot, .portfolio-btn")) {
      return;
    }

    prevSlide(slides, currentSlide, activeSlideClass);
    prevSlide(dots, currentSlide, activeDotClass);

    if (e.target.matches(nextBtnSelector)) {
      currentSlide++;
    } else if (e.target.matches(prevBtnSelector)) {
      currentSlide--;
    } else if (e.target.classList.contains("dot")) {
      dots.forEach((dot, index) => {
        if (dot === e.target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    nextSlide(slides, currentSlide, activeSlideClass);
    nextSlide(dots, currentSlide, activeDotClass);
  });

  sliderBlock.addEventListener("mouseover", (e) => {
    if (e.target.matches(".dot, .portfolio-btn")) {
      stopSlide();
    }
  });

  sliderBlock.addEventListener("mouseout", (e) => {
    if (e.target.matches(".dot, .portfolio-btn")) {
      startSlide(timeInterval);
    }
  });

  startSlide(timeInterval);
};

export default slider;
