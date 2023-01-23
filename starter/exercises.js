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