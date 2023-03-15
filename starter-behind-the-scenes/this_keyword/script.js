'use strict';

console.log(this); // window object

const calcAge = function (birthYear) {
  console.log(2023 - birthYear);
  console.log(this); // it is now undefined
};

calcAge(2003);

const calcAgeArrow = birthYear => {
  console.log(2023 - birthYear);
  console.log(this); // it is window, because arrow function uses
  // lexical this word, now the parent is window here/
};

calcAgeArrow(2001);

const tomas = {
  year: 1992,
  calcAge: function () {
    console.log(this);
    console.log(2023 - this.year);
  },
};

tomas.calcAge();

const matilda = {
  year: 2012,
};

// method borroing:
matilda.calcAge = tomas.calcAge;

matilda.calcAge(); // this keyword looks like matilda object

const f = tomas.calcAge;
f(); // this is now undefined
// Cannot read properties of undefined (reading 'year')
