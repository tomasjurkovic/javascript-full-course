'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const allWeekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const hours = {
    [allWeekdays[3]]: {
      open: 12,
      close: 22,
    },
    [allWeekdays[4]]: {
      open: 11,
      close: 23,
    },
    [allWeekdays[5]]: {
      open: 0, // Open 24 hours
      close: 24,
    },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  hours, // es6 enhanced obejct literals with exactly same name
  order: function (starerIndex, mainIndex) {
    return [this.starterMenu[starerIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({
    starerIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address = 'Kosice',
  }) {
    console.log(
      `Order recieved! ${this.starterMenu[starerIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  // this is already easier -> no need using function keyword
  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...ohterIngredients) {
    console.log(mainIngredient);
    console.log(ohterIngredients);
  },
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  startIndex: 2,
  mainIndex: 2,
});

// DESTRUCTURING OBJECTS:
// // variables are same as properties in objects:
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// // different names of varibales than object properties:
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// set default values is possible:
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters); // menu is by default [] instead of undefined, starters are starterMenu, because it exists

// mutating variables works differently:
let aO = 111;
let bO = 999;
const obj = { aO: 23, bO: 7, cO: 14 };

({ aO, bO } = obj); // it has to be in parenthesis to be working
// not like this: { a, b } = obj
console.log(aO, bO); // 23 7 is printed

// nested objects:
const {
  fri: { open, close },
} = hours;
console.log(open, close); // 11 23 returns

// it is possible to change its names"
const {
  fri: { open: from, close: to },
} = hours;
console.log(from, to); // 11 23 returns

const arr = [1, 3, 5];
const a = arr[0]; // 1
const b = arr[1]; // 3
const c = arr[2]; // 5

// destructuring arrays:
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

console.log(restaurant.order(2, 0)); // prints ['Bruschetta', 'Risotto']
//this is how we can do it with destructuring:
const [starter, mainCourse] = restaurant.order(3, 1);
console.log(starter, mainCourse);

// nested destructuring:
const nested = [1, 2, [5, 6]];
const [var1, , var2] = nested;
console.log(var1, var2); // prints 1 (2) [5, 6]
// var1 = 1
// var2 = [5, 6]

// destructuring inside destructuring:
const [des1, , [des3, des4]] = nested;
console.log(des1, des3, des4); // prints 1 5 6, because we destructured it

// default values:
// useful when we do not know the lenght of the array
const [q = 1, pi = 1, ar = 1] = [8, 9];
console.log(q, pi, ar);
// prints 8 9 1

// SPREAD OPERATOR:

const arraya = [7, 8, 9];
const badNewArray = [1, 2, arraya[0], arraya[1], arraya[2]]; // bad way old fashio
console.log(badNewArray);
// better solution to create new array
const goodNewArray = [1, 2, ...arraya];
console.log(goodNewArray);
// both same, but nice and easy to create new array with ... spread operator

const withoutSpreadOperator = [1, 2, arraya];
console.log(withoutSpreadOperator);
// then all arraya will be then inseted inside the new array
// it will look like this: [1, 2, Array(3)]

// here we gets the same result with spread operator
console.log(...goodNewArray); // 1 2 7 8 9
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// difference between spread operator and destructuirng is
// spread operator takes all the elements form the array and it also
// does not create new variables, so we can only use it in places where we otherwise
// write comma separated values

// copy array:
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy); // prints ['Pizza', 'Pasta', 'Risotto']

// join two or more arrays together:
const joinTwoArrays = [...arraya, ...mainMenuCopy];
console.log(joinTwoArrays); // prints [7, 8, 9, 'Pizza', 'Pasta', 'Risotto']

// iterables: arrays, string, maps, sets. NOT OBJECTS
const str = 'Tomas';
const letters = [...str, ' ', 'J.'];
console.log(letters);
console.log(...str); // is the same as below
console.log('T', 'o', 'm', 'a', 's');

// console.log(`${...str} not working at all`); //Uncaught SyntaxError: Unexpected token '...' (at

// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Let's make pasta! Ingredient 2?"),
//   prompt("Let's make pasta! Ingredient 3?"),
// ];
// console.log(ingredients);

// // old way:
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// // new way:
// restaurant.orderPasta(...ingredients);
// b;

// objects:
const newRestaurant = {
  foundedIn: 1998,
  ...restaurant,
  founder: 'Guiseppe Conte',
};
console.log(newRestaurant);

// copying is possible
// without affecting previous objects"
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Mama Mia';
console.log(restaurant.name);
console.log(restaurantCopy.name);

// rest pattern:
// The spread operator spreads the values in an array or a string across one or more arguments. Rest operator allows us to pass an indefinite number of arguments to function by accumulating these several values into an array.

// 1. destructuring:

// SPREAD OPERATOR:
// spread, because on the RIGHT side of = while REST is on the LEFT side of =
const array1 = [1, 2, ...[3, 4]];
const [a1, b1, ...others] = [1, 2, 3, 4, 5];
console.log(a1, b1, others); // prints 1 2 [3, 4, 5]

const [pizza, , rissoto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(pizza, rissoto, otherFood); // prints Pizza Risotto (4) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// OBJECTS:
const { sat, ...weekdays } = restaurant.hours;
console.log(weekdays);

// 2. functions:

const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length - 1; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(5, 5, 587, 55);
add(85, 805, 577, 4, 1, 74); // returns sum of each calling of fuction

const manyData = [852, 574, 52148, 5845];
add(...manyData); // prints 53574 as a sum

// order pizza example:
restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');
// prints mushrooms
// (3) ['onions', 'olives', 'spinach']

restaurant.orderPizza('cheese');
// prints cheese
// []


// short circuiting:
// OR operator:
console.log('---------OR---------');
// use ANY data type, return ANY data type
console.log(3 || 'Tomas'); // 3
console.log('' || 'Tomas'); // Tomas
console.log(true || undefined); // true
console.log(null || 0); // 0 (even it's falsy)
console.log(null || 0 || undefined || 'Hello' || 23 || null); // Hello - first truthy value

// classic way:
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // res. num. geuests does not exist - 10 returns

// short cicruiting:
const guests2 = restaurant.numGuests || 10;
console.log(guests2);
console.log();

// AND OPERATOR:
console.log('------AND-------'); // opposite of OR operator
console.log(0 && 'Tomas'); // 0 returns (falsy value is returned firt)
console.log(7 && 'Tomas'); // Tomas returns - only last value is return, no falsy value
console.log('Hello' && 23 && null && 'ars'); // null returns as a first falsy value

// old way:
if(restaurant.orderPizza) {
  restaurant.orderPizza('mushroom', 'spinach');
}

// short circuiting:
restaurant.orderPizza && restaurant.orderPizza('vegan cheese', 'corn', 'shitake')
// restaurant.numGuests = 0;
// NULLISH operator ??:
const guests3 = restaurant.numGuests ?? 50;
console.log(guests3);

// LOGICAL ASSIGNMENT OPERATORS:
const rest1 = {
  name: 'Capri',
  numGuests: 0, // 0 is a falsy value, so OR operator converts it to 10
}

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
}

// OR assignment operator:

// if no number of guest is inserted in res1&2 objects, than 10 is returned
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests = rest1.numGuests || 10;

// the same as before, but very handy looking
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// ?? nulish assignment operator:
// solving zero (falsy value) with nullish assignment operator
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

console.log(rest1);
console.log(rest2);

// AND assignment operator:

// example when we want to anonymize name of the owner:
// rest1.owner = rest1.owner && '<Anonymous>'; // owner property is undefined when doing console.log()
// rest2.owner = rest2.owner && '<Anonymous>'; 

// better way:
rest1.owner &&= '<Anonymous>'; // now owner property is not displayed when doing console.log()
rest2.owner &&= '<Anonymous>';

console.log('After anonymizing owners: ');
console.log(rest1); 
console.log(rest2);

// LOOPING ARRAY:
const fullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for of loop:
for (const item of fullMenu) {
  console.log(item);
}

// for of loop using entries
for (const [item, element] of fullMenu.entries()) {
  console.log(`${item + 1}: ${element}`);
  // prints:
  // 1: Focaccia
  // 2: Bruschetta
  // 3: Garlic Bread
  // 4: Caprese Salad
  // 5: Pizza
  // 6: Pasta
  // 7: Risotto
}

console.log([...fullMenu.entries()]);

// for in loop:
for (const key in fullMenu) {
  if (Object.hasOwnProperty.call(fullMenu, key)) {
    const element = fullMenu[key];
    console.log(element);
  }
}

// ENHANCED OBJECT LITERALS:
console.log(restaurant);

// OPTIONAL CHAINING:

// what if we wanted to add opening hours for monday:
// without optional chaining:
if (restaurant.hours && restaurant.hours.mon) console.log(restaurant.hours.mon.open);

// console.log(restaurant.hours.mon.open) // error returns 
//caught TypeError: Cannot read properties of undefined (reading 'open' at script.js:415:34


// WITH optional chaining:
console.log(restaurant.hours.mon?.open); // if not optional is returned
console.log(restaurant.hours?.mon?.open) // also we can check if both values exist

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.hours[day]?.open ?? 'no time'; // default value if open is not defined
  console.log(`On ${day}, we open at ${open}`);
}

// optional chaining works also on methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist'); // executed method that exists
console.log(restaurant.orderRisoto?.(0, 1) ?? 'Method does not exist'); // returns Method does not exist

// without optional chaining it returns:
// console.log(restaurant.orderRisoto(0, 1)); // returns staurant.orderRisoto is not a function
 
// it even works on arrays to check if it is empty:

const users = [
  {name: 'Tomas',
email: 'tomas@me.com'}
];

console.log(users[0]?.name ?? 'User array is empty'); // returns Tomas
console.log(users[1]?.name ?? 'User array is empty'); // returns the second string

// before we know this:
if (users.length > 0) {
  console.log(users[0].name);
} else {
  console.log('User array is empty');
}

const emptyUsers = [];

console.log(emptyUsers[0]?.name ?? ' Array is empty'); // returns the second string
