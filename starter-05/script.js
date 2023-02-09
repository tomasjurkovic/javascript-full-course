'use strict';

const openModalBtns = document.querySelectorAll('.show-modal');
const closeModalBtn = document.querySelector('.close-modal');
const overlayEl = document.querySelector('#overlay');
const modalEl = document.querySelector('#modal');

// openModalBtns.addEventListener('click', () => {
//   console.log('click');
//   //   console.log(e);
//   //   modalEl.setAttribute('class', '.show-modal');
//   //   modalEl.setAttribute('class', '.overlay');
//   //   modalEl.setAttribute('class', '.modal');
// });

for (let i = 0; i < openModalBtns.length; i++) {
  console.log(openModalBtns[i]);
}
