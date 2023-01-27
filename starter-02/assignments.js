'use strict';

/* ASSINGMENT 1:
LECTURE: Functions
1. Write a function called 'describeCountry' which takes three parameters:
'country', 'population' and 'capitalCity'. Based on this input, the
function returns a string with this format: 'Finland has 6 million people and its
capital city is Helsinki'
2. Call this function 3 times, with input data for 3 different countries. Store the
returned values in 3 different variables, and log them to the console
*/

function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} million people and its capital city is ${capitalCity}.`;
}

const finland = describeCountry('Finland', 6, 'Helsinki');
const czechRepublic = describeCountry('Czech Republic', 10, 'Prague');
const slovakia = describeCountry('Slovakia', 5.3, 'Bratislava');

console.log(finland);
console.log(slovakia);
console.log(czechRepublic);


/* ASSIGNMENT 2: 
1. The world population is 7900 million people. Create a function declaration
called 'percentageOfWorld1' which receives a 'population' value, and
returns the percentage of the world population that the given population
represents. For example, China has 1441 million people, so it's about 18.2% of
the world population
2. To calculate the percentage, divide the given 'population' value by 7900
and then multiply by 100
3. Call 'percentageOfWorld1' for 3 populations of countries of your choice,
store the results into variables, and log them to the console
4. Create a function expression which does the exact same thing, called
'percentageOfWorld2', and also call it with 3 country populations (can be
the same populations)
*/

const wordPopulation = 7900;

function percentageOfWorld1(population) {
    return (population / wordPopulation) * 100;
}

const slovakiaPercentage = percentageOfWorld1(5.3);
const chinaPercentage = percentageOfWorld1(1441);
const bangladeshPercentage = percentageOfWorld1(169.4);

console.log(slovakiaPercentage, bangladeshPercentage, chinaPercentage);
// prints 0.0670886075949367 2.1443037974683543 18.240506329113924

const percentageOfWorld2 = function (population) {
    return (population / wordPopulation) * 100;
}

const slovakiaPercentage2 = percentageOfWorld2(5.3);
const chinaPercentage2 = percentageOfWorld2(1441);
const bangladeshPercentage2 = percentageOfWorld2(169.4);

console.log(slovakiaPercentage2, bangladeshPercentage2, chinaPercentage2);
// prints 0.0670886075949367 2.1443037974683543 18.240506329113924

// ASSIGNMENT 3: arrow functions:
/* 1. Recreate the last assignment, but this time create an arrow function called
'percentageOfWorld3' */

const percentageOfWorld3 = population => (population / wordPopulation) * 100;
const slovakiaPercentage3 = percentageOfWorld3(5.3);
const chinaPercentage3 = percentageOfWorld3(1441);
const bangladeshPercentage3 = percentageOfWorld3(169.4);

console.log(slovakiaPercentage3, bangladeshPercentage3, chinaPercentage3);

// ASSIGNMENT 4: function calling other functions:
/* 1. Create a function called 'describePopulation'. Use the function type you
like the most. This function takes in two arguments: 'country' and
'population', and returns a string like this: 'China has 1441 million people,
which is about 18.2% of the world.'
2. To calculate the percentage, 'describePopulation' call the
'percentageOfWorld1' you created earlier
3. Call 'describePopulation' with data for 3 countries of your choice */

function describePopulation(country, countrypopulation) {
    const countryPercentage = Number.parseFloat(percentageOfWorld1(countrypopulation)).toFixed(2);

    return `${country} has ${countrypopulation} million people, which is about ${countryPercentage} percent of the world population.`;
}

console.log(describePopulation('Japan', 125.7));
console.log(describePopulation('India', 1408));
console.log(describePopulation('Kenya', 53.01));