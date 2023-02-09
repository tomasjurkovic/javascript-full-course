'use strict';

const openModalBtns = document.querySelectorAll('.show-modal');
const closeModalBtn = document.querySelector('.close-modal');
const overlayEl = document.querySelector('#overlay');
const modalEl = document.querySelector('#modal');

for (let i = 0; i < openModalBtns.length; i++) {
  openModalBtns[i].addEventListener('click', function () {
    console.log('button click');
    modalEl.classList.remove('hidden'); // not use dot notation here
    overlayEl.classList.remove('hidden');
  });
}

closeModalBtn.addEventListener('click', () => {
  modalEl.classList.add('hidden'); // not use dot notation here
  overlayEl.classList.add('hidden');
});
