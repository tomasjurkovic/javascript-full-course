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