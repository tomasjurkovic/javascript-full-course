'use strict';

function calcAge(birthYear) {
  const age = 2023 - birthYear;
  function printAge() {
    const output = `You are ${age} years old and born in ${birthYear}.`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);
      console.log(millenial);
    }
    console.log(millenial); // possible, because var are function scope variables
    // console.log(str); // script.js:13 Uncaught ReferenceError: str is not defined
  }
  printAge();

  return age;
}

const firstName = 'Tomas';
calcAge(1993);
