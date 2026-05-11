const modal = () => {
  const modal = document.querySelector(".popup");
  const buttons = document.querySelectorAll(".popup-btn");

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'block';
    })
  })

  modal.addEventListener('click', (e) => {
    if (!e.target.closest('.popup-content') || e.target.classList.contains('popup-close')){
    modal.style.display = 'none';
    }
  })
}


export default modal;