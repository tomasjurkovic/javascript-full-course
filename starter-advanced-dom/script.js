'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// SELECT, CREATE, DELETE elements:
// select whole document
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// selecting html elements:
const header = document.querySelector('.header');
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

// smooth scrolling:
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

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