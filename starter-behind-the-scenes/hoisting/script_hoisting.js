'use strict';

console.log(me); // it is until initialization: undefinef
console.log(job); // Temporal dead zone: script_hoisting.js:4 Uncaught ReferenceError: Cannot access 'job' before initialization
console.log(year); // same error as well

console.log(addDecl(10, 50)); // result 60 is printed because of hoisting
console.log(addExpr(60, 40)); // Temporal dead zone: Cannot access 'addExpr' before initialization
console.log(addArrow(100, 500)); // same error as well
console.log(varExprFunction(600, 400)); // it prints undefined because of weird var behaviour. Var are undefined before they are decalred in code.

var me = 'Tomas';
let job = 'tester';
const year = 1993;

// functions:
function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

var varExprFunction = function (a, b) {
  return a + b;
};
