const slidesContainer = document.querySelector(".slide-wrap");
const slideshow = document.querySelector(".slideshow");
const prevButton = document.querySelector(".prev");
const prevButtonResp = document.querySelector(".prev-resp");
const nextButton = document.querySelector(".next");
const nextButtonResp = document.querySelector(".next-resp");
const pageInd = document.getElementsByClassName("pag-proyecto");
const noProjectsToShow = document.createElement("h1");

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
  let projects = response.filter(project => {
    return project.homepage != null
      && project.homepage.includes(project.owner.login)
      && !project.name.toLowerCase().includes("personal-webpage");
  });

  if(projects.length > 0){
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
      title.target = "_blank";
      title.innerHTML = project.name.toUpperCase().replace(/-/g, " ");
      description.classList.add("project-description");
      
      titleContainer.append(title);
      wrapper.append(titleContainer,img);
      description.innerHTML = project.description;
      img.src = `imagenes/${project.name}.jpg`
  
      slidesContainer.insertBefore(wrapper, nextButton);
      slideshow.appendChild(description);
      descriptions.push(description);
    });
  } else {
    noProjectsToShow.innerHTML = "There are no projects to display...";
    noProjectsToShow.style = "display: block; width: 80%; text-align: center; border-bottom: 2px solid rgb(124, 32, 9)";
    slidesContainer.replaceWith(noProjectsToShow);
  }

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

[prevButton, prevButtonResp].forEach(button => button.addEventListener("click", () => swipeProject((initial -= 1))));
[nextButton, nextButtonResp].forEach(button => button.addEventListener("click", () => swipeProject((initial += 1))));

window.addEventListener("keydown", (e) => {
  if(e.key == "ArrowLeft") swipeProject((initial -= 1));
})

window.addEventListener("keydown", (e) => {
  if(e.key == "ArrowRight") swipeProject((initial += 1))
})

getAllMyRepos("https://api.github.com/users/luisrevp/repos");