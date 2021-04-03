const navButton = document.getElementById("burger");
const navBar = document.querySelector(".nav-container");
console.log(navButton);

function showBar() {
  const showingBar =
    navBar.style.display == "flex"
      ? (navBar.style.display = "none")
      : (navBar.style.display = "flex");
  return showingBar;
}

navButton.addEventListener("click", showBar);

// const resNav = window.innerWidth(730);
// if (resNav.matches) {
//   navBar.style.display = "flex";
// }

//
//
//
//
//
//
//
//
//
//

// Indicador de campo faltante
const aviso = document.createElement("h2");
aviso.innerHTML = "Ingrese todos los campos";
aviso.style = "color: #FF6415;";

console.log(aviso);

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
