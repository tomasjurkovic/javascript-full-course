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
// 3. {} is linked to prototype => it creates .__proto__
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

// PROTOTYPES:
Person.prototype.calcAge = function () {
    console.log(2023 - this.birthYear);
};

console.log(Person.prototype); // prints {calcAge: ƒ, constructor: ƒ}

// we have access to it because of prototypal inheritance
tomas.calcAge(); // prints 30
matilda.calcAge(); // prints 56

console.log(tomas.__proto__); 
// prototype of tomas object is prototype property of Person's constructor
console.log(tomas.__proto__ === Person.prototype); // true
// Person.prototype is what's gonna be used as the prototype
// of all the objects that are created with the Person constructor function
Person.prototype.isPrototypeOf(Person)
// false
Person.prototype.isPrototypeOf(tomas)
// true

// set properties through prototype:
Person.prototype.species = 'Homo Sapiens';
// it is located in prototype
console.log(jack.species, matilda.species); // Homo Sapiens Homo Sapiens

// checking is property is inside of object
console.log(jack.hasOwnProperty('firstName')); // prints true
console.log(jack.hasOwnProperty('species')); 
// prints false, because it just has access to it

// prototypal inheritance - built in objects:
console.log(tomas.__proto__); 
// {species: 'Homo Sapiens', calcAge: ƒ, constructor: ƒ}

// Object.prototype / top of the chain =>
console.log(tomas.__proto__.__proto__); 
// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
// contains f.r. hasOwnProperty
// that's why we can do this:
console.log(tomas.hasOwnProperty('firstName'));

console.log(tomas.__proto__.__proto__.__proto__); // return null
// there is nothing that high in chain

console.dir(Person.prototype.constructor);
// ƒ Person(firstName, birthYear)

const arr = [3, 7, 4, 99, 45, 5, 4, 4, 3, 99, 77];
console.log(arr.__proto__);
// [constructor: ƒ, at: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, …]
// the reason why all arrays get access to these methods
// they inherit them from its prototype
console.log(arr.__proto__ === Array.prototype); // true

// prints object.prototype => top of the chain
console.log(arr.__proto__.__proto__);
// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}


// create new method for all arrays, that will inherit it
// lets create unique methof that returns only unique values from array
Array.prototype.unique = function() {
    return [...new Set(this)];
    // it will create set of unique values in the array
};

console.log(arr.unique()); // prints (7) [3, 7, 4, 99, 45, 5, 77]
// don't use to do it, because it is not good practice to extend built in objects

const h1 = document.querySelector('h1');
console.dir(x => x + 1);

// ES6 classes:

// class expression:
// const PersonCl = class {};

// class declaration:
class PersonCl {
    // needs to be called constructor:
    constructor(fullName, birtYear) {
        this.fullName = fullName;
        this.birtYear = birtYear;
    }

    // instance methods:
    // Methods will be added to .prototype property
    calcAge() {
        console.log(new Date().getFullYear() - this.birtYear);
    }

    // no need to add ;
    greet() {
        console.log(`Hey, ${this.fullName}`);
    }

    get age() {
        return new Date().getFullYear() - this.birtYear;
    }

    // set a property that already exists:
    set fullName(name) {
        if(name.includes(' ')) this._fullName = name; 
        // convention to avoid an error of infinite callings
        else alert(`${name} does not contain a space!`);
    }

    get fullName() {
        return this._fullName;
    }

    // static methods
    static hey() {
        console.log('Hey there');
        // console.log(this); // prints whole class
    }
};
// this looks nicer :-)

// lets create instance of this PersonCl class:
const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
console.log(jessica.__proto__ === PersonCl.prototype); // true
// calc age is in .__proto__

// greet function outside, but
// PersonCl.prototype.greet = function () {
//     console.log(`Hey, ${this.firstName}`);
// };
// it is possible, but it is nicer to do it in the class itself :)

jessica.greet(); // Hey, Jessica
// 1. classes are NOT hoisted, we need to define them firstly and then use them
// 2. classes are first-class citizens 
// we can pass the into funtions and return them from functions
// 3. classes are executed in the strict mode

// person get age:
console.log(jessica.age); // prints 27 

// setters and getters:
// are functions that get and set values
const walter = new PersonCl('Walter White', 1990);


// object litteral
const ammount = {
    owner: 'Jonas',
    movements: [200, 202, 54, 150, 300],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    },
};

console.log(ammount.latest);
ammount.latest = 500;
console.log(ammount.movements); // prints [200, 202, 54, 150, 300, 500]

// static methods:
Number.parseFloat(12);
console.log(Array.from(document.querySelectorAll('h1'))); // [h1]
// not working on array, only on Array constructor
// [1, 2, 3].from(); // [1,2,3].from is not a function


Person.hey = function() {
    console.log('Hey there 👋');
    // console.log(this); // entire constructor function
}

Person.hey();

PersonCl.hey();