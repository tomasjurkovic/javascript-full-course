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
let map, mapEvent;

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
        const coords = [latitude, longitude];
        console.log(latitude, longitude);

        // check if google link will open map with my current location:
        console.log(`https://www.google.sk/maps/@${latitude},${longitude}`);

        map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // special object with couple of methods:
        // handling clicks on map:
        map.on('click', function(mapE) {
            console.log(mapE);

            // defining global variable:
            mapEvent = mapE;
            // removing class hidden from the form after clicking
            form.classList.remove('hidden');
            // focusing on next form input (better user experience)
            inputDistance.focus();

            // const {lat, lng} = mapEvent.latlng;
            // const crds = [lat, lng];
            // L.marker(crds).addTo(map)
            //     .bindPopup(L.popup({
            //         maxWidth: 250,
            //         minWidth: 100,
            //         autoClose: false,
            //         closeOnClick: false,
            //         className: 'running-popup'
            //         })
            //     )
            //     .setPopupContent('Workout')
            //     .openPopup();
        })
    }, function () {
        alert('Could not get your position');
    });
};

// accessing global variable from the other.sj script:
// console.log(`I am ${firstName}`); // printed 'Tomas'

// add event listener for submitting the form:
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // clear inputs fields:
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';
    const {lat, lng} = mapEvent.latlng;
    const crds = [lat, lng];
        L.marker(crds).addTo(map)
        .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup'
            })
        )
        .setPopupContent('Workout')
        .openPopup();
});

inputType.addEventListener('change', function() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})