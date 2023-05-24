'use strict';

const bookings = [];

const createBooking = function(flightNum, numPassangers = 1, price = 199 * numPassangers) {
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
    }

    console.log(booking);
    bookings.push(booking);
}

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

const checkIn = function(flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;

    if(passenger.passport === 221653215) {
        alert('Check in');
    } else {
        alert('Wrong passport!');
    }
}
checkIn(flight, jonas)
console.log(flight, jonas);
// name was changed: {name: 'Mr. Jonas Schmedtmann', passport: 221653215}
// flight was not changed, because primitives are not changeable

// it is same like this:
const flightNum = flight // just a refference
const passenger = jonas 
// if we change passenger, we change jonas, cuz they are the same object

const newPassport = function(person) {
    person.passport = Math.trunc(Math.random() * 10000000);
}

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
    increment: function() {
        this.value++;
    }
}
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
    return function() {
        counter++;
    }
}
// this returns a function 

// FUNCTIONS ACCEPTING CALLBACK FUNCTIONS:

const oneWord = function(str) {
    return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function(str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function(str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
    console.log(`Transform by: ${fn.name}`); // functions can have properties
}

transformer('JavaScript is the best', upperFirstWord);
/* Original string: JavaScript is the best
Transformed string: JAVASCRIPT is the best
Transform by: upperFirstWord */

transformer('JavaScript is the best', oneWord);
/* Original string: JavaScript is the best
Transformed string: javascriptisthebest
Transform by: oneWord */

const high5 = function() {
    console.log('👋');
}

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

const greet3 = function(greeting) {
    return function(name) {
        console.log(`${greeting} ${name}`);
    }
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
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
    },
};

lufthansa.book(238, 'Tomas Jurkovic');
lufthansa.book(223, 'John Smith');

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
    // not copying same book method:

}

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
const flightData = [583, 'Graham Potter']
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData) // exactly the same but better
console.log(swiss);
// 0: {flight: 'LX999', name: 'Diego Simeone'}
// 1: {flight: 'LX583', name: 'Graham Potter'}
// 2: {flight: 'LX583', name: 'Graham Potter'}

// call method > applu method