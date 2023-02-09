'use strict';

const openModalBtns = document.querySelectorAll('.show-modal');
const closeModalBtn = document.querySelector('.close-modal');
const overlayEl = document.querySelector('#overlay');
const modalEl = document.querySelector('#modal');

const openModal = function () {
  modalEl.classList.remove('hidden'); // not use dot notation here
  overlayEl.classList.remove('hidden');
};

const closeModal = function () {
  modalEl.classList.add('hidden'); // not use dot notation here
  overlayEl.classList.add('hidden');
};

for (let i = 0; i < openModalBtns.length; i++) {
  openModalBtns[i].addEventListener('click', openModal);
}

closeModalBtn.addEventListener('click', closeModal);
