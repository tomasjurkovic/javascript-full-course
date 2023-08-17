'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-08-14T17:01:17.194Z',
    '2023-08-15T03:36:17.929Z',
    '2023-08-16T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
const formatMovementDate = function(date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(date, new Date);
  console.log(daysPassed);
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed === 0) return `Today`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // else is not needed, cuz it is automatically executed if all condisions are false
  // let movDay = `${date.getDate()}`.padStart(2, 0);
  // let movMonth = `${date.getMonth() + 1}`.padStart(2, 0);
  // let moveYear = `${date.getFullYear()}`.padStart(2, 0);
  // return `${movDay}/${movMonth}/${moveYear}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const movDate = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(movDate, currentAccount.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// FAKE ALWAYS LOGGED IN:
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// formating dates:
// experimenting with API:

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // create current date:
    const now = new Date();
    const options =  {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // short, numeric, narrow
      year: '2-digit' // '2-digit
      // weekday: 'long' // short, narrow
    }; 
    // const locale = navigator.language; 
    // very handy get it from browser directly

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const minutes = `${now.getMinutes()}`.padStart(2, 0);
    // mine:
    // const lessThan10 = num => num < 10 ? '0' + num : num;
    // labelDate.textContent = now;
    // it would look weird
    labelDate.textContent = `As of ${day}/${month}/${year}, ${hour}:${minutes}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer Date:
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add date and time of the loan request:
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// all numbers are floats by default, so:
console.log(23 === 23.0); // prints true

// base 10 - 0 to 9
// base 2 - 0, 1

console.log(0.2 + 0.1); // hihi prints 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // hihi false. We have to accept it

// convert string to number
console.log(Number('23')); // number 23
console.log(+'23'); // number 23
// it does the same as above

// Parsing number from string:
console.log(Number.parseInt('30px', 10)); // number 30
console.log(Number.parseInt('e23', 10)); // has to start with number - NaN

// parsing floats:
console.log(Number.parseFloat('2.5rem')); // 2.5 prints
console.log(Number.parseInt('   2.5rem')); // 2 prints
// whitespace does not matter, if it starts with numerics

// isNaN function:
console.log(Number.isNaN(20)); // prints false
console.log(Number.isNaN('20')); // prints false
console.log(Number.isNaN(+'20x')); // prints true
console.log(Number.isNaN(20 / 0)); // prints false
console.log(20 / 0); // prints Infinity :O

// isFinite - better way to decide if expression is a real number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20x')); // false
console.log(Number.isFinite(2/0)); // false
console.log(Number.isFinite(2 + 0)); // true

// isInteger:
console.log(Number.isInteger(20)); // true
console.log(Number.isInteger(20.0)); // true
console.log(Number.isInteger(2 / 0)); // false

// Mathe and Rounding:

// square route:
console.log(Math.sqrt(25));
console.log(25 ** (1/2)); // same sa above

// cubic route:
console.log(8 ** (1/3));
console.log(Math.cbrt(8));

// max function:
console.log(Math.max(25, 23, 28, 20, 11, 3)); // prints 28
console.log(Math.max(25, 23, '28', 20, 11, 3)); // coertion works here, so 28
console.log(Math.max(25, 23, '28px', 20, 11, 3)); // parseInt is not included, so NaN returns

// min function:
console.log(Math.min(2, 8, 255, 56, 1)); // 1

// math.pi
console.log(Math.PI * Number.parseFloat('10px') ** 2); // prints 314.1592653589793

// math random:
console.log(Math.trunc(Math.random() * 6) + 1);

// randomInt:
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
console.log(randomInt(45, 100));

// rounding integers:
// math.trunc - remove decimals after integers
console.log(Math.trunc(23.3)); // prints 23
// math.round: rounds it to closest integer:
console.log(Math.round(23.4)); // prints 23
console.log(Math.round(23.54)); // prints 24

// math ceil: rounds up
console.log(Math.ceil(23.4)); // prints 24
console.log(Math.ceil('23.5')); // prints 24

// math floor: rounds down
console.log(Math.floor(23.4)); // prints 23
console.log(Math.floor(23.4)); // prints 23

// negative numbers:
console.log(Math.round(-23.4)); // prints -23
console.log(Math.floor(-23.4)); // prints -24
console.log(Math.ceil(-23.4)); // prints -23

// rounding decimals:
console.log((2.7).toFixed(0)); // 3 - it is returned in string
console.log((2.7).toFixed(3)); // 2.700 as a string
console.log((2.754).toFixed(2)); // 2.75 as a string
console.log((2.757).toFixed(2)); // 2.76 as a string
console.log(+(2.754).toFixed(2)); // 2.75 as a number 
// because of + sign and type coertion

// reminder operator:
console.log(5 % 2); // reminder is 1 - 5: 2 * 2 + 1
console.log(5 / 2); // 2.5
console.log(5 % 3); // reminder is 2
console.log(5 / 3); // 1.6666666666666667

const isEven = n => n % 2 === 0;
console.log(isEven(2)); // true
console.log(isEven(21)); // false
console.log(isEven(43)); // false

labelBalance.addEventListener('click', function() {
  [...document.querySelectorAll('.movements__row')].forEach(function(row, i) {
      if (i % 2 === 0) row.style.backgroundColor = 'orangered';
      if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

// numeric operations:

// thousand separator: 287,460,000,000
const diameter = 287_460_000_000 // thousand separator in practice
console.log(diameter); // prints 287460000000 (ignores _)

const priceCents = 345_99;
console.log(priceCents); // prints 34599
console.log(priceCents + 1); // prints 34600

const transferFee1 = 15_00;
const transferFee2 = 1_500;
console.log(transferFee1 === transferFee2); // exact same: true

const PI = 3.14_15 // possible
// not possible 3._1415 3.14__15, 3_.14_15...

console.log(Number('230_000')); // this returns NaN, not working here as expected
console.log(parseInt('230_000')); // prints only 230, the rest  behind _ is ignored 

// big Ints:
console.log(2 ** 53 - 1); // biggest integer: 9007199254740991
console.log(Number.MAX_SAFE_INTEGER);

console.log(2 ** 53 + 1) // it ads one less number: 9007199254740992 (there should be 3)

// from 2022 we have bigInt:
console.log(45945847451461548514851845148); // prints 4.594584745146154e+28
// this could not be correct

console.log(45945847451461548514851845148n);
console.log(BigInt(44851845148)); // prints 44851845148n

// adding:
console.log(1000n + 1000n); // prints 2000n
// multiplying: 
console.log(36956525000000021521n * 51458215250000000000514165452145145n);
// prints 1901716818342007357451252163636338365886479695615665545n

const huge = 85298652n;
const num = 55;
// console.log(huge + num); // Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
console.log(huge + BigInt(num)); // works
// prints 85298707n

// logical comparision works:
console.log(20n < 25); // true
console.log(20n == 20); // true
console.log(20n === 20); // false, because type coertion is not done here
console.log(typeof 20n); // bigint prints

// string concatination works:
console.log(huge + ' is really big number');
// 85298652 is really big number

// console.log(Math.sqrt(16n)); // does not work

// division does not work well, only adds first big int it found, not decimal numbers:
console.log(12n / 3n); // prints 4n
console.log(11n / 3n); // prints 3n (not float as below)
console.log(11 / 3); // prints 3.6666666666666665

// DATES section:
// create a date:
// there are four ways:
// 1. simply use new Date:

const rightNow = new Date(); // prints now's date
console.log(rightNow); // it was Tue Aug 15 2023 16:21:16 GMT+0200 (Central European Summer Time)

// 2. using string in good format
console.log(new Date('Dec 16 1993, 16:12:05'));
// prints Thu Dec 16 1993 16:12:05 GMT+0100 (Central European Standard Time)

// using string in not that nice format, but javascript will do its best:
console.log(new Date('December 12, 1993'));
// prints Sun Dec 12 1993 00:00:00 GMT+0100 (Central European Standard Time)

// using date that JavaScript created:
console.log(new Date(account1.movementsDates[1]));
// prints Mon Dec 23 2019 08:42:02 GMT+0100 (Central European Standard Time)

console.log(new Date(2037, 10, 19, 15, 23, 1));
// it is actual November - 10 (because it's index)
// prints Thu Nov 19 2037 15:23:01 GMT+0100 (Central European Standard Time)

// invalid date creation:
console.log(new Date(2022, 10, 32));
// it is not November 32, but December 02
// Fri Dec 02 2022 00:00:00 GMT+0100 (Central European Standard Time)

// first date:
console.log(new Date(0));
// it prints Thu Jan 01 1970 01:00:00 GMT+0100 (Central European Standard Time)
console.log(new Date(3 * 24 * 60 * 60 * 1000));
// Sun Jan 04 1970 01:00:00 GMT+0100 (Central European Standard Time)
console.log(3 * 24 * 60 * 60 * 1000);
// time stamp: 259200000;

// working with dates:
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);

// methods:
console.log(future.getFullYear()); // prints 2037
console.log(future.getMonth()); // prints 10
console.log(future.getDate()); // prints 10
console.log(future.getDay()); // prints 4 (it is day of week / thursday)
console.log(future.getHours()); // prints 15
console.log(future.getMinutes()); // prints 23
console.log(future.getSeconds()); // prints 0
console.log(future.toISOString()); // prints 2037-11-19T14:23:00.000Z

console.log(future.getTime()); // get this timestamp: 2142253380000
console.log(new Date(2142253380000));
// prints Thu Nov 19 2037 15:23:00 GMT+0100 (Central European Standard Time)
console.log(Date.now()); // actual time stamp was: 1692110731384

console.log(future.setFullYear(2040));
// we have also set months and set day and so on:
console.log(future);
// prints now Mon Nov 19 2040 15:23:00 GMT+0100 (Central European Standard Time)

// OPERATIONS WITH DATES:
// substraction:
// we can do it when we convert it to the numbers: by adding + before
console.log(+future); // was sometime: 2236947780000
// const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
const future2 = new Date(2037, 3, 14);
const d2 = new Date(2037, 3, 4);
// console.log(calcDaysPassed(future2, d2)); // prints 10

// internationalizing numbers:
const numbr = 3852452.24;

const options = {
  style: "currency", // percent
  unit: "celsius", // celsius
  currency: 'EUR',
  // grouping: false,
}
// there are plenty of possibilties what to define

// prints nicely 3,852,452.24
console.log('US:     ', new Intl.NumberFormat('en-US', options).format(numbr));
console.log('Germany:', new Intl.NumberFormat('de-DE', options).format(numbr));
// german: 3.852.452,24
console.log('Syria:', new Intl.NumberFormat('ar-SY', options).format(numbr));
// prints: ٣٬٨٥٢٬٤٥٢٫٢٤
console.log('Browser:',
  navigator.language,
  new Intl.NumberFormat(navigator.language).format(numbr));
// actually I have en-US as well
// prints Browser: en-US 3,852,452.24

