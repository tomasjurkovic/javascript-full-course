'use-strict';

// primitives:
let age = 30;
let oldAge = age;
age = 31;
console.log(age); // returns 31
console.log(oldAge); // returns 30

// objects:

const me = {
  name: 'Tomas',
  age: 30,
};

const friend = me;

friend.age = 40;

console.log('Friend:', friend); // returns Friend: {name: 'Tomas', age: 40}
console.log('Me:', me); // returns Me: {name: 'Tomas', age: 40}

// only primitive variables created with const are imutable, we can change objects
// that's why me and friend are same, because they have same refference in memory heap

me.ara = 'It works';
console.log(me, friend);
// prints: {name: 'Tomas', age: 40, ara: 'It works'} {name: 'Tomas', age: 40, ara: 'It works'}

// exampla:
// primitive:
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';

console.log(lastName, oldLastName);

// objects:
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica;

marriedJessica.lastName = 'Davis';

console.log('Before marriage: ', jessica);
console.log('After marriage: ', marriedJessica);
// prints: Before marriage:  {firstName: 'Jessica', lastName: 'Davis', age: 27} and script.js:51 After marriage:  {firstName: 'Jessica', lastName: 'Davis', age: 27}
// it did not creagte new object in the heap, just another variable with same refference

// copying objects:
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Axel', 'Adam'],
};

const jessiceCopy = Object.assign({}, jessica2);
jessiceCopy.lastName = 'Davis';
console.log('Before marriage: ', jessica2);
console.log('After marriage: ', jessiceCopy);
// works good till now:
// Before marriage: { firstName: 'Jessica', lastName: 'Williams', age: 27, family: Array(3) }
// After marriage:  {firstName: 'Jessica', lastName: 'Davis', age: 27, family: Array(3)}

jessiceCopy.family.push('Mary');
jessiceCopy.family.push('John');

console.log('Before marriage: ', jessica2);
console.log('After marriage: ', jessiceCopy);
// really did not work for family
// both objects have same families, even I only wanted to change the secodn:
// {firstName: 'Jessica', lastName: 'Davis', age: 27, family: Array(5)}
// age
// :
// 27
// family
// :
// (5) ['Alice', 'Axel', 'Adam', 'Mary', 'John']
// firstName
// :
// "Jessica"
// lastName
// :
// "Davis"
// [[Prototype]]
// :
// Object
