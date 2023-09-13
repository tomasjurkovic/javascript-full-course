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

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords, distance, duration) {
        // this.date = ... (but not needed cuz code above)
        this.coords = coords; // [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }

    click() {}

    _setDescription() {}
}

class Running extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace() {
        // usually min/km
        this.pace = this.duration / this.distance;
        return this.pace; // not needed, called in constructor
    }
}

class Cycling extends Workout {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }

    calcSpeed() {
        // usually km/h
        this.speed = this.distance / this.duration;
        return this.speed; // not needed, called in constructor
    }
}

// check if it works:
// const run1 = new Running([31, -12], 5.2, 24, 179);
// const cycling1 = new Cycling([39, -12], 27, 59, 523);
// console.log(run1, cycling1);

////////////////////////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE:

class App {
    #map;
    #mapEvent;
    constructor() {
        this._getPosition(); 
        // display map while page is loading right at the constructor

        // add event listener for submitting the form:
        form.addEventListener('submit', this._newWorkout.bind(this)); 
        // event handler function
        // there is need to bind it this way to app (using .bind(this))

        inputType.addEventListener('change', this._toggleElevationField);
    }

    // geolocation API:
    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                alert('Could not get your position');
            });
        };
    }
    
    _loadMap(position) {
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

        console.log(this);
        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        // special object with couple of methods:
        // handling clicks on map:
        this.#map.on('click', this._showForm.bind(this));
    }

    _showForm(mapE){
        // defining global variable:
        this.#mapEvent = mapE;
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
    }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e){
        e.preventDefault();
        console.log(this);

        // get data from form

        // check if data is valid

        // if activity running, create the running object

        // if activity cycling, create the cycling object

        // add new object to workout array

        // render workout on map as marker
        const {lat, lng} = this.#mapEvent.latlng;
        const crds = [lat, lng];
        L.marker(crds).addTo(this.#map)
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
        // render workout on list

        // hide form + clear inputs fields:
        inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';
    }
};

// create app object
const app = new App();
// app._getPosition(); // better to do it in the constructor

// accessing global variable from the other.sj script:
// console.log(`I am ${firstName}`); // printed 'Tomas'