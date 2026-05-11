const menu = () => {
  const menuEl = document.querySelector("menu");
  const burgerBtn = document.querySelector(".menu");
  if (!menuEl || !burgerBtn) return;

  const toggleMenu = (e) => {
    const burger = e.target.closest(".menu");
    const close = e.target.closest(".close-btn");
    const link = e.target.closest("menu ul li a");
    const insideMenu = e.target.closest("menu");

    if (burger) {
      e.preventDefault();
      menuEl.classList.toggle("active-menu");
      return;
    }

    if (close || link) {
      if (close) e.preventDefault();
      menuEl.classList.remove("active-menu");
      return;
    }

    if (!insideMenu && menuEl.classList.contains("active-menu")) {
      menuEl.classList.remove("active-menu");
    }
  };

  document.addEventListener("click", toggleMenu);
};

export default menu;
