'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const arr = [1, 3, 5];
const a = arr[0]; // 1
const b = arr[1]; // 3
const c = arr[2]; // 5

// destructuring:
const [x, y, z] = arr;
console.log(x, y, z); // prints 1 3 5
// this is very easy how to declare variables
// create 3 variables and each will get different value from array, from left to right
// original array is not affected at all:
console.log(arr);

// what if more values?
const arr2 = [4, 8, 16];
const [i, j, k, l] = arr2;
console.log(i, j, k, l); // l is undefined = 4 8 16 undefined
console.log(arr2);

// what if less values?
const arr3 = [3, 9, 27, 81];
const [p, r] = arr3;
// it gets values only from first 2 elements of an array
console.log(p, r);
console.log(arr3); // not affected at all (4) [3, 9, 27, 81]

// lets get back to restaurant:
const [first, second] = restaurant.categories;
console.log(first, second); // prints first two: Italian Pizzeria

// what if I need only fist and third?
// just leave an empty space:
const [thefirst, , thethird] = restaurant.categories;
console.log(thefirst, thethird); // prints first and trhird Italian Vegetarian

// what if we wanna switch main and secondary categories?
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// first solution:
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary); // prints Vegetarian Italian

// better solution:
[main, secondary] = [secondary, main];
// in one line we just change both variables and added them their values but reversed
console.log(main, secondary); // prints Vegetarian Italian
