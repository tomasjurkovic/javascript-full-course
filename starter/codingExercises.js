/*
Coding Challenge #1
Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).
Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.
Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall.
*/

// DATA SET 1:
/*
const weightMark = 78;
const heightMark = 1.69
const bmiMark = weightMark / heightMark ** 2

const weightJohn = 92;
const heightJohn = 1.95
const bmiJohn = weightJohn / heightJohn ** 2

const markHigherBMI = bmiMark > bmiJohn;

console.log(markHigherBMI)

// DATA SET 2:
const weightMark2 = 95;
const heightMark2 = 1.88
const bmiMark2 = weightMark2 / heightMark2 ** 2

const weightJohn2 = 85;
const heightJohn2 = 1.76
const bmiJohn2 = weightJohn2 / heightJohn2 ** 2

const markHigherBMI2 = bmiMark2 > bmiJohn2;

console.log(markHigherBMI2)
*/

// CODING challenge 2:
/* 
Use the BMI example from Challenge #1, and the code you already wrote, and
improve it.
Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"
*/

const weightMark = 78;
const heightMark = 1.69
const bmiMark = weightMark / heightMark ** 2

const weightJohn = 92;
const heightJohn = 1.95
const bmiJohn = weightJohn / heightJohn ** 2

if (bmiJohn < bmiMark) {
    console.log(`"Mark's BMI (${bmiMark}) is higher than John's (${bmiJohn})!`);
} else if (bmiJohn === bmiMark) {
    console.log(`"Mark's BMI (${bmiMark}) is equal to John's (${bmiJohn})!`);
} else {
    console.log(`"Mark's BMI (${bmiMark}) is lower than John's (${bmiJohn})!`);
}