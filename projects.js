const slidesContainer = document.querySelector(".slide-wrap");
const slideshow = document.querySelector(".slideshow");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const pageInd = document.getElementsByClassName("pag-proyecto");

let initial = 1;
let descriptions = [];

async function getAllMyRepos(url){
  try{
    let response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" }
    });

    if(response.ok){
      let parseData = await response.json();
      showResponse(parseData);
      return parseData;
    };
  }catch (er){
    console.log("No pudimos traer el user");
    throw new Error(er);
  }
}

const showResponse = (response) => {
  const pattern = /(apod)|(extension)|(sushi)/gi;
  let projects = response.filter(project => {
    return pattern.test(project.name);
  });

  projects.forEach((project, ind)=> {

    let wrapper = document.createElement("div");
    let titleContainer = document.createElement("div");
    let title = document.createElement("a");
    let img = document.createElement("img");
    let description = document.createElement("p");

    wrapper.classList.add("slide",`slide${ind+1}`);
    titleContainer.classList.add("project-link-container");
    title.classList.add("project-link");
    title.href = project.homepage;
    title.innerHTML = project.name.toUpperCase().replace(/-/g, " ");
    description.classList.add("project-description");
    
    titleContainer.append(title);
    wrapper.append(titleContainer,img);
    description.innerHTML = project.description;
    img.src = `imagenes/${project.name}.jpg`

    slidesContainer.insertBefore(wrapper, nextButton);
    slideshow.appendChild(description);
    descriptions.push(description);
    console.log(descriptions);
    console.log(wrapper);
  });

  swipeProject(initial);
}


function swipeProject(num) {
  const slides = [...document.getElementsByClassName("slide")];
  slides.forEach((slide) => slide.style.display = "none");

  if (num > slides.length) initial = 1;
  else if (num < 1) initial = slides.length;
  slides[initial - 1].style.display = "block";

  slides.forEach((slide, ind) => {
    return slide.style.display != "block"
      ? descriptions[ind].style.display = "none"
      : descriptions[ind].style.display = "block";
  });
}

prevButton.addEventListener("click", () => swipeProject((initial -= 1)));
nextButton.addEventListener("click", () => swipeProject((initial += 1)));

window.addEventListener("keydown", (e) => {
  if(e.key == "ArrowLeft") swipeProject((initial -= 1));
})

window.addEventListener("keydown", (e) => {
  if(e.key == "ArrowRight") swipeProject((initial += 1))
})

getAllMyRepos("https://api.github.com/users/luisrevp/repos");