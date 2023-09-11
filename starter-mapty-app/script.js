'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// geolocation API:
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        // using destructuring here:
        // SAME AS:    position.coords.latitude;
        // SAME AS:
        // const {latitude} = position.coords;
        // const {longitude} = position.coords;
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude);

        // check if google link will open map with my current location:
        console.log(`https://www.google.sk/maps/@${latitude},${longitude}`);
    }, function () {
        alert('Could not get your position');
    });
}