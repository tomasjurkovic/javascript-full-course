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