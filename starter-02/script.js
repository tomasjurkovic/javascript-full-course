'use strict';

/*
// put it always in the first line of our code
let hasDriversLicense = false;
const passTest = true;

if (passTest) {
    hasDriversLicense = true;
}

if (hasDriversLicense) console.log('I can drive');

// reserved word: interface
// const interface = 'Audio';
*/

// FUNCTIONS:
/*
function logger() {
    console.log('My name is Tomas');
}

// calling / running / invoking / executing function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

console.log(fruitProcessor(5, 8));

const appleJuice = fruitProcessor(2, 0);
console.log(appleJuice);

const appleOrangesJuice = fruitProcessor(2, 4);
console.log(appleOrangesJuice);
*/

// FUNCTION DECLARATIONS VS> EXPRESSIONS:

// function declaration:
console.log(calculateAge(1993));
// difference is, that we can call declarated function even before declaration 

function calculateAge(birthYear) {
    const actualYear = new Date().getFullYear();
    return actualYear - birthYear;
}

// function expression
const calculateAge2 = function (birthYear) {
    const actualYear = new Date().getFullYear();
    return actualYear - birthYear;
}
console.log(calculateAge2(1990));