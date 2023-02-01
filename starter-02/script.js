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
/*
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

// FUNCTIONS CALLING OTHER FUNCTIONS:
function cutFruit(fruit) {
    return fruit * 3;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruit(apples);
    const orangePieces = cutFruit(oranges);
    const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
    return juice;
}

console.log(fruitProcessor(6, 2));
*/


// RECAP OF FUNCTIONS:
/*
const actualYear = new Date().getFullYear();

const calcAge = function (birthYear) {
    return actualYear - birthYear;
}

const yearsUntilRetirement = (birthYear, firstName) => {
    const retirement = 65 - calcAge(birthYear);
    if (retirement > 0) {
        console.log(`${firstName} retires after ${retirement} years.`);
        return retirement;
    } else {
        console.log(`${firstName} retired already.`);
        return -1;
    }
}

console.log(yearsUntilRetirement(1993, 'Tomas'));
console.log(yearsUntilRetirement(1950, 'Papa Roach'));
*/

// ARRAYS INTRO:
/*
const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

// array is like a big container to store values:
const friends = ['Michael', 'Steven', 'Peter']; // the same but better
console.log(friends);

const y = new Array(1991, 1984, 2008, 2020) // other solution to create arrays
console.log(friends[0]); // prints Michael

console.log(friends.length); // prints 3
console.log(friends[friends.length - 1]); // prints Peter (tha last element of array)

friends[2] = 'Jay';
console.log(friends); // Michael, Steven, Jay is printed in console

// array is not primitive value, so we can mutate arrays,
// but we cannot replace the whole array values like this:
// friends = ['Bob', 'Alice'];

// it allows me to do this:
const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtman', 2037 - 1991, 'teacher', friends];

console.log(jonas);
console.log(jonas.length);

// exercise:
const actualYear = new Date().getFullYear();

const calcAge = function (birthYear) {
    return actualYear - birthYear;
}

const years = [1999, 1967, 1965, 2002, 2021];

console.log(calcAge(years)); // prints NaN, because array is not a nunber

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);

console.log(age1, age2, age3);

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);
*/

// BASIC ARRAY OPERATIONS:
/*
const friends = ['Michael', 'Steven', 'Peter'];

// push: adds elements to the end of array
const newLenght = friends.push('David'); // it pushes David to the last index of friends array
console.log(friends);
console.log(newLenght);

// unshift: adds elements to the beginning of array
friends.unshift("Bruce");
console.log(friends); // prints ['Bruce', 'Michael', 'Steven', 'Peter', 'David']

// pop: removes last element from the end of array
const popped = friends.pop();
console.log(popped); // returns popped element 'David'
console.log(friends); // prints ['Bruce', 'Michael', 'Steven', 'Peter']

// shift: removes first element from the end of array
const shifted = friends.shift();
console.log(shifted); // returns shifted element 'Bruce'
console.log(friends); // prints ['Michael', 'Steven', 'Peter']

// indexOf: returns index of element in array
console.log(friends.indexOf('Steven')); //returns 1 as 'Steven' is the second element in array
console.log(friends.indexOf('Django')) // returns -1, because this element is not present in array

// includes: returns boolean value if element is present in array:
console.log(friends.includes('Benjamin')); // prints false
console.log(friends.includes('Michael')); // prints true

friends.push(23);
console.log(friends.includes('23')); // prints true because of strict equality
console.log(friends.includes(23)); // prints true

if (friends.includes('Peter')) {
    console.log('You have a friend called Peter');
}

// this is from chatGPT: it filters specific item from array
const friendsWithout23 = friends.filter(friend => friend !== 23);
console.log(friendsWithout23); // returns only ['Michael', 'Steven', 'Peter']
*/

// INTRO TO OBJECTS:
/*
const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Piotr', 'Stewie'],
    hasDriverLicense: false,
    hasDriverLicenseString: function () {
        if (this.hasDriverLicense) {
            this.driverLicenseStatement = "has driver's license";
        } else {
            this.driverLicenseStatement = "has not driver's license";
        }
        return this.driverLicenseStatement;

    },
    // calcAge: function (birthYear) {
    //     return 2023 - birthYear;
    // }
    // calcAge: function () {
    //     // console.log(this);
    //     return 2023 - this.birthYear;
    // }
    calcAge: function () {
        this.age = 2023 - this.birthYear;
        return this.age;
    }
};

console.log(jonas);
console.log(jonas.job);
* /

// DOT AND BRACKET NOTATION:
/*
console.log(jonas['lastName']); // returns same result

const nameKey = 'Name';

console.log(jonas['last' + nameKey]);
console.log(jonas['last' + nameKey]); // we can insert there computed expression

// console.log(jonas.'last' + nameKey); // does not woerk - unexpected string
const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName. lastName, birthYear, job and friends');

if (jonas[interestedIn]) {
    console.log(jonas[interestedIn]); // returns ['Michael', 'Piotr', 'Stewie']
} else {
    console.log('Select only value that is allowed!')
}

console.log(jonas.interestedIn); // returns undifined, because we did not declare intersetedIn on jonas object
*/
/*

jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschmedtmann';

console.log(jonas);

// challenge:
// jonas has 3 friends and his best friend is Michael.

console.log(`${jonas.firstName} has ${jonas.friends.length} friends and his best friend is ${jonas.friends[0]}.`);

// OBJECT METHODS:
console.log(jonas.calcAge());
// console.log(jonas['calcAge']());
console.log(jonas.age); // most efficient solution

// small challlege:
// Jonas is a 46-year old teacher and he has/has not a driver licence
console.log(jonas.hasDriverLicenseString());

console.log(`
${jonas.firstName} is a ${jonas.age}-years old ${jonas.job} and he ${jonas.driverLicenseStatement}.
`);

// other better solution:
console.log(`
${jonas.firstName} is a ${jonas.age}-years old ${jonas.job} and he has ${jonas.hasDriverLicense ? 'a' : 'no'} driver's license.
`);
*/

// THE FOR LOOPS:

for (let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weights repetition ${rep}`);
}