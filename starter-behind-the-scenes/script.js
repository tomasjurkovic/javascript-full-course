'use strict';

function calcAge(birthYear) {
  const age = 2023 - birthYear;
  function printAge() {
    // creating new variable with same name as outer scope's variable
    const firstName = 'Django'; // here in this scope firstName is Django, outside it is Tomas
    let output = `You are ${age} years old and born in ${birthYear}.`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);
      console.log(millenial);

      function add(a, b) {
        return a + b;
      }

      // reassigning outer scope's variable
      output = 'new output!';
    }
    // console.log(add(2, 3)); // Uncaught ReferenceError: add is not defined
    // functions are block scope and cannot be reached this way outside of its scope in STRICT MODE
    console.log(millenial); // possible, because var are function scope variables
    // console.log(str); // script.js:13 Uncaught ReferenceError: str is not defined
    console.log(output); // prints new output, because I redefined it
  }
  printAge();

  return age;
}

const firstName = 'Tomas';
calcAge(1993);
