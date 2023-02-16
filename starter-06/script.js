'use strict';

const currentScoreP1El = document.querySelector('#current--0');
const currentScoreP2El = document.querySelector('#current--1');
const totalScoreP1El = document.querySelector('#score--0');
const totalScoreP2El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

let defaultTotalScoreP1 = 0;
let defaultTotalScoreP2 = 0;
let defaultCurrentScoreP1 = 0;
let defaultCurrentScoreP2 = 0;
let winningScore = 100;

totalScoreP1El.textContent = 0;
totalScoreP2El.textContent = 0;
diceEl.classList.add('hidden');

const startNewGame = function () {
  console.log('new game should start');
  currentScoreP1El.textContent = defaultCurrentScoreP1;
  currentScoreP2El.textContent = defaultCurrentScoreP2;
  totalScoreP1El.textContent = defaultTotalScoreP1;
  totalScoreP2El.textContent = defaultTotalScoreP2;
  // TODO: active section
};

newGameBtn.addEventListener('click', startNewGame);
