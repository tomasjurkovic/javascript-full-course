/* FIRST LECTION:

let js = 'amazing';

console.log(40 + 8 + 23 - 10);
console.log(23);

let firstName = "Bob";
console.log(firstName);

const PI = 3.1415; // convention

let myFirstJob = 'manual tester';
let myCurrentJob = 'automation tester';

// assigment:
// 1. Declare variables called 'country', 'continent' and 'population' and
// assign their values according to your own country (population in millions)
// 2. Log their values to the console

*/

/*
// VALUES:
let javascriptIsFun = true;
console.log(javascriptIsFun);

console.log(typeof javascriptIsFun) // boolean

// lets reasign the variable
javascriptIsFun = "Yes!";
console.log(typeof javascriptIsFun) // string

// undefined variable>
let year;
console.log(year);
console.log(typeof year);
year = 1993;
console.log(typeof year);

*/

// Declaring variables:
/*
let age = 30;
age = 31;

const birthYear = 1993;
// birthYear = 1994; // not possible at all
console.log(birthYear);
*/

// BASIC operators:
/*
const currentYear = 2023
const ageTomas = currentYear - 1993;
const ageSarah = currentYear - 2010;
console.log(ageTomas, ageSarah);
console.log(ageTomas / 2, ageSarah * 3);

const firstName = 'Tomas';
const lastName = 'Jurkovic';
console.log(firstName + ' ' + lastName);

let x = 10 + 5; // 15
x += 10; // x = x + 10 => 25
console.log(x);

x **= 2; // x = x square 2

console.log(x);

// comparison operators:
console.log(ageSarah > ageTomas) // false
console.log(ageTomas >= 18); // true
const isFullAge = ageSarah >= 18; // false
*/

// Operator precedence:

// possible to declare more variables at once:
// let x, y;
// x = y = 4 + 7 - 1;
// console.log(x, y)

// const currentYear = 2023
// const ageTomas = currentYear - 1993;
// const ageSarah = currentYear - 2010;
// const averageAge = (ageSarah + ageTomas) / 2;
// console(ageSarah, ageTomas, averageAge);

// STRING and TEMPLATE litterals:
/* const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const currentYear = 2023;

const jonas = "I'm " + firstName + ", a " + (currentYear - birthYear) + " years old " + job + "!";
console.log(jonas);

const jonasNew = `I'm ${firstName}, a ${currentYear - birthYear} years old ${job}!`;
console.log(jonasNew);

// it works also like this:
console.log(`Just classic string...`);

// mulitple lines string:
console.log(`String
with muliptle
lines`); */

// IF ELSE Statements:
const age = 7;

if (age >= 18) {
    console.log('Sarah can start driving license')
} else {
    const yearLeft = 18 - age;
    if (yearLeft == 1) {
        console.log(`Sarah is too young. Wait another ${yearLeft} year.`)
    } else {
        console.log(`Sarah is too young. Wait another ${yearLeft} years.`)
    }
}

// century example:
const birthYear = 2022;
let century;
if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(century)