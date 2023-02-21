'use strict';

const currentScoreP1El = document.querySelector('#current--0');
const currentScoreP2El = document.querySelector('#current--1');
const totalScoreP1El = document.querySelector('#score--0');
const totalScoreP2El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const winningScore = 100;
let activePlayer, currentScore, playing, scores;

const init = function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');

  diceEl.classList.add('hidden');
  currentScoreP1El.textContent = 0;
  currentScoreP2El.textContent = 0;
  totalScoreP1El.textContent = 0;
  totalScoreP2El.textContent = 0;
};

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // currentScoreP1El.textContent = defaultCurrentScoreP1;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
}

rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    // generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check if rolled one (if yes switch to new player)

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', () => {
  if (playing) {
    // add current score to the total score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;

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
    // if yes then actual player wins
    // if no switch to new player
  }
});

newGameBtn.addEventListener('click', init);
