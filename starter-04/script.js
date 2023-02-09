'use strict';

// second argument is anonymous function that write inserted value to console
// it should be also like this ', function() {same code;}'

const numberEl = document.querySelector('.number');
const bodyEl = document.querySelector('body');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.highscore');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = highScoreEl.textContent;

checkBtn.addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);

  // when there is no input
  if (!guess) {
    message = 'No number!';

    // when user wins
  } else if (guess === secretNumber) {
    numberEl.textContent = secretNumber;
    displayMessage('Correct number!');
    bodyEl.style.backgroundColor = '#60b347';
    numberEl.style.width = '30rem';

    // set highscore
    if (highscore < score) {
      highscore = score;
      highScoreEl.textContent = highscore;
    }

    // when user inserts wrong guess:
  } else if (guess != secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      score--;
      scoreEl.textContent = score;

      // when user loses
    } else {
      displayMessage('You lose the game');
      scoreEl.textContent = 0;
      numberEl.textContent = secretNumber;
    }
  }
});

againBtn.addEventListener('click', () => {
  bodyEl.style.backgroundColor = '#222';
  score = 20;
  scoreEl.textContent = score;
  document.querySelector('.guess').value = '';
  numberEl.style.width = '15rem';
  numberEl.textContent = '?';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
});

// Coding Challenge #1
/*
Implement a game rest functionality, so that the player can make a new guess!
Your tasks:
1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the 'score' and
'secretNumber' variables
3. Restore the initial conditions of the message, number, score and guess input
fields
4. Also restore the original background color (#222) and number width (15rem)
GOOD LUCK � */
