const buttonModal = document.querySelector(".li-container:nth-child(2)");
const cancel = document.querySelector(".modal > .cross");
const modal = document.querySelector(".modal-background");
console.log(buttonModal, cancel, modal);

buttonModal.addEventListener("click", showModal);
cancel.addEventListener("click", hideModal);
modal.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  else return hideModal();
});

function showModal(e) {
  modal.style = `
  opacity: 1;
  display: flex;
  `;
  window.addEventListener("scroll", noScroll);
}

function hideModal() {
  modal.style = `
  opacity: 0;
  display: none;
  `;
  window.removeEventListener("scroll", noScroll);
}

function noScroll() {
  return window.scrollTo(0, 0);
}
