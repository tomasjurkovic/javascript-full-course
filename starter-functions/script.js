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
