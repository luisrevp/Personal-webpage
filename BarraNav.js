// Boton de navegacion

let show = false;
let widthPage = window.innerWidth;

const burgerButton = document.getElementById("burger");
const navBar = document.querySelector(".nav-container");
const res = window.matchMedia("(max-width: 730px)");

function showNav() {
  if (!res.matches && navBar.style.display == "none") {
    navBar.style.display = "block";
  }
}

function dropdown(e) {
  if (navBar.style.display == "none") {
    navBar.style.display = "block";
  } else navBar.style.display = "none";
}

window.addEventListener("resize", showNav);
burgerButton.addEventListener("click", dropdown);

burgerButton.addEventListener("click", (e) => {
  let trueState = !show;
  console.log(trueState, show);
  return !trueState ? show : trueState;
});
