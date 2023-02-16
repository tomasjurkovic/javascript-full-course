'use strict';

const currentScoreP1 = document.querySelector('#current--0');
const currentScoreP2 = document.querySelector('#current--1');
const totalScoreP1 = document.querySelector('#score--0');
const totalScoreP2 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
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

const startNewGame = function () {
    console.log('new game should start');
    currentScoreP1.textContent = defaultCurrentScoreP1;
    currentScoreP2.textContent = defaultCurrentScoreP2;
    totalScoreP1.textContent = defaultTotalScoreP1;
    totalScoreP2.textContent = defaultTotalScoreP2;
    // TODO: active section 
}

newGameBtn.addEventListener('click', startNewGame);
