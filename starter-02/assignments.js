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

function percentageOfWorld1(population) {
    const wordPopulation = 7900;
    return (population / wordPopulation) * 100;
}

const slovakiaPercentage = percentageOfWorld1(5.3);
const chinaPercentage = percentageOfWorld1(1441);
const bangladeshPercentage = percentageOfWorld1(169.4);

console.log(slovakiaPercentage, bangladeshPercentage, chinaPercentage);
// prints 0.0670886075949367 2.1443037974683543 18.240506329113924

const percentageOfWorld2 = function (population) {
    const wordPopulation = 7900;
    return (population / wordPopulation) * 100;
}

const slovakiaPercentage2 = percentageOfWorld2(5.3);
const chinaPercentage2 = percentageOfWorld2(1441);
const bangladeshPercentage2 = percentageOfWorld2(169.4);

console.log(slovakiaPercentage2, bangladeshPercentage2, chinaPercentage2);
// prints 0.0670886075949367 2.1443037974683543 18.240506329113924