// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const x = 23;

if (x === 23) {
	console.log('x = 23');
}
const calcAge = birthyear => 2023 - birthyear;

console.log(calcAge(1980));

// find out temperature amplitude:
const temperatures = [3, -20, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
const temperatures2 = [-77, -44, -47, -50, 'no result', -78, -90];
const temperatures3 = [15, -23, -10, -15, 'no result', -7, -9];
const temperatures4 = [-7, -4, -10, -25, 'no result', -10, 12, 15];

// for (let index = 0; index < temperatures.length; index++) {
// 	console.log(typeof temperatures[index]);
// }

// function getAplitude(temps) {
// 	for (
// 		let index = 0;
// 		index < temps.length;
// 		index++ // 	maxT = temps[index];
// 	) // if (temps[index] > maxT) {
// 	// 	console.log(maxT);
// 	// }
// 	{
// 		let temperature = temperatures[index];
// 		if (typeof temperature === 'number') {
// 			console.log('number found');
// 		}
// 	}
// }

function calcTempAmplitude(temps1, temps2) {
	const temps = temps1.concat(temps2);
	let maxT = temps[0];
	let minT = temps[0];

	for (let index = 0; index < temps.length; index++) {
		let currentTemp = temps[index];
		if (typeof currentTemp !== 'number') continue;
		if (currentTemp > maxT) maxT = currentTemp;
		if (currentTemp < minT) minT = currentTemp;
	}
	if (minT < 0 && maxT < 0) {
		minT *= -1;
		maxT *= -1;
		return minT - maxT;
	} else {
		return maxT - minT;
	}
}

const amplitude = calcTempAmplitude(temperatures, temperatures2);
const amplitude2 = calcTempAmplitude(temperatures3, temperatures4);

console.log(`First amplitude is: ${amplitude}, 
The second amplitude is: ${amplitude2}`);

// debugging:

const measureKelvin = function () {
	const measurement = {
		type: 'temp',
		unit: 'celsius',
		// fix with Number()
		value: Number(prompt('Degrees celsius:')),
	};

	// debug:
	// debugger; // to open sources in browser and stops the code there
	console.log(typeof measurement.value);
	console.log(measurement);
	console.table(measurement);

	const kelvin = measurement.value + 273;
	return kelvin;
};

// identify a bug:
console.log(measureKelvin());
