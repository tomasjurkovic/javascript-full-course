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

// ASSIGNMENT 4: ARRAYS
/* 1. Create an array containing 4 population values of 4 countries of your choice.
You may use the values you have been using previously. Store this array into a
variable called 'populations'
2. Log to the console whether the array has 4 elements or not (true or false)
3. Create an array called 'percentages' containing the percentages of the
world population for these 4 population values. Use the function
'percentageOfWorld1' that you created earlier to compute the 4
percentage values */

const hungaryPopulation = 9.7;
const mongoliaPopulation = 3.3;
const brazilPopulation = 214.3;
const nigerPopulation = 25.2;

const populations = [hungaryPopulation,
    mongoliaPopulation, brazilPopulation, nigerPopulation];
console.log(populations.length === 4); // prints true

const percentages = [percentageOfWorld1(hungaryPopulation),
percentageOfWorld1(mongoliaPopulation),
percentageOfWorld1(brazilPopulation),
percentageOfWorld1(nigerPopulation)];

console.log(percentages);

// ASSIGNMENT 5: LECTURE: Basic Array Operations (Methods)

/*1. Create an array containing all the neighbouring countries of a country of your
choice. Choose a country which has at least 2 or 3 neighbours. Store the array
into a variable called 'neighbours'
2. At some point, a new country called 'Utopia' is created in the neighbourhood of
your selected country. So add it to the end of the 'neighbours' array
3. Unfortunately, after some time, the new country is dissolved. So remove it from
the end of the array
4. If the 'neighbours' array does not include the country ‘Germany’, log to the
console: 'Probably not a central European country :D'
5. Change the name of one of your neighbouring countries. To do that, find the
index of the country in the 'neighbours' array, and then use that index to
change the array at that index position. For example, you can search for
'Sweden' in the array, and then replace it with 'Republic of Sweden'. */

const neighbours = ['Austria', 'Czech republic', 'Hungary', 'Poland', 'Ukraine'];
neighbours.push('Utopia'); // adds Utopia
neighbours.pop(); // removes Utopia

if (neighbours.includes('Germany') === false) {
    console.log('Probably not a central European country :D'); // even it is...
};

neighbours[1] = 'Czechia'; // new official title

console.log(neighbours);