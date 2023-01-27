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
const actualYear = new Date().getFullYear();

// function declaration:
console.log(calculateAge(1993));
// difference is, that we can call declarated function even before declaration 

function calculateAge(birthYear) {
    return actualYear - birthYear;
}

// function expression
const calculateAge2 = function (birthYear) {
    return actualYear - birthYear;
}
console.log(calculateAge2(1990));

// ARROW FUNCTION:
const calculateAge3 = birthYear => actualYear - birthYear;
console.log(calculateAge3(1678));

// when we have 1 parameter and multiple lines of code:
const yearsUntilRetirement = birthYear => {
    const actualAge = actualYear - birthYear;
    const retirement = 65 - actualAge;
    return retirement;
}

const tomasCanRetireAfter = yearsUntilRetirement(1993);
console.log(tomasCanRetireAfter);

// when we have multiple parameters:
const whenPersonRetires = (birthYear, firstName) => {
    const actualAge = actualYear - birthYear;
    const retirement = 65 - actualAge;
    return `${firstName} retires in ${retirement} years.`;
}

console.log(whenPersonRetires(1993, 'Tomas'));