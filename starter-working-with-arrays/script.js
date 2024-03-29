'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, 34, -1000, 77, 140, 7, -10, -205, 254],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 5,
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

const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';
  // deletes existing content...
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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

// displayMovements(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`; 
  // absolute value, so no - sign

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(dep => (dep * acc.interestRate) / dep)
    // .filter((int, i, arr) => {
    //   console.log(arr);
    //   return int >= 1;
    // })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// calcDisplaySummary(account1.movements);

// calc balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => 
    acc + mov, 0
  )
  labelBalance.textContent = `${acc.balance}€`;
}

// calcDisplayBalance(account1.movements);

const updateUI = function (acc) {
   // display movements
   displayMovements(currentAccount.movements);
   // display balance
   calcDisplayBalance(currentAccount);
   // display summary
   calcDisplaySummaryOnlyWithReduce(currentAccount);
}

// Event handlers:
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // form buttons reload the form, so we need to stop it
  // hitting enter is same as click event, so it works as well
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`;
    // change opacity so it's visible
    containerApp.style.opacity = 100;
    // clear input fields:
    inputLoginUsername.value = inputLoginPin.value = '';
    // inputLoginPin.blur(); // actually not needed, it happens automatically
    updateUI(currentAccount);
  }
});

// transfer money feature:
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // once again prevent default behavior
  const amount = Number(inputTransferAmount.value);
  const recieverAcount = accounts
    .find(acc => acc.username === inputTransferTo.value);
  inputTransferTo.value = inputTransferAmount.value = '';
  if (amount > 0 && 
    currentAccount.balance >= amount && 
    recieverAcount?.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    recieverAcount.movements.push(amount);
    updateUI(currentAccount);
  }
})

btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  // checking if username and pin match current user
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
    ) {
    // find current user's index in accounts array
    const accountToDelete = accounts.findIndex(acc => acc === currentAccount);

    // use splice to delete one user the account array
    // only selected one is deleted based on its index:
    accounts.splice(accountToDelete, 1);

    // logging out:
    loggingOut(currentAccount);
  }
  // clear input fields:
  inputClosePin.value = inputCloseUsername.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const requestedAmmount = Number(inputLoanAmount.value);
  if (
    typeof requestedAmmount === "number" &&
    requestedAmmount > 0 &&
    // bank's condition is that only accepts those requests for loan
    // that are higher than 1/10 of requested ammount
    currentAccount.movements.some(mov => mov >= (requestedAmmount * 0.1)
    )) {
      currentAccount.movements.push(requestedAmmount);
      updateUI(currentAccount);
    }
  // clearing input loan form field:  
  inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted; // give it opposite state after clicking on sorting button
});

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

// map:
const eurToUsd = 1.1;

const movementsUsd = movements.map(function (mov) {
  return mov * eurToUsd;
});

// this above in arrow function:
const movementsUsdArrow = movements.map(mov => mov * eurToUsd)
console.log(movementsUsdArrow);

console.log(movements);
console.log(movementsUsd);
// prints [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

// what if we wanna to do it by for loop:
const movementsUsdForOf = [];
for (const mov of movements) {
  movementsUsdForOf.push(mov * eurToUsd);
} 

console.log(movementsUsdForOf);
// prints[220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

// map method has access to index and whole array
// it is okay to have two or more return statements
const movementsDescription = movements.map((mov, i) =>
  `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${mov}$`
);

console.log(movementsDescription);
// prints ['Movement 1: You deposited 200$', 'Movement 2: You deposited 450$', 
// 'Movement 3: You withdrew -400$', 'Movement 4: You deposited 3000$', 
// 'Movement 5: You withdrew -650$', 'Movement 6: You withdrew -130$', 
// 'Movement 7: You deposited 70$', 'Movement 8: You deposited 1300$']

// computing usrr names:
// I tried a bit :)
const user = 'Steven Thomas Williams'; // str
const username = user.split(' ');
let realusername = ''
username.forEach(word => {
  realusername += word.slice(0, 1).toLowerCase();
});

console.log(realusername);

// but really:
// split returns an array so we can use map there
const username2 = user.toLowerCase()
  .split(' ')
  .map(name => name.slice(0, 1))
  .join('');

console.log(username2); // stw is returned

// lets do it in function:
const getUserName = function (user) {
  const username = user.toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  return username;
};

console.log(getUserName(account1.owner)); // js returns 
console.log(getUserName(account2.owner)); // jd returns
console.log(getUserName('Tom Marvolo Riddle')); // tmr

// do it in better way by modifying array what we have as an input
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  })
};

createUserNames(accounts);
console.log(accounts);

// filter method:
// it has access to arr, i, and actual element
// filter only deposites >0
const deposites = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements); // prints [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(deposites); // prints [200, 450, 3000, 70, 1300]

const depositeForOf = [];
for (const mov of movements) {
  if (mov > 0) {
    depositeForOf.push(mov);
  }
};
console.log(depositeForOf); // does the same, but it is better to use filter 
// when it comes to really complicated code

// create withdrawals:
const withdrawals2 = movements.filter(mov => mov < 0); 
// no need to with return if one line only
console.log(withdrawals2); // prints [-400, -650, -130]

// reduce method:
// acc is acculumator which a like a snowball
// returns only one number
const balance = movements.reduce((acc, cur, i, arr) => {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0); // zero is important that we start from zero,
// it could be any other number, which we can start snowball effect

// prints:
/* Iteration 0: 0
Iteration 1: 200
Iteration 2: 650
Iteration 3: 250
Iteration 4: 3250
Iteration 5: 2600
Iteration 6: 2470
Iteration 7: 2540 */

console.log(balance); // prints 3840

// how does it looks like in for of loop:
let balance2 = 0;
let index = 0;
for (const mov of movements) {
  console.log(`Iteration ${index}: ${balance2}`);
  balance2 += mov;
  index++;
}

// maximum value from movements:
const maxValue = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
  }, movements[0]
);

console.log(maxValue);

// chaining methods together:
// how much was deposited in USD:
const euroToUsd = 1.09;

// PIPELINE:
const depositedUsdTotal = movements
  .filter(mov => mov > 0) // filter only positive values
  .map((mov, i, arr) => {
      console.log(arr);
      return mov * euroToUsd; // if more lines, return is needed
    }) // changed them to USD
  .reduce((acc, mov) => 
  acc + mov, 0); // reduce them to single value

console.log(depositedUsdTotal);

/* simple solution:
const depositedUsdTotal = movements
  .filter(mov => mov > 0) // filter only positive values
  .map(mov => mov * euroToUsd) // changed them to USD
  .reduce((acc, mov) => 
  acc + mov, 0); */

// my simple solution
// calculate income:
// const income = movements
//     .filter(mov => mov > 0)
//     .reduce((acc, mov) => acc + mov, 0);

// labelSumIn.textContent = `${income}€`

// // calculate outcome
// const outcome = movements
//     .filter(mov => mov < 0)
//     .reduce((acc, mov) => acc + mov, 0);

// labelSumOut.textContent = `${outcome}€`

// find method:
// returns only first element which satisfies the condition in method
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal); // returns only -400
// find works similar method than filter
// 2 differences:
// 1. find returns not an array but a single value
// 2. find returns only the first element

console.log(accounts);
const accountJessica = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(accountJessica);
// return whole account object which owner's name is Jessica Davis
// {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}

// it has to be perfect match
// const accountJonas = accounts.find(acc => acc.owner === 'Jonas');
// this would return undefined, because of not perfect match

const accountJonas = accounts.find(acc => acc.owner === 'Jonas Schmedtmann');
console.log(accountJonas);

// challenge to do it with for of loop:
const forJessicaAccount = function (accounts) {
  for (const account of accounts) {
    if (account.owner === 'Jessica Davis') {
      console.log(account);
    }
  }
}

forJessicaAccount(accounts);
// returns {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}

// do it with filter
const filterJessicaAccount = accounts
  .filter(acc => acc.owner === 'Jessica Davis');

console.log(...filterJessicaAccount);
// returns {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}

// login out implementation:
const loggingOut = function (account) {
  // user should be logged off (now only visually):
  containerApp.style.opacity = 0;
  labelWelcome.textContent = `User ${currentAccount.owner} was deleted!`;
    
  // logging off for user with deleted account
  currentAccount = '';
}

// some and every methods:
console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]
// checks only quality
console.log(movements.includes(-130)); // true

// checks condition:
console.log(movements.some(mov => mov === -130)); // true, same as above

// can be verified if some condition is present in an array
const anyDeposites = movements.some(mov => mov > 500);
console.log(anyDeposites); // prints true
// because at least one item in aray are greater than 500

const allDeposites = movements.every(mov => mov > 0);
console.log(allDeposites); // prints false, 
// because not all items in aray are greater than 0

// Separate callback:
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
// constant can be used as a callback function for many methods like some, every or filter

// FLAT & FLAT MAP:
const arrStructured = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arrStructured.flat()); 
// prints in flat format: [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[1, [2, 3]], [[4, 5], 6], 7, 8]
console.log(arrDeep.flat()); // it flats just first dimension
// it prints [1, Array(2), Array(2), 6, 7, 8]
console.log(arrDeep.flat(2)); // with argument is going more deeper 2 sections
// it prints [1, 2, 3, 4, 5, 6, 7, 8]
console.log(arrStructured.flatMap(num => num * 10));

console.log(accounts.flat());

// old solution:

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const sumOfMovements = allMovements.reduce((acc, current) => 
//   acc + current, 0
// );

// console.log(sumOfMovements);

// we can use chaining:
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overalBalance); // prints 17137

// using flatMap
const overalBalanceFM = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overalBalanceFM);
// easily with flatMap function in 2 steps

// sort functions:
// sort function mutates the sorted array
const owners = ['Jonas', 'Zach', 'Adam', 'Marta']
console.log(owners.sort());
console.log(owners);
// both prints ['Adam', 'Jonas', 'Marta', 'Zach']

console.log(movements);
console.log(movements.sort());
// first prints:  [200, 450, -400, 3000, -650, -130, 70, 1300]
// second prints: [-130, -400, -650, 1300, 200, 3000, 450, 70]
// sort function works good for string by default, but not for numbers

// if we return < 0 A, B
// if we return > 0, B, A
// ascending orded:
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });

// better solution:
movements.sort((a, b) => a - b);

console.log(movements);
// prints correct order for numbers now:
// [-650, -400, -130, 70, 200, 450, 1300, 3000]

// descending order:
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return -1;
// });

movements.sort((a, b) => b - a);
console.log(movements);
// prints [3000, 1300, 450, 200, 70, -130, -400, -650]

// more ways of creating and filling arrays:
console.log(1, 2, 3, 4, 5, 6, 7);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
const x = new Array(7);
console.log(x); // creates 7 empty elements [empty × 7] with nothing
console.log(x[1]); // undefined
console.log(x.map(() => 5)); // does not do anything here
// still returns [empty × 7]

// Fill method:
// mutates underline array
x.fill(1);
console.log(x); // prints [1, 1, 1, 1, 1, 1, 1]

x.fill(2, 3, 5); // first param is what to insert
// second is where to start 
// third is where to end
console.log(x); // prints [1, 1, 1, 2, 2, 1, 1]
// it fills third and fourth index only

// FROM Method:
const y = Array.from({length: 7}, () => 1);
console.log(y); // prints [1, 1, 1, 1, 1, 1, 1]
// works same as x.fill(1);

const z = Array.from({length: 7}, (_, i) => i + 1);
// current value = _ and we have to define it, so we can use secodn param
// which is index, so code works
console.log(z); // [1, 2, 3, 4, 5, 6, 7]

// exercise: try to do array of 100 random roll dice rolls
const oneHundredDiceRolls = Array.from({length: 100}, () => (
  Math.trunc(Math.random() * 6) + 1
));
console.log(oneHundredDiceRolls);

// we can create arrays from other things:
// from querySelectorAll:
// get all movements form UI:

// let put it in some event handler:
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), 
    el => Number(el.textContent.replace('€', '')) // now it's as a second argument
  );
  console.log(movementsUI);
})

// more coding exercises:
// 1. how much it was deposited in the bank:
const bankDepositSum = accounts.flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
console.log(bankDepositSum);
// step 1 creates one array of all movements while flatmap
// step 2 filters only deposites
// step 3 count all deposited value to the bank
// prints 25692

// 2. how many deposite there were in the bank with at least 100$?
const numDepositesOver100$ = accounts.flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDepositesOver100$);

// another way:
const numDepositesOver100$2 = accounts.flatMap(acc => acc.movements)
  // .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
  // count++ must be here replaced with ++count to work properly in this case
  // otherwise it will still have 0 value...

console.log(numDepositesOver100$2);

// 3. create object that calculates all deposites and all withdrawals with reduce method:
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce((sums, cur) => {
    // cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
    sums[cur > 0 ? 'deposits' : 'withdrawals']
    return sums; // return is not impliced here
  }, {deposits: 0, withdrawals: 0}); // it is important to start here with an object

console.log(deposits, withdrawals); // 25692 -8555

// 4. use previous exercises and use only reduce method there:
const calcDisplaySummaryOnlyWithReduce = function (acc) {
  const incomes = acc.movements
    .reduce((acc, mov) => acc + (mov > 0 ? mov : 0), 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .reduce((acc, mov) => acc + (mov < 0 ? mov : 0), 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`; 
  // absolute value, so no - sign

  const interest = acc.movements
    .map(dep => (dep * acc.interestRate) / dep)
    .reduce((acc, mov) => acc + (mov > 0 ? mov : 0), 0);
  labelSumInterest.textContent = `${interest}€`;
};

// 5. simple function covnvert to title caee:
const convertTitleCase = function(title) {
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'of', 'in', 'with', 'without', 'off', 'out'];
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const titleCase = title.toLowerCase()
    .split(' ')
    .map(word => !exceptions.includes(word) ? capitalize(word) : word)
    // .reduce((sentence, word) => sentence + ' ' + word, '');
    .join(' '); // or use this above
  return capitalize(titleCase);
}

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title, but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
console.log(convertTitleCase('bitch OFF I did it, the world is great'));
