// Boton de navegacion
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

// Indicador de campo faltante
const aviso = document.createElement("h2");
aviso.innerHTML = "Ingrese todos los campos";
aviso.style = "color: #FF6415; font-size: 1.3em";

const formulario = document.querySelector(".formulario");
const inputs = formulario.querySelectorAll("input, textarea");
const submit = document.querySelector(".sendForm");

console.log(formulario, inputs, submit);

function camposVacios() {
  for (input of inputs) {
    const validarCampo =
      input.value == "" ? formulario.insertBefore(aviso, submit) : formulario;

    if (input.value == "") {
      input.style.background = "#FDFF94";
    } else {
      input.style.background = "#fff";
    }
  }
}

submit.addEventListener("click", camposVacios);
