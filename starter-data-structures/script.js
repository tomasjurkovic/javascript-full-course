'use strict';

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

// Looping Objects:
// PROPERTY NAMES (keys):
const properties = Object.keys(hours); // it creates array with values
console.log(properties); // array is returned: ['thu', 'fri', 'sat']
console.log(`We are open on ${properties.length} days`);

for (const day of Object.keys(properties)) {
  console.log(day); // logs accordingly thu, fri, sat
}

let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}

console.log(openStr);

// PROPERTY VALUES:
const values = Object.values(hours);
console.log(values); // returns array containing another objects according to hour object
//  [{…}, {…}, {…}]

for (const openingHour of Object.values(values)) {
  console.log(openingHour); // logs accordingly 3 objects: {open: 12, close: 22} ...
}

// PROPERTY ENTRIES:
const entries = Object.entries(hours);
console.log(entries); // it transformed object into array
// [Array(2), Array(2), Array(2)]

// looping through object:
// let's write the sentence for each day, when restaurant opens and closes
// we need to destructure the variables in for loop:
// for simpler object just [key, value] would be enough
// but hours contains nested objects inside itself
for (const [key, {open, close} /* there is object */] of entries) {
  console.log(`On ${key} the restaurant opens at ${open} and closes at ${close}.`);
}

// SETS:
// set is collection of unique values 
// introduced in ES6

const orderSet = new Set([
  'Pizza',
  'Pasta',
  'Pasta',
  'Risotto',
  'Pasta',
  'Pizza',
]);

console.log(orderSet);
// prints: only unique values:
// 0: "Pizza"
// 1: "Pasta"
// 2: "Risotto"

console.log(new Set('Jonas')); // prints Set(5) {'J', 'o', 'n', 'a', 's'}

console.log(orderSet.size); // 3 is returned

// check if pizza or bread is there
console.log(orderSet.has('Pizza')); // trur
console.log(orderSet.has('Bread')); // false

// add method:
orderSet.add('Salad');
orderSet.add('Salad'); // it's set, so only 1 unique value was added

console.log(orderSet); // Set(4) {'Pizza', 'Pasta', 'Risotto', 'Salad'}

// also there is delete method:
orderSet.delete('Pasta');

console.log(orderSet); // prints Set(3) {'Pizza', 'Risotto', 'Salad'}

// and there is clear method to delete all values:
// orderSet.clear();
// console.log(orderSet); // prints Set(0) {size: 0}

// looping sets:
for (const order of orderSet) {
  console.log(order); // prints: Pizza, Pasta, Risotto in each line
}

// main usecase is remove duplicate values

// example:
const staff = ['Waiter', 'Chef', 'Waiter', 'Waiter', 'Manager', 'Chef', 'Waiter'];

const staffUnique = new Set(staff);
console.log(staffUnique); // prints Set(3) {'Waiter', 'Chef', 'Manager'}

// make this staff array of unique values
const staffUniqueA = [...new Set(staff)];
console.log(staffUniqueA); // prints ['Waiter', 'Chef', 'Manager']

// if we want to know the size, it would be easy to do so:
console.log(new Set(['Waiter', 'Chef', 'Waiter', 'Waiter', 'Manager', 'Chef', 'Waiter']).size);

// if we need to know how many letters are there:
console.log(new Set('HowManyLettersAreInThisKindaDeutchWord').size); // print 23

// MAPS:
// lot more useful than sets
// data structure to map values to keys - key value pairs
// key can be any type in maps - string, number, booolean, array, another map...

const rest = new Map(); // empty map created

rest.set('name', 'Classico Italiano'); // similar to add method
rest.set(1, 'Firenze, Italy'); // it creates values to map at the end of kv pair
console.log(rest.set(2, 'Lisbon, Portugal')); // it does not only add values, it also returns whole map
rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :)')
  .set(false, 'We are closed :(');

console.log(rest.get('name')); 
// this is how we get access to values of keys in maps
// returns Classico Italiano
console.log(rest.get(true)); // returns We are open :)
console.log(rest.get(1)); // returns Firenze, Italy

const time = 20;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// has method: if map contains specific kyes:
console.log(rest.has('categories'));

// delete method: deletes kv pairs from map
rest.delete(2);
console.log(rest);

// size method:
console.log(rest.size) // 7 is returned as 7 KV pairs were returned

// setting array value as a key:
rest.set([1, 2], 'Test')
console.log(rest);
console.log(rest.get([1, 2])); // it won't work, because key is this [1, 2] object in the memory

const arrayForMap = [1, 2, 3];
rest.set(arrayForMap, 'Test for retrieving values');
console.log(rest.get(arrayForMap)); // now it works - returns: Test for retrieving values

// we can do it with DOM elements:
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);

// creating map in different way:
const question = new Map([
  ['question', 'What is the best programming language?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct answer'],
  [false, 'Try again!'],
])

console.log(question);

// similar to object.entries
console.log(Object.entries(hours));

// we can convert object.entries to maps easily:
const hoursMap = new Map(Object.entries(hours));
console.log(hoursMap);

// quiz app:
console.log(question.get('question'));
// maps iteration:
for(const [key, value] of question) {
  if(typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const answer = Number(prompt(`question.get(question) 
// \n 1/ ${question.get(1)}
// \n 2/ ${question.get(2)}
// \n 3/ ${question.get(3)}`));

// console.log(question.get(question.get('correct') === answer));

// // converting map to array:
// // just use destructuring...
// console.log([...question]);

// // also we have same methods as keys, values and entries on maps:
// console.log(question.entries());
// console.log(question.values());
// console.log(question.keys());

// Working with strings:
const airline = 'Narodny dopravca';
const plane = 'A320';

console.log(plane[0]); // prints A
console.log(plane[1]); // prints 3
console.log(plane[2]); // prints 2
console.log('B737'[1]); // prints 7 - works the same

console.log(airline.length); // prints 16
console.log('steward'.length); // prints 7

console.log(airline.indexOf('r')); 
// prints 2 because r is on 2nd index for the first time
console.log(airline.lastIndexOf('r')); 
// prints 11 because r is on 11th index for the last time
console.log(airline.indexOf('ryba')); // prints -1, because it's not there
console.log(airline.indexOf('prav')); 
// prints 10, becasue it's there and p of prav is on the 10th index

// slice method
// it does not mutate string, because it's not possible
console.log(airline.slice(8)); // prints only dopravca
console.log(airline.slice(2,7)); // prints only rodny

console.log(airline.slice(0, airline.indexOf(' '))); 
// extracts only first word Narodny
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); 
// prints only the last word dopravca (+ 1 means that no ' ' is printed)

// negative indexes:
console.log(airline.slice(-2)); // prints ca - last two indexes
console.log(airline.slice(1, -1)); 
// prints arodny dopravc - just not first and last characters

// exercise:
// write a function that recieve airplane seats and check if it is middle seat or not:

const checkMiddleSeat = function(seat) {
  // B and E are the middle seats
  // seat consists only of numbers and letters from A to F
  const middleSeat = seat.slice(-1);
  return middleSeat === 'B' || middleSeat === 'E' ? true : false
}

console.log(checkMiddleSeat('785A')); // prints false
console.log(checkMiddleSeat('75E')); // prints true
console.log(checkMiddleSeat('4B')); // prints true

// to UPPER or LOWER case
console.log(airline.toLowerCase()); // prints narodny dopravca
console.log(airline.toUpperCase()); // prints NARODNY DOPRAVCA
console.log('baba yaga'.toUpperCase()); // prints BABA YAGA

// fix capitalisation in passenger name:
const passenger = 'tOmaS' // it should be Tomas
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); // prints Tomas

// fuction based on this:
const correctPassengerName = function(passengerName) {
  const lower = passengerName.toLowerCase();
  return lower[0].toUpperCase() + lower.slice(1)
}

// examples:
console.log(correctPassengerName('JinaYAh')); // prints Jinayah
console.log(correctPassengerName('urSHUlA')); // prints Urshula

// comparing emails:
const email = 'hello@tomas.io';
const loginEmail = ' Hello@Tomas.Io  \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
// there are even trimStart or trimEnd which removes empty spaces from start or end
console.log(trimmedEmail); // prints hello@tomas.io

const normalizedEmail = loginEmail.toLowerCase().trim(); // possible to do it in one space
console.log(normalizedEmail); // prints hello@tomas.io

// function:
const normalizeEmail = function(email) {
  return email.toLowerCase().trim();
}

console.log(normalizeEmail(loginEmail)); // prints hello@tomas.io
console.log(email === normalizeEmail(email)); // prints true

// replacing characters
const priceGB = '288,97£'
const priceUS = priceGB.replace('£', '$').replace(',', '.'); // using chaining
console.log(priceUS);

// replacing WORDS:
const announcement = 'All passangers come to boarding door 23. Boarding door 23';
console.log(announcement.replace('door', 'gate'));
// All passangers come to boarding gate 23. Boarding door 23
// only the first door was replaced

// there is even replaceAll method <3
console.log(announcement.replaceAll('door', 'gate'));
// prints All passangers come to boarding gate 23. Boarding gate 23

// booleans:
const plane2 = 'A320neo';
console.log(plane2.includes('A320')); // prints true
console.log(plane2.includes('Boeing')); // prints false
console.log(plane2.startsWith('A320')); // prints true
console.log(plane2.startsWith('B')); // prints false
console.log(plane2.endsWith('0neo')); // prints true
console.log(plane2.endsWith('ng')); // prints false

if(plane2.includes('320') && plane2.endsWith('neo')) {
  console.log('it is an Airbus');
}

const checkBaggege = function (items) {
    const baggege = items.toLowerCase();
    if(baggege.includes('knife') || baggege.includes('gun')) {
      console.log('You are not allowed to on board!');
    } else {
      console.log('Welcome aboard!');
    }
}

checkBaggege('I have some food and a pocket knife'); // prints: You are not allowed to on board!
checkBaggege('Got some socks and camera'); // prints: Welcome aboard!
checkBaggege('SOCKS AND MACHINE GUN'); // prints: You are not allowed to on board!

// PART 3:
// SPLIT: divide string into multiple parts based on a sign:
console.log('a+very+nice+string'.split('+'));
// prints: ['a', 'very', 'nice', 'string']
console.log('tomas jurkovic'.split());
// prints: ['tomas jurkovic']

// we can use destructuring like here:
const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
console.log(firstName); // prints Jonas
console.log(lastName); // prints Schmedtmann

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);
// prints Mr. Jonas SCHMEDTMANN - there are empty spaces because of arguments in join method

const capitalizeName = function(name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    // other solution:
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()))
  }
  return namesUpper.join(' ')
}
const passengerX = 'jessica ann smith davis';
console.log(capitalizeName(passengerX));
// prints Jessica Ann Smith Davis

// padding:
const message = 'Go to gate 23!'
console.log(message.padStart(25, '+')); 
// prints: +++++++++++Go to gate 23!
// first argument is lenght of the entire string!
// second arguemnt adds selected character(s) before
console.log('Tomas'.padStart(25, '+'));
// prints: ++++++++++++++++++++Tomas
// there is similar padEnd, which do the same but at the end of string
console.log('Tomas'.padStart(25, '+').padEnd(35, ':)'));
// prints ++++++++++++++++++++Tomas:):):):):)

// function that adds masking to creditcard number:
// mine that worked just with strings:
const maskCreditCard = function(number) {
  return number.slice(0,4) + ' '.padEnd(16, '**** ') + number.slice(-4);
};

console.log(maskCreditCard('11110000555544442484'));

const maskCreditCardBetter = function(number) {
  const str = String(number); // number + ''; it works the same
  return str.slice(-4).padStart(str.length, '*');
};

console.log(maskCreditCardBetter(44054455121245457778));
console.log(maskCreditCardBetter('4405445551921294564577718'));

// REPEAT:
const message2 = 'Bad weather... All Departures Delyaed... ';
console.log(message2.repeat(3)); // just a multiplicator
// prints Bad weather... All Departures Delyaed... Bad weather... All Departures Delyaed... Bad weather... All Departures Delyaed... 

const planesInLine = function(n) {
  console.log(`There are ${n} planes in the line ${'✈️'.repeat(n)}`);
}

planesInLine(10);
// prints There are 10 planes in the line ✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️

// STRING EXERCISE:
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// mine solution:
for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const delayed = type.includes('Delayed') ? '🔴' : '';
  const output =
   `${delayed} from ${type.replaceAll('_', ' ')} ${from.slice(0,3).toUpperCase()} to ${to.slice(0,3).toUpperCase()} ${time.replace(':', 'h').padStart(time.length + 1, '(').padEnd(time.length + 2, ')')}`
  console.log(output.padStart(47, ' '));
}

// jonas's solution:
const getCode = str => str.slice(0,3).toUpperCase();
for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll('_',' ')} ${from.slice(0,3).toUpperCase()} ${to.slice(0,3).toUpperCase()} (${time.replace(':', 'h')})`.padStart(36);
    console.log(output);
}