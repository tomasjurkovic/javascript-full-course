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
// now it's not possible to checkin, because passport was changed
