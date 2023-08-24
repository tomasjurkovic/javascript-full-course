'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const navEl = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// smooth scrolling:
// apply smooth scrolling:
btnScrollTo.addEventListener('click', function(e) {
  const s1cords = section1.getBoundingClientRect();
  console.log(s1cords);
  // prints {x: 0, y: 596, width: 907, height: 1652.6875, top: 596, …}
  // relative to current viewport
  console.log(e.target.getBoundingClientRect()); 
  // {x: 30, y: 460.265625, width: 110, height: 29, top: 460.265625, …}

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // f.e. 0 247, 55 264 or where we are, relative

  console.log('Height/width viewport: ', 
    document.documentElement.clientHeight,
    document.documentElement.clientWidth);
  // 579 907 relative again

  // scrolling (global function on window object):
  // by window.pageYOffset we determined absolute position
  // window.scrollTo(s1cords.left + window.pageXOffset, s1cords.top + window.pageYOffset);

  // smooth scrolling (old way):
  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth', 
  // })

  // smooth scrolling modern way:
  section1.scrollIntoView({behavior: 'smooth'});
});

// page navigation: before refactor:
// document.querySelectorAll('.nav__link')
//   .forEach(function(el) {
//     el.addEventListener('click', function(e) {
//       e.preventDefault();
//       const id = this.getAttribute('href');
//       document.querySelector(id)
//         .scrollIntoView({behavior: 'smooth'});
//     });
// });

// page navigation: event handler:
// 1. add event listener to common parent element,
// 2. determine which element originated the event...
document.querySelector('.nav__links')
  .addEventListener('click', function(e) {
    // Matching strategy:
    if (e.target.classList.contains('nav__link')) {
      e.preventDefault();
      const id = e.target.getAttribute('href');
      document.querySelector(id)
        .scrollIntoView({behavior: 'smooth'});
    }
});

// TABBED COMPONENT:
// old wrong way:
// tabs.forEach(t => t.addEventListener('click', () => console.log("TAB")));

// event handler:
tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab'); 
  // if we click on button, we get button, if on span, we gat button as well 
  
  // gueard clause - if click is elsewhere, do nothing and end execution
  if (!clicked) return;

  // deactivate tabs:
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabContents.forEach(tab => tab.classList.remove('operations__content--active'));

  // activate content area:
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// menu fade animation: event delegation:
// mouseover bubbles
// menu fade animation:
const handleHover = function (e) {
  const link = e.target;
  const siblings = link.closest('.nav')
    .querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');

  if(e.target.classList.contains('nav__logo')) {
    siblings.forEach(el => {
      el.style.opacity = this;
    });
    if (logo.style.opacity === 0.5) logo.style.opacity = this;
  };

  if(e.target.classList.contains('nav__link')) {
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

// navEl.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
//   // this wont work:
//   // navEl.addEventListener('mouseover', handleHover(e, 0.5) {
//   // it has to be like above, calling function (e) 
//   // and then our created funtcion
// });

// passing "argument" into event handler function
// only one real parameter = e
// we need to use this keyword and bind method
navEl.addEventListener('mouseover', handleHover.bind(0.5));

// opposites: 
// mouseenter - mouseleave
// mouseover - mouseout

navEl.addEventListener('mouseout', handleHover.bind(1));

// sticky navigation when scrolling:
const initialCoords = section1.getBoundingClientRect();

// really bad for performance:
// window.addEventListener('scroll', function () {
//   if(window.scrollY >= initialCoords.top) {
//     navEl.classList.add('sticky');
//   } else {
//     navEl.classList.remove('sticky');
//   }
// });
// const obsCallback = function (entries, observer) {
//   // whenever the first section - target is intercepted 10% of our threshold,
//   // then the function is called
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// }

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = navEl.getBoundingClientRect().height;
console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    navEl.classList.add('sticky');
  } else {
    navEl.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, 
  threshold: 0,
  rootMargin: `-${navHeight}px`, // 90px is height of nav, needs to be in px unf.
});

headerObserver.observe(header);

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// SELECT, CREATE, DELETE elements:
// select whole document
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// selecting html elements:
// const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('#section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // return html collection
// automatically refreshes if something is added/deleted

// by classname / similar to previous one:
const allBtns = document.getElementsByClassName('btn');
console.log(allBtns); //refresh automatically 

// creating and inserting elements:
// creating element itself:
const message = document.createElement('div'); // not yet in the DOM itself
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improveing functionality and analytics.';
message.innerHTML = 'We use cookies for improveing functionality and analytics. <button class ="btn btn--close-cookie"> Got it! </button>';

// inserting element:
// .insertAdjacentHTM 
// header.insertAdjacentElement('beforeend', message); // example of doing it

// header.prepend(message); // displayed as a first element
header.append(message); // it just moved it down if line above is applied
// now it is displayed as a last element of header
// header.append(message.cloneNode(true)); // displayed twice / we cloned it

// header.before(message);
// header.after(message);
// those two will make a message element a sibling to the header element

// removing cookie element when clicking on button:
document.querySelector('.btn--close-cookie')
  .addEventListener('click', function() {
    message.remove(); // not needed to select it again, when we have a variable
    // previously:
    // message.parentElement.removeChild(message);
});

// styles, attributes & classes:

// styles:
// adding style to (already selected) element:
// inline styles:
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // prints nothing)
console.log(message.style.width); // prints 120%)

// get computed style:
console.log(getComputedStyle(message)); // prints huge list of styles)
console.log(getComputedStyle(message).color); // prints rgb(187, 187, 187)

message.style.height = Number.
  parseFloat(getComputedStyle(message)  
  .height, 10) + 30 +'px';
// parse float has to be there, 
// because there is 50px and we cannot count string/number

// changing css from javascript:
document.documentElement.style.setProperty('--color-primary', 'yellowgreen');

// attributes:
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // Bankist logo
console.log(logo.src); // http://127.0.0.1:8080/starter-advanced-dom/img/logo.png
console.log(logo.className); // prints nav__logo

// non-standard element:
console.log(logo.designer); // undefined, non-standard element
console.log(logo.getAttribute('designer'));

// set attribute:
// standard:
logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt); // Beautiful minimalist logo

// non-standard:
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company')); // Bankist

// difference in src or link element:
console.log(logo.src); // http://127.0.0.1:8080/starter-advanced-dom/img/logo.png
console.log(logo.getAttribute('src')); // img/logo.png

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // http://127.0.0.1:8080/starter-advanced-dom/#
console.log(link.getAttribute('href')); // #

// Data attributes:
// cammelCase is important instead of dash
console.log(logo.dataset.versionNumber); // 3.0

// they are always set in dataset object

// Classes:
logo.classList.add('newClass');
console.log(logo.classList); // newClass added
console.log(logo.classList.contains('newClass')); // true
logo.classList.remove('newClass'); 
console.log(logo.classList); // no newClass class
logo.classList.toggle('newClass');
console.log(logo.classList); // newClass is back

// type of events:
// event is a signal generated from node
// events happen if we listen on them or not

// mouseenter - similar to css hover
const h1 = document.querySelector('h1');

// create a function that removes:
const alertH1 = function(e) {
  alert('addEventListener: Great, you are reading the heading');

  // removing event handler inseide the function:
  // h1.removeEventListener('mouseenter', alertH1)
  // with this it happens only once
}

// timeout removing of event hendler:
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
// delayes it for 3 seconds now

h1.addEventListener('mouseenter', alertH1);

// // older solution:
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Perfect, you are reading the heading');
// }; // pretty much does the same as above

// bubbling:
// if we attach event  listeners also to the one of the parent elements
// then it happens in bubbling phase as well in bubbling phase

// random color
const randomInt = (min,max) => 
  Math.floor(Math.random() * (max-min + 1) + min);
const randomColor = () => 
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor()); // prints f.e. rgb(139,166,166)

// document.querySelector('.nav__link')
//   .addEventListener('click', function(e) {
//     this.style.backgroundColor = randomColor();
//     console.log('LINK', e.target, e.currentTarget);
//     console.log(e.currentTarget === this); // true

//     // // stop propagation:
//     // e.stopPropagation();
// });

// document.querySelector('.nav__links')
//   .addEventListener('click', function(e) {
//     this.style.backgroundColor = randomColor();
//     console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav')
//   .addEventListener('click', function(e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
// }/*, true*/); // if there is true, than capturing phase is on

// event delegation:
// smooth scrolling in navigation bar:

// dom traversing:
const headline = document.querySelector('h1');

// going downwards: child
console.log(headline.querySelectorAll('.highlight'));
// this would work no matter how deep they are as a child elements
// they don't need to be the direct child elements
// it would go down deep as necessary

// direct children:
console.log(headline.childNodes);
// we get NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
console.log(headline.children);
// we get HTMLCollection(3) [span.highlight, br, span.highlight]
console.log(headline.firstElementChild);
console.log(headline.lastElementChild);
// <span class="highlight">minimalist</span>

// it is possible to set its property:
headline.firstElementChild.style.color = 'white';

// going upwards:
console.log(headline.parentNode); // direct parent
/* <div class="header__title">
<h1>
    When
    <!-- Green highlight effect -->
    <span class="highlight" style="color: white;">banking</span>
    meets<br>
    <span class="highlight">minimalist</span>
  </h1>
  <h4>A simpler banking experience for a simpler life.</h4>
  <button class="btn--text btn--scroll-to">Learn more ↓</button>
  <img src="img/hero.png" class="header__img" alt="Minimalist bank items">
</div> */

console.log(headline.parentElement); // now it is same

// closest:
// finding closest parent element in the dom tree
// headline.closest('.header').style.background = 'var(--gradient-secondary)'; 
// it is possible to use CSS variable (custom property) from CSS file, 
// like we have this gradient

// it is possible to change itself with this:
// headline.closest('h1').style.background = 'var(--gradient-primary)';
// same as:
// headline.style.background = 'var(--gradient-primary)';

// going sideways:
console.log(headline.previousElementSibling); // actually null, because there is no previous sibling
console.log(headline.nextElementSibling); // h4 element

// for nodes:
console.log(headline.previousSibling);
console.log(headline.nextSibling);

// all siblings:
console.log(headline.parentElement.children); // weird but working
// including itself as well 
// 4 elements

// [...headline.parentElement.children].forEach(function(el) {
//   if (el !== h1) { 
//     el.style.transform = 'scale(0.5)';
//     // all sibling elements excluding the selected one are 50% smaller now
//   }
// })