// menu.js
const menu = () => {
  const menuEl = document.querySelector("menu");
  if (!menuEl) return;

  const toggleMenu = () => menuEl.classList.toggle("active-menu");
  const closeMenu = () => menuEl.classList.remove("active-menu");

  document.addEventListener("click", (e) => {
    const burgerBtn = e.target.closest(".menu"); // кнопка-бургер
    const closeBtn = e.target.closest(".close-btn"); // крестик
    const menuLink = e.target.closest("menu ul li a"); // пункты меню

    if (burgerBtn) {
      e.preventDefault();
      toggleMenu();
      return;
    }

    if (closeBtn) {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (menuLink) {
      closeMenu();
    }
  });
};

export default menu;
