'use-strict';

// primitives:
let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

// objects:

const me = {
  name: 'Tomas',
  age: 30,
};

const friend = me;

friend.age = 40;

console.log('Friend:', friend);
console.log('Me:', me);
