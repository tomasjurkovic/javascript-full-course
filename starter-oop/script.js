'use strict';

// constructors start with Capital letter always:
const Person = function(firstName, birthYear) {
    // console.log(this); // Person {}
    this.firstName = firstName; // convention
    this.birthYear = birthYear;

    // never create method instead of constructor function:
    // this.calcAge = function () {
    //     console.log(2023 - this.birthYear);
    // };
};

// call constructor function with new operator:
// behind the scene:
// 1. new {} is created
// 2. function is called, this keyword = {}
// 3. {} is linked to prototype
// 4. function automatically return {} or created object itself
const tomas = new Person('Tomas', 1993);

console.log(tomas);
// prints Person {firstName: 'Tomas', birthYear: 1993}

// we can create as many Persons as we want with this constructor function:
const james = new Person('James', 1990);
const jack = new Person('Jack', 1987);
const matilda = new Person('Matilda', 1967);
const sarah = new Person('Sarah', 2003);

console.log(james, jack, matilda, sarah);

console.log(james instanceof Person); // prints true
const jules = 'Jules'
console.log(jules instanceof Person); // prints false
