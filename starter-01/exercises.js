// assigment:
// 1. Declare variables called 'country', 'continent' and 'population' and
// assign their values according to your own country (population in millions)
// 2. Log their values to the console

const country = 'Slovakia';
const continent = 'Europe';
let population = 5.3;

// assignment 2:
/* 1. Declare a variable called 'isIsland' and set its value according to your
country. The variable should hold a Boolean value. Also declare a variable
'language', but don't assign it any value yet
2. Log the types of 'isIsland', 'population', 'country' and 'language'
to the console */

const isIsland = false;
let language;
console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

/* Assigment 3:
1. Set the value of 'language' to the language spoken where you live (some
countries have multiple languages, but just choose one)
2. Think about which variables should be const variables (which values will never
change, and which might change?). Then, change these variables to const.
3. Try to change one of the changed variables now, and observe what happens
*/

language = 'Slovak';


/* 
assignment 4:
. If your country split in half, and each half would contain half the population,
then how many people would live in each half?
2. Increase the population of your country by 1 and log the result to the console
3. Finland has a population of 6 million. Does your country have more people than
Finland?
4. The average population of a country is 33 million people. Does your country
have less people than the average country?
5. Based on the variables you created, create a new variable 'description'
which contains a string with this format: 'Portugal is in Europe, and its 11 million
people speak portuguese
*/

console.log(population / 2) // 2.65
population++;
console.log(population);
const populationOfFinland = 6;
const averageCountryPopulation = 33;
let description = 'Portugal is in Europe, and its 11 million people speak portuguese';

console.log(population > populationOfFinland); // false
console.log(population < populationOfFinland); // true

/* ASIGNMENT 5:

1. Recreate the 'description' variable from the last assignment, this time
using the template literal syntax */

description = `Portugal is in Europe, and its 11 million people speak portuguese`;

/*- ASSIGNMENT 6:

1. If your country's population is greater that 33 million, log a string like this to the
console: 'Portugal's population is above average'. Otherwise, log a string like
'Portugal's population is 22 million below average' (the 22 is the average of 33
minus the country's population)
2. After checking the result, change the population temporarily to 13 and then to
130. See the different results, and set the population back to original
*/
if (population > averageCountryPopulation) {
    console.log("'Slovakia's population is above average.");
} else {
    console.log(`Slovakia's population is ${averageCountryPopulation - population} million below average.`);
}

/* ASSIGMENT 7:

Predict the result of these 5 operations without executing them:
'9' - '5';
'19' - '13' + '17';
'19' - '13' + 17;
'123' < 57;
5 + 6 + '4' + 9 - 4 - 2;
2. Execute the operations to check if you were right
*/

console.log('9' - '5'); // expected result 4 - coercion to numbers
console.log('19' - '13' + '17'); // expected result 617 - first coercion to numbers then to string because + sign
console.log('19' - '13' + 17); // expected result 23 - coercion to numbers and other value is already number
console.log('123' < 57); // expected result false - coercion to numbers, result is boolean bexause < sign
console.log(5 + 6 + '4' + 9 - 4 - 2); // expected result 1143 - coercion of numbers to string twice and then of string to number


// ASSIGNMENT 8:

/* 1. Declare a variable 'numNeighbours' based on a prompt input like this:
prompt('How many neighbour countries does your country
have?');
2. If there is only 1 neighbour, log to the console 'Only 1 border!' (use loose equality
== for now)
3. Use an else-if block to log 'More than 1 border' in case 'numNeighbours'
is greater than 1
4. Use an else block to log 'No borders' (this block will be executed when
'numNeighbours' is 0 or any other value)
5. Test the code with different values of 'numNeighbours', including 1 and 0.
6. Change == to ===, and test the code again, with the same values of
'numNeighbours'. Notice what happens when there is exactly 1 border! Why
is this happening? BECAUSE OF 1 number !== '1' string, so it goes down to else statement...
7. Finally, convert 'numNeighbours' to a number, and watch what happens now
when you input 1
8. Reflect on why we should use the === operator and type conversion in this
situation */

const numNeighbours = Number(prompt('How many neighbourg countries does your country have?'));

if (numNeighbours === 1) {
    console.log('Only one neighbourgh.');
} else if (numNeighbours > 1) {
    console.log('More than 1 border');
} else {
    console.log('No borders');
}

/* ASSIGNMENT 9:
1. Use a switch statement to log the following string for the given 'language':
chinese or mandarin: 'MOST number of native speakers!'
spanish: '2nd place in number of native speakers'
english: '3rd place'
hindi: 'Number 4'
arabic: '5th most spoken language'
for all other simply log 'Great language too :D' */

switch (language) {
    case 'Chinese':
    case 'Mandarin':
        console.log('MOST number of native speakers!');
        break;
    case 'Spanish':
        console.log('2nd place in number of native speakers');
        break;
    case 'English':
        console.log('3rd place in number of native speakers');
        break;
    case 'Hindi':
        console.log('4th place in number of native speakers');
        break;
    case 'Arabic':
        console.log('5th place in number of native speakers');
        break;
    default:
        console.log('Great language too!');
        break;
}

/* ASSIGNMENT 10:
1. If your country's population is greater than 33 million, use the ternary operator
to log a string like this to the console: 'Portugal's population is above average'.
Otherwise, simply log 'Portugal's population is below average'. Notice how only
one word changes between these two sentences!
2. After checking the result, change the population temporarily to 13 and then to
130. See the different results, and set the population back to original
*/

const countryPopulationFacingAverage = population > averageCountryPopulation ? "Slovakia's population is above average" : "Slovakia's population is below average";
console.log(countryPopulationFacingAverage);

// or it could be written like this:
console.log(`${country}'s population is ${population > averageCountryPopulation ? 'above' : 'below'} average`)