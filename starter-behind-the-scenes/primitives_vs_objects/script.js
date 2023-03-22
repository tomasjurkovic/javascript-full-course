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
