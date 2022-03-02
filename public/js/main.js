let showPages = document.querySelectorAll(".open-nav");
let sideNavBox = document.querySelectorAll(".side-nav");
let sideNavContent = document.querySelectorAll(".side-nav > div");

showPages.forEach(page => {
  page.addEventListener("click", e => {
    navigator.clipboard.writeText("KhaledHayek");
    let relevantMenu = e.currentTarget.dataset.target; 
    document.querySelector(`.${relevantMenu}`).classList.add("show-nav");
  })
})

sideNavBox.forEach(box => {
  box.addEventListener("click", () => {
    box.classList.remove("show-nav");
  })
})

sideNavContent.forEach(content => {
  content.addEventListener("click", e => {
    e.stopPropagation();
  })
})
