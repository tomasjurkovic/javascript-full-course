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
/*
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
console.log(century);
*/

// Type convertion:
/*
const inputYear = '1991';
console.log(Number(inputYear), inputYear); // 2009, 199118
console.log(Number(inputYear) + 18); // 2009

console.log(Number('weird'));  // NaN not a number
console.log(typeof NaN); // prints a number

console.log(String(23), 23); // 23, 23 (one string on number)

// type coercion:
console.log('I am ' + 23 + ' years old'); // number 23 is automatically converted to string
// it is cool it happens automatically

console.log('23' - '10' - 3); // prints 10, because - converts strings to the numbers automatically
console.log('23' * '3'); // prints 69, because all strings are converted to numbers if * operator is used
console.log('24' / '3'); // prints 8, because all strings are converted to numbers if / operator is used

// guess the output
let n = '1' + 1; //  11 bevause + operator converting to strings
n = n - 1; //  10 because - operator convereting to numbers
console.log(n); // prints 10

*/

// TRUTHY and FALSY values:
/*
// 5 falsy values: 0, '', undefined, null, NaN (and False of course)
// they will be Falsy if converted to boolean values
console.log(Boolean(0));  // false
console.log(Boolean(NaN));  // false
console.log(Boolean(undefined)); // true
console.log(Boolean('Jonas')); // true
console.log(Boolean({}));  // true
console.log(Boolean('')); // false

const money = 0;
if (money) {
    console.log("Don't spend it all now");
} else {
    console.log("You should get a job!");
}

// money is zero now, so JS converts it automatically to boolean and its boolean value is falsy

let height;
if (height) {
    console.log("Yay, height is defined");
} else {
    console.log('Height is UNDEFINED');
} // prints else block, because we did not defined height and it has undefined (falsy) value
*/

// == vs. == operator
/*
const age = 18;

// one line if:
if (age === 18) console.log("You just became an adult.");

const thisTrue = 18 == '18'; // loose equality operator, avoid it if possible
console.log(thisTrue);

const thisFalse = 18 === '18';
console.log(thisFalse); // prints false

const favourite = Number(prompt("What's your favourite number?"));
console.log(favourite);
console.log(typeof favourite);

if (favourite === 23) {
    console.log('Cool! 23 is an amazing number.');
} else if (favourite === 7) {
    console.log('Seven is also cool number.');
} else if (favourite === 9) {
    console.log('Nine is also cool number.');
} else {
    console.log('Number is not 7, 9 nor 23.');
}

if (favourite !== 23) console.log("Why not 23?");
*/

// BOOLEAN LOGIC
/*
const hasDrivingLicense = true;  // A
const hasGoodVision = false;  // B
const isTired = true; // C

console.log(hasDrivingLicense && hasGoodVision); // false
console.log(hasDrivingLicense || hasGoodVision); // true
console.log(!hasGoodVision) // true

if (hasDrivingLicense && hasGoodVision && !isTired) {
    console.log('Sarah is able to drive.');
} else {
    console.log('Someone else should drive instead of Sarah...');
}
*/

// SWITCH STATEMENTS:
const day = 'wednesday';

// when 1 option in switch is empty wothou break, the next one is executed
// break is really neccessary, without it code continue execution of next commands
/*
switch (day) {
    case 'monday':
        console.log('Plan course structure');
        console.log('Go to coding meetup');
        break;
    case 'tuesday':
        console.log('Prepare theory videos');
        break;
    case 'wednesday':
    case 'thursday':
        console.log('Write code examples');
        break;
    case 'friday':
        console.log('Record videos');
        break;
    case 'saturday':
    case 'sunday':
        console.log('Enjoy the weekend');
        break;
    default:
        console.log('Not a valid day!');
        break;
}
*/

// write it as a if else statement:
/* if (day === 'monday') {
    console.log('Plan course structure');
    console.log('Go to coding meetup');
} else if (day === 'tuesday') {
    console.log('Prepare theory videos');
} else if (day === 'wednesday' || day === 'thursday') {
    console.log('Write code examples');
} else if (day === 'friday') {
    console.log('Record videos');
} else if (day === 'saturday' || day === 'sunday') {
    console.log('Enjoy the weekend');
} else {
    console.log('Not a valid day!');
} */

// STATEMENTS & EXPRESSIONS:

/*
// expressions look like and produce a value:
3 + 4
1991
true && false && !false

// statements look like and does not produce a value:
if (23 > 11) {
    const str = '23 is bigger';
}

// in console we can only put expressions:
console.log(`I'm ${2023 - 1993} years old.`);

// this won't work:
// console.log(if (23 > 11) { const str = '23 is bigger'; });

*/

// CONDITIONAL (ternary) OPERATOR:

const age = 23;

// only one line is allowed and second line after : needs to be else block (alos only one line)
age >= 18 ? console.log("I like to drink wine.") :
    console.log('Better drink some water');

// better example that this is expression:
const drink = age >= 18 ? 'wine' : 'water'; // only in one line
console.log(drink);

// same with if else statement:
let drink2;
if (age >= 18) {
    drink2 = 'beer';
} else {
    drink2 = 'cola';
}
console.log(drink2);

// use it in the template literal:
const lactoseAlergy = true;
console.log(`I like to drink a ${lactoseAlergy ? 'double espresso' : 'flat white'}`);