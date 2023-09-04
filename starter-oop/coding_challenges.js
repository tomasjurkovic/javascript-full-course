'use strict';

// coding challenge 1:
/* Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 
'speed' property. The 'speed' property is the current speed of the car in 
km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10, 
and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log 
the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and 
'brake' multiple times on each of them
Test data:
§ Data car 1: 'bmw' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h */

// 1
const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
};

// 2
Car.prototype.accelerate = function() {
    this.speed += 10;
    console.log(`The ${this.make}'s speed is: ${this.speed}`);
};

// 3
Car.prototype.brake = function() {
    this.speed -= 5;
    console.log(`The ${this.make}'s speed is: ${this.speed}`);
};

const bmw = new Car('BMW', 120);
console.log(bmw);

const mercedes = new Car('Mercedes', 95); 
console.log(mercedes);

bmw.brake();
bmw.accelerate();
bmw.brake();
bmw.accelerate();
bmw.accelerate();

mercedes.brake();
mercedes.brake();
mercedes.brake();
mercedes.brake();
mercedes.accelerate();
mercedes.brake();
mercedes.brake();
mercedes.accelerate();
mercedes.brake();

/* 
Coding Challenge #2
Your tasks:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide 
by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but 
converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter.
Test data:
§ Data car 1: 'Ford' going at 120 km/h
*/

// 1:
class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`The ${this.make}'s speed is: ${this.speed}`);
    }

    brake() {
        this.speed -= 5;
        console.log(`The ${this.make}'s speed is: ${this.speed}`);
    }

    // 2:
    get speedUS() {
        return this.speed / 1.6;
    }

    // 3:
    set speedUS(speed) {
        this._speed = (speed * 1.6);
    }
};

const ford = new CarCl('Ford', 120);
ford.accelerate();
ford.brake();
ford.speedUS = 120;
console.log(ford);
console.log(ford.speedUS);