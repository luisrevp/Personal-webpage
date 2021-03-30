// CREANDO NUESTRO BOTON
/////////////////////////////////////////////////////////////////
let dropDownBtn = document.createElement("a");
dropDownBtn.setAttribute("id", "dropdown");
dropDownBtn.setAttribute("href", "#");
dropDownBtn.style = "display: flex; justify-content: center; align-items: center; width: 100%; margin-top: 15px";

let burgerImg = document.createElement("img");
burgerImg.setAttribute("src", "./imagenes/Hamburger_icon.svg");
burgerImg.style = "display: block; filter: invert(100%)";

let textoInt = document.createElement("p");
textoInt.innerHTML = "PRESIONE AQUÍ"
textoInt.style = "color: white; padding: 0px 15px; font-weight: 600";

dropDownBtn.append(burgerImg, textoInt);
console.log(dropDownBtn);

// AÑADIENDO NUESTRO BOTON AL DOM
//////////////////////////////////////////////////////////////
let barranav = document.querySelector(".ul-container");
let navcontainer = document.querySelector(".nav-container");
navcontainer.insertBefore(dropDownBtn, barranav);

let header = document.querySelector("header");


// MEDIA QUERY
const mediaQuery = window.matchMedia("(max-width: 730px)");


// el boton
dropDownBtn.addEventListener("click", clickarBoton);
function clickarBoton(){
    let indexStat = [];
    let contenedores = document.querySelectorAll(".li-container");
    for(let i = 0; i < contenedores.length; i++){
        contenedores[i].style = "visibility: visible";
        indexStat.push(i);
    }
    document.querySelector(".ul-container").style="height: 300px; justify-content: space-evenly;"
    header.style.height = "520px";
}