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

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(2023 - this.year);

    // solution 1:
    // const self = this; // self or that
    // const isMillenial = function () {
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };
    // isMillenial();

    // solution 2: with arroe functions:
    const isMillenial = () => {
      console.log(this); // because of arrow function it is Jonas' object
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },
  greet: function () {
    console.log(`Hey ${this.firstName}`);
  },
  //   greet: () => console.log(`Hey ${this.firstName}`), // newver use arrow function as a method
};

jonas.greet(); // Hey undefined appears- with arrow function
// jonas is just object and parent object is window, so we get undefined
// with normal function it is Hey Jonas
jonas.calcAge();

// using arrow function as a function in a method is good way

// arguments keywordL
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

addExpr(1, 5); // Arguments(2) [1, 5, callee: (...), Symbol(Symbol.iterator): ƒ]
addExpr(1, 5, 7, 9); // Arguments(4) [1, 5, 7, 9, callee: (...), Symbol(Symbol.iterator): ƒ]

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};

addArrow(1, 2); // returns script.js:86 Uncaught ReferenceError: arguments is not defined at addArrow
