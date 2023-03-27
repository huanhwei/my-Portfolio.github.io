// dark
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
  dayNight.querySelector("i").classList.toggle("fa-sun");
  dayNight.querySelector("i").classList.toggle("fa-moon");
  document.body.classList.toggle("dark");
});
window.addEventListener("load", () => {
  if (document.body.classList.contains("dark")) {
    dayNight.querySelector("i").classList.add("fa-sun");
  } else {
    dayNight.querySelector("i").classList.add("fa-moon");
  }
});
// nav
const nav = document.querySelector(".nav"), //nav項目
  navList = document.querySelectorAll("li"), //nav的li
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSection = allSection.length;
//   console.log(navList);
for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", () => {
    allSection[i].classList.remove("z-10");
    for (let j=0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        // console.log("back-section" + navList[j].querySelector("a"));
        allSection[j].classList.add("z-10");
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    a.classList.add("active");
    showSection(a);
    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}
function showSection(elem) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("z-10");
  }
  // console.log(elem.getAttribute("href").split("#"));
  const target = elem.getAttribute("href").split("#")[1];
  // console.log(target);
  document.querySelector("#" + target).classList.add("z-10");
}

// nav展開

const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector("nav");
navTogglerBtn.addEventListener("click", () => {
  if (aside.classList.contains("open")) {
    aside.classList.remove("open");
  } else {
    aside.classList.add("open");
  }
});
