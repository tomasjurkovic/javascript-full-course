'use strict';

/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct number!';

console.log(document.querySelector('.message').textContent);

document.querySelector('.score').textContent = 10;
document.querySelector('.number').textContent = 13;

document.querySelector('.guess').value = 40;
console.log(document.querySelector('.guess').value);
*/

// second argument is anonymous function that write inserted value to console
// it should be also like this ', function() {same code;}'
document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = 'No number!';
  }
});
