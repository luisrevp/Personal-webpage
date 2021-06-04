const slides = [...document.getElementsByClassName("slide")];
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const pageInd = document.getElementsByClassName("pag-proyecto");

let initial = 1;

function swipeProject(num) {
  const proyectos = ["Sushi bar", "en construcción", "en construcción"];
  slides.forEach((slide, ind) => {
    slide.style.display = "none";
    pageInd[ind].innerHTML = `Página ${ind + 1}: ${proyectos[ind]}`;
  });
  if (num > slides.length) initial = 1;
  else if (num < 1) initial = slides.length;
  slides[initial - 1].style.display = "block";
}

swipeProject(initial);

const prev = prevButton.addEventListener("click", function () {
  return swipeProject((initial -= 1));
});

const next = nextButton.addEventListener("click", function () {
  return swipeProject((initial += 1));
});
