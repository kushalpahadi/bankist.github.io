"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(function (button, i) {
  button.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//*****************************************************007 impleneting smooth scrolling */
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords); //cordinates of the section //relative to page

  console.log(e.target.getBoundingClientRect()); //coordinates of button  //relative to page

  console.log("current scroll", window.pageXOffset, window.pageYOffset); //cordinates of scroll of full page

  console.log(
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); //to get height and width 0f viewport

  //scrolling
  //method 1
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //method 1 smooth
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  //method 2
  section1.scrollIntoView({ behavior: "smooth" }); //only works in modern browser
});

// console.log("current scroll", window.pageXOffset, window.pageYOffset); //cordinates of scroll of full page

/////////////////////////////////////////////////////////
//******************************************************page navigation (scroll when link is clicked)********************************

// document.querySelectorAll(".nav__link").forEach(function (element, i) {
//   element.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log(this.getAttribute("href")); // to get href of the elemt
//     const id = this.getAttribute("href");

//     if (id !== "#")
//       document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

document.querySelector(".nav__links").addEventListener("click", function (e) {
  // console.log(e.target); // to get the element of nav conatiner on which click happened
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");

    if (id !== "#")
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//******************************************************BUILDING A TABBED COMPONENT********************************
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContents = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;
  tabs.forEach(function (tab) {
    tab.classList.remove("operations__tab--active");
  });
  clicked.classList.add("operations__tab--active");

  tabsContents.forEach(function (content) {
    content.classList.remove("operations__content--active");
  });

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//******************************************************PASSING ARGUMENTS TO EVENT HANDLERS********************************
// menu fade animations
const nav = document.querySelector(".nav");

//function

const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(function (el) {
      if (el !== link) {
        el.style.opacity = opacity;
        logo.style.opacity = opacity;
      }
    });
  }
};

nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

//******************************************************sticky navbar********************************
// const initialCordinatesec1 = section1.getBoundingClientRect();

// window.addEventListener("scroll", function () {
//   if (window.scrollY > initialCordinatesec1.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

//method*************************2
// const header00height = document
//   .querySelector(".header")
//   .getBoundingClientRect().height;
// console.log(header00height);

// window.addEventListener("scroll", function () {
//   const nav = document.querySelector(".nav");
//   nav.classList.toggle("sticky", window.scrollY > header00height);
// });

// ***********method 3

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries; //entry =  entries[0]
  // console.log(entry.isIntersecting);
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//*************************8reveal elements on scroll*******************************

//hiding the section

const allsections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  // console.log(entry.target.classList);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.12,
});

allsections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//*************************lazy images*******************************
const imgTarget = document.querySelectorAll("img[data-src");
const revealImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgobserver = new IntersectionObserver(revealImg, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});

imgTarget.forEach(function (images) {
  imgobserver.observe(images);
});

//*************************slider part 1*******************************

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
let currentSlide = 0;
const noSlides = slides.length - 1;

// slider.style.overflow = "visible";
slides.forEach(function (slide, i) {
  slide.style.transform = `translateX(${100 * i}%)`;
});

//active dot

const activedot = function (slide) {
  document.querySelectorAll(".dots__dot").forEach(function (dot) {
    dot.classList.remove("dots__dot--active");
  });

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

//next slide function

const nextSlide = function () {
  if (currentSlide === noSlides) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  slides.forEach(function (slide, i) {
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    // console.log(slide, i, `translateX(${100 * (i - currentSlide)}%)`);
  });

  activedot(currentSlide);
};

//prev slide funcitoni
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = noSlides;
  } else {
    currentSlide--;
  }

  slides.forEach(function (slide, i) {
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    // console.log(slide, i, `translateX(${100 * (i - currentSlide)}%)`);
  });
  activedot(currentSlide);
};

//next slide
btnRight.addEventListener("click", nextSlide);

//previous slide
btnLeft.addEventListener("click", prevSlide);

//keydown event

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
  }

  if (e.key === "ArrowRight") {
    nextSlide();
  }
});

//*************slider dots */
/////////////
const gotoslide = function (slideno) {
  slides.forEach(function (slide, i) {
    slide.style.transform = `translateX(${100 * (i - slideno)}%)`;
    // console.log(slide, i, `translateX(${100 * (i - currentSlide)}%)`);
  });
};

const dotcontainer = document.querySelector(".dots");

// dots__dot--active

const createdot = function () {
  slides.forEach(function (slides, i) {
    dotcontainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createdot();

dotcontainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slideno = e.target.dataset.slide;

    gotoslide(slideno);
    activedot(slideno);
  }
});

activedot(0);

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
//
//
//
///****************************************** 005 selecting,creating,deleting element***************

// console.log(document.documentElement); //to select all document element
// console.log(document.head); //selects head
// console.log(document.body); //selects body

// //to select single element
// const header = document.querySelector(".header");

// //get node list  of all em
// const allsections = document.querySelectorAll(".section");
// console.log(allsections);

// //emby id
// console.log(document.getElementById("section--1"));

// //em by tag name
// const allButtons = document.getElementsByTagName("button");
// console.log(allButtons); //outputs HTMLcollection //it change live as any em in the dom is changes unlike nodelist

// //em by class name
// console.log(document.getElementsByClassName("btn")); //gives html collection

// //creating and inserting elements
// //1.  .insertAdjacentHtml

// const message = document.createElement("div");
// message.classList.add("cookie-message");
// // message.textContent = "we use cookies for improved functionality ";
// message.innerHTML = `we use cookies for improved fdata <button class='btn btn--close-cookie'>got it</button>`;

// // header.prepend(message); //add to first of em
// header.append(message); //adds to last
// // header.append(message.cloneNode(true)); //adds to last

// // header.after(message.cloneNode(true)); //clone node to add at two place
// // header.before(message);

// //delete

// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     // message.parentElement.removeChild(message);
//     message.remove();
//   });

// //styles
// message.style.backgroundColor = "#37383d";
// message.style.width = "100%";

// console.log(message.style.backgroundColor); //rgb(55, 56, 61)
// console.log(message.style.height); //nothing shows

// console.log(getComputedStyle(message)); //all styles displayed in the site
// console.log(getComputedStyle(message).height); //49px
// console.log(getComputedStyle(message).color); //rgb(187, 187, 187)

// // to manipulate the style

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";
// //message.style.height = '79px

// document.documentElement.style.setProperty("--color-primary", "orangered");
// //change colors

// //attributes

// const logo = document.querySelector(".nav__logo");

// logo.alt = "ksuahlskdjaslkjd";
// console.log(logo.alt); //ksuahlskdjaslkjd
// console.log(logo.src); //http://127.0.0.1:5501/img/logo.png
// console.log(logo.getAttribute("src")); ///img/logo.png
// console.log(logo.className); //nav__logo

// //non-standard
// console.log(logo.designer); //undefined
// console.log(logo.getAttribute("designer")); //kushal
// logo.setAttribute("kushal", "hero");
// console.log(logo);

// const link = document.querySelector(".nav__link--btn");
// console.log(link);
// console.log(link.href);
// console.log(link.getAttribute("href"));

// //data attributes
// console.log(logo.dataset.versionNumber); //3.0

// //classlist
// logo.classList.add("c", "j");
// logo.classList.remove("c", "j");
// logo.classList.toggle("c", "j");
// logo.classList.contains("c", "j");

// //dont use -----> logo.classname = 'jonas'

//*****************************8events****************

// const h1 = document.querySelector("h1");

// const h1alert = function (e) {
//   alert("you are reading th eheading");

//   // h1.removeEventListener("mouseenter", h1alert); //to make function work only once
// };

// h1.addEventListener("mouseenter", h1alert);

// setTimeout(function () {
//   h1.removeEventListener("mouseenter", h1alert);
// }, 3000);

// //other method
// // h1.onmouseenter = function (e) {
// //   alert("2");
// // };

// //third way
// // in <h1 onClick='alert('hello'></>

// const randomInt = function (min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const randomcolor = function () {
//   return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// };

// console.log(randomcolor());

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomcolor();
//   console.log("link", e.target, e.currentTarget);
//   console.log(this === e.currentTarget);
//   // e.stopPropagation(); //the bg of parent elements doesnt change (not good to use)
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomcolor();
//   console.log("conatiner", e.target, e.currentTarget);
// });

// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomcolor();
//   console.log("nav", e.target, e.currentTarget);
// });

//******************************************************DOM traversing(selcting em relative to other em*************************************************************** */

// const h1 = document.querySelector("h1");

// //going downward (get child em)

// console.log(h1.querySelectorAll(".highlight")); //NodeList(2) [span.highlight, span.highlight]
// console.log(h1.childNodes); //NodeList(5) [text, span.highlight, text, span.highlight, text]
// console.log(h1.children); //HTMLCollection(2) [span.highlight, span.highlight]

// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "red";

// //going upwards
// console.log(h1.parentNode); //div.header__left
// console.log(h1.parentElement); //div.header__left

// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest("h1").style.background = "var(--gradient-primary)";

// //going sidways(siblings)
// console.log(h1.previousElementSibling); //null
// console.log(h1.nextElementSibling); //h4

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// //to get all siblings
// console.log(h1.parentElement.parentElement.children);

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = "scale(3.5)";
//   }
// });

///***********************************  INTERSECTION OBSERVER********************************************************************* */

// const obsCallback = function (entries, observer) {
//   entries.forEach(function (entries) {
//     console.log(entries);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);
