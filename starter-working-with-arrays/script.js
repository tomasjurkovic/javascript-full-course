'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, 34, -1000, 77, 14000, 7, -10],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements) {
  containerMovements.innerHTML = '';
  // deletes existing content...
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date"></div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


// simple methods:
let arr = ['a', 'b', 'c', 'd', 'e'];

// slice method:
// does not affect arr
console.log(arr.slice(2)); // prints ['c', 'd', 'e']
console.log(arr.slice(1, 3)); // ['b', 'c'] is printed
console.log(arr);

// negative indexes works as well
console.log(arr.slice(-1)); // prints ['e']

// we can create shallow copy of object as well:
console.log(arr.slice()); // with no arguments: ['a', 'b', 'c', 'd', 'e']
// or like this with spread operator:
console.log([...arr]); // prints ['a', 'b', 'c', 'd', 'e']

// splice method:
// does almost exactly the same as slice, but mutates the array:
console.log(arr.splice(-1)); // prints ['a', 'b', 'c', 'd']
console.log(arr); // prints ['a', 'b', 'c', 'd'], because splice(2) mutated it

// second parameter is deleteCount:
console.log(arr.splice(1, 2)); // prints deleted ['b', 'c']
console.log(arr); // prints ['a', 'd'], that's what left

// reverse method:
// it reverses array items
// it mutates original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2); // prints ['f', 'g', 'h', 'i', 'j']

// concat method:
// it does not mutate original array
const letters = arr.concat(arr2);
console.log(letters); // prints ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'] 
console.log([...arr, ...arr2]); // does the same, but using spread operator

// join method:
// it does not mutate original array
console.log(letters.join(' + '));
// prints: a + b + c + d + e + f + g + h + i + j

// new at method:
// is available since 2022:
// does no mutate previous array
const simpleArray = [21, 12, 24, 66];
console.log(simpleArray[0]); // prints 21
console.log(simpleArray.at(0)); // does exactlty the same

// what if we want to get the last element:
// it is really easy
console.log(simpleArray[simpleArray.length - 1]); // prints 66
console.log(simpleArray.slice(-1)[0]); // prints 66
console.log(simpleArray.at(-1)); // does the same - 66

console.log(simpleArray.at(-2)); 
// prints 24 as it is second last element in simpleArray

console.log(simpleArray.at(1, 3)); // not doing what we think
// only 12 is printed as second item in array

// works with string as well:
console.log('tomas'.at(3)); // prints 'a'
console.log('tomas'.at(-1)); // prints 's' as a last character in string

// LOOPING ARRATS
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// classical way
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}$`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}$`);
  };
};

// easy with for each:
console.log(`-----FOR EACH------`);
// with callback funtcion with movement as argument:
// order of arguments matter
// 1. element
// 2. index of array
// 3 . whole arrat
movements.forEach(function(movement, i, arr) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}$`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}$`);
  };
});

// it is called one by one:
/* You deposited 200$
You deposited 450$
You withdrew 400$
You deposited 3000$
You withdrew 650$
You withdrew 130$
You deposited 70$
You deposited 1300$ */

/* prints after the change:
Movement 1: You deposited 200$
You deposited 450$
You withdrew 400$
You deposited 3000$
You withdrew 650$
You withdrew 130$
You deposited 70$
You deposited 1300$ */

// maps with forEach:
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// arguments: 1. value, 2. key, 3. entire map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

/* prints:
USD: United States dollar
EUR: Euro
GBP: Pound sterling */

// sets:

const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'EUR', 'YEN', 'USD']);
console.log(currenciesUnique); // prints: {'USD', 'EUR', 'GBP', 'YEN'}
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

// works for sets as well, 
// the second parameter is useless, but actually it follows same pattern
// since sets do not have keys, then it is the same as values
// _ is used for completely unnecessary arguments

// map, filter and reduce methods:
// first two creates new array // all does not affect original arrays
// map returns an array containing the results of applying an operation on all original array elements
// filter returns an array containing the array elements that apssed a specified test condition
// reduce boils (reduces) all array eleemtns fown to one single value (fe. adding all elements together)
// reduce only returns one value and affects the original array