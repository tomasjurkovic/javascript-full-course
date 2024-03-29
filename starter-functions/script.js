'use strict';

const bookings = [];

const createBooking = function (flightNum, numPassangers = 1, price = 199 * numPassangers) {
    // ES6 way: setting defaulty in function definition - price = 199 if not set differently

    // setting default paramenters:
    // ES5 way:
    // numPassangers = numPassangers || 1; // short circuiting
    // if not defined, then it's 1
    // default is a falsy value
    // price = price || 1

    const booking = {
        flightNum,
        numPassangers,
        price
    };

    console.log(booking);
    bookings.push(booking);
};

createBooking();
// prints {flightNum: undefined, numPassangers: undefined, price: undefined}
// {flightNum: undefined, numPassangers: 1, price: undefined}
// {flightNum: undefined, numPassangers: 1, price: 199}

createBooking('ara');
// prints {flightNum: 'ara', numPassangers: undefined, price: undefined}
// {flightNum: 'ara', numPassangers: 1, price: undefined}
// {flightNum: 'ara', numPassangers: 1, price: 199}

createBooking(773, 5, 19.50);
// prints: {flightNum: 773, numPassangers: 5, price: 19.5}

createBooking(773, 5);
// {flightNum: 773, numPassangers: 5, price: 995}

// we can skipp setting variables, when we let them undefined:
createBooking(undefined, undefined, 45);
// prints {flightNum: undefined, numPassangers: 1, price: 45}
// because numPassangers is 1 if undefined


// passing arguments:
const flight = 'LH234';
const jonas = {
    name: 'Jonas Schmedtmann',
    passport: 221653215,
};

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;

    if (passenger.passport === 221653215) {
        alert('Check in');
    } else {
        alert('Wrong passport!');
    }
};
checkIn(flight, jonas);
console.log(flight, jonas);
// name was changed: {name: 'Mr. Jonas Schmedtmann', passport: 221653215}
// flight was not changed, because primitives are not changeable

// it is same like this:
const flightNum = flight; // just a refference
const passenger = jonas;
// if we change passenger, we change jonas, cuz they are the same object

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 10000000);
};

newPassport(jonas);
console.log(flight, jonas);
checkIn(flight, jonas);
// now it's not possible to checkin, because passport was changedt

// FIRST CLASS FUNCTIONS:
// means that all functions are values
// we can:
// A/ store functions into variables
const add = (a, b) => a + b;
// B/ store functions as object properties
const counter = {
    value: 23,
    increment: function () {
        this.value++;
    }
};
// C/ pass function as arguments to OTHER functions
const greet = () => console.log('Hey Tomas');
// btnClose.addEventListener('click', greet);

// D/ return functions FROM functions

// E/ call methods on functions
// counter.increment.bind(someOtherObject);

// HIGHER-ORDER FUNCTIONS:
// 1. function that receives another function as an argument:
const greet2 = () => console.log('Hey Tomas');
// btnClose.addEventListener('click', greet2);
// addEventListener is higher order function
// greet is callback function, which will be called later when click event happens

// 2. function that returns new function:
function count() {
    let counter = 0;
    return function () {
        counter++;
    };
}
// this returns a function 

// FUNCTIONS ACCEPTING CALLBACK FUNCTIONS:

const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
    console.log(`Transform by: ${fn.name}`); // functions can have properties
};

transformer('JavaScript is the best', upperFirstWord);
/* Original string: JavaScript is the best
Transformed string: JAVASCRIPT is the best
Transform by: upperFirstWord */

transformer('JavaScript is the best', oneWord);
/* Original string: JavaScript is the best
Transformed string: javascriptisthebest
Transform by: oneWord */

const high5 = function () {
    console.log('👋');
};

document.body.addEventListener('click', high5);

['Adam', 'Boris', 'Cyril'].forEach(high5);
// high5 is a callback function in these exmples
// JS uses callbacks all the time
// higher level functions can focus on important stuff - 
// doing only that neccessery part
// but using abstraction we can create 'lower level' functions
// that can be used as callback functions in higher order functions
// we are more abstract
// this is really useful for doing my code more reusable

// Function returning a new function
// actually opposite of previous one

const greet3 = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    };
};

const greeterHey = greet3('Hey');
// this function is saved to variable and since it's just a function again
// it can be called with parameter as below 
greeterHey('Tomas'); // prints Hey Tomas
greeterHey('Jacob'); // prints Hey Jacob
// works because of closures

// all in one go:
greet3('Hello')('Michal');
// looks weird but works
// prints Hello Michal

// challenge: write it as arrow function
// I tried this>
// const greetArrow = (greeting) => function(name) {
//     console.log(`${greeting} ${name}`);
// }

// simple in one line:
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

const greetAhoy = greetArrow('Ahoy');
greetAhoy('Slovensko');
// prints Ahoy Slovensko

greetArrow('Hi')('Jack');
// prints Hi Jack

// calling methods:
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // before:
    // book: function () {},
    // now:
    book(flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
    changeIataCode(aitaCode) {
        this.aitaCode = aitaCode;
        console.log(`New iataCode for ${this.airline} is ${this.aitaCode}`);
    },
};

lufthansa.book(238, 'Tomas Jurkovic');
lufthansa.book(223, 'John Smith');

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
    // not copying same book method:

};

// with this it is possible to call book method with many other airlines objects
const book = lufthansa.book;

// does not work
// book(23, 'Sarah Wiliams');

// .call() method could just call a book method and the first argument
// is this keyword
book.call(eurowings, 23, 'Sarah Williams');
// peints Sarah Williams booked a seat on Eurowings flight EW23

book.call(lufthansa, 778, 'Diego Simeone');
// Diego Simeone booked a seat on Lufthansa flight LH778

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
};

book.call(swiss, 999, 'Diego Simeone');
// Diego Simeone booked a seat on Swiss Air Lines flight LX999

// apply method:
// it accepts data in arrat
const flightData = [583, 'Graham Potter'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData); // exactly the same but better
console.log(swiss);
// 0: {flight: 'LX999', name: 'Diego Simeone'}
// 1: {flight: 'LX583', name: 'Graham Potter'}
// 2: {flight: 'LX583', name: 'Graham Potter'}

// call method > apply method

// BIND method:
// bind allows us to manually set this keyword to anything we want
// book.call(eurowings, 23, 'Sarah Williams');

// now it is possible to call for eurowings all the time
const bookEW = book.bind(eurowings);
bookEW(203, 'Steven Seagal');
// Steven Seagal booked a seat on Eurowings flight EW203

// same for all other airlines:
const bookLH = book.bind(lufthansa);
const bookSW = book.bind(swiss);

bookLH(203, 'Steven Seagal');

// we can do this for all params:
const bookEW23 = book.bind(eurowings, 23);
// and also all params if needed:
const bookEW23MS = book.bind(eurowings, 23, 'Michael Saylor');

// now only one param is needed:
bookEW23('Tomas Jurkovic');
// prints Tomas Jurkovic booked a seat on Eurowings flight EW23

bookEW23MS();
// prints Michael Saylor booked a seat on Eurowings flight EW23

// with Event Listeners:
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this); // {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(4), planes: 305, book: ƒ, …}
    this.planes++;
    console.log(`${this.airline} bought a new plane. They actually have ${this.planes} planes.`);
};

document.querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// bind is important anyway we don't know what is this method, it will be button itself
// when bind is applied with lufthansa argument, it is crystal clear that this keyword is lufthansa

lufthansa.buyPlane();

// partial application:
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); // prints 220

// for this example this keyword is not important, so null is a standard 
// second argument sets rate to 0.23


const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(150)); // prints 184.5

// order of argument really do matter...

// challenge create a function that returns a function:
// example is same as before here:
const addTaxRate = function (rate) {
    return function (value) {
        return value + rate * value;
    };
};

const addVat23 = addTaxRate(0.23);
console.log(addVat23(100)); // prints 123
console.log(addVat23(333)); // prints 409.59000000000003

// my little exercise:
const changeIata = lufthansa.changeIataCode;
const changeIataEW = changeIata.bind(eurowings);
const changeIataSW = changeIata.bind(swiss);
changeIataSW('SUI'); // prints New iataCode for Swiss Air Lines is SUI 
changeIataEW('EU'); // prints New iataCode for Eurowings is EU
lufthansa.changeIataCode('LFT'); // prints New iataCode for Lufthansa is LFT
// there is no need to bind it when it's inside the lufthansa object

// imidiately invoked function expressions:

const runOnce = function () {
    console.log('this will never run again');
};

// this can be run many times
runOnce();

// this will allows it:
(function () {
    console.log('this will really never run again');
})();
// this pattern is called imidiately invoked function expression

// really works also for arrow funtions:
(() =>
    console.log('this arrow function will really never run again'))
    ();

// closures:
const secureBooking = function() {
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
}

const booker = secureBooking();

booker();
booker();
booker();

// prints: 1 passengers
// 2 passengers
// 3 passengers
// it is because of power of closures

// a function has access to the variable env (VE)
// of the execution context in which was created
// VE attached to the function, exactly as it was at the time and place 
// the function was created

console.dir(booker);
/* [[Scopes]]
: 
Scopes[3]
0
: 
Closure (secureBooking)
passengerCount : 3 */

// more closures:

// example 1:
let f;
const g = function () {
    const a = 23;
    f = function () {
        console.log(a * 2);
    }
}

const h = function () {
    const b = 777;
    f = function () {
        console.log(b * 2);
    }
}

g();
f(); // prints 46, because of closures
console.dir(f);

// re-assigning f function
h();
f(); // prints 1554m because of closure
f(); // prints 1554m because of closure - f has still value of function from h();
console.dir(f);

// example 2:
const boardPassengers = function (n, wait) {
    const perGroup = n / 3;

    setTimeout(function(){
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers.`);
    }, wait * 1000)
    console.log(`Will start boarding in ${wait} seconds.`);
};

setTimeout(function(){
    console.log('TIMER');
}, 1000); // writes TIMER after 1 second

const perGroup = 200; // if I comment previous one it would use this instead of n / 3 expression
boardPassengers(180, 3);