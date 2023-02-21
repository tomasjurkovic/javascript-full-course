'use strict';

const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const currentScoreP1El = document.getElementById('current--0');
const currentScoreP2El = document.getElementById('current--1');
const totalScoreP1El = document.getElementById('score--0');
const totalScoreP2El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
const winningScore = 100;

let currentScore, scores, playing, activePlayer;

const init = function () {
  currentScoreP1El.textContent = 0;
  currentScoreP2El.textContent = 0;
  totalScoreP1El.textContent = 0;
  totalScoreP2El.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [0, 0];
  playing = true;
  activePlayer = 0;
  currentScore = 0;
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

init();

rollBtn.addEventListener('click', () => {
  if (playing) {
    const rolled = Math.round(Math.random() * 5) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${rolled}.png`;

    if (rolled !== 1) {
      currentScore += rolled;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if it is worth more than or equals to 100
    if (scores[activePlayer] >= winningScore) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', init);
