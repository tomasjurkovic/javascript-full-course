'use strict';

// prettier-ignore

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
    clicks = 0;

    constructor(coords, distance, duration) {
        // this.date = ... (but not needed cuz code above)
        this.coords = coords; // [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }

    click() {
        this.clicks++;
    }

    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        this.desciption = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }
}

class Running extends Workout {
    type = 'running';

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription(); // because child classes contain type
    }

    calcPace() {
        // usually min/km
        this.pace = this.duration / this.distance;
        return this.pace; // not needed, called in constructor
    }
}

class Cycling extends Workout {
    type = 'cycling';

    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription(); // because child classes contain type
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
    #workouts = [];
    #mapZoomLevel = 13;

    constructor() {
        // get user position>
        this._getPosition(); 
        // display map while page is loading right at the constructor

        // get data from local storage
        this._getLocalStorage();

        // attach event handlers:
        // add event listener for submitting the form:
        form.addEventListener('submit', this._newWorkout.bind(this)); 
        // event handler function
        // there is need to bind it this way to app (using .bind(this))

        inputType.addEventListener('change', this._toggleElevationField);

        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

        containerWorkouts.addEventListener('dblclick', this._deleteWorkout.bind(this));

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
        // using destructuring here:
        // SAME AS:    position.coords.latitude;
        // SAME AS:
        // const {latitude} = position.coords;
        // const {longitude} = position.coords;
        const {latitude, longitude} = position.coords;
        const coords = [latitude, longitude];

        // check if google link will open map with my current location:
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        // special object with couple of methods:
        // handling clicks on map:
        this.#map.on('click', this._showForm.bind(this));

        // load map has to happen first
        // this is why it has to be not used in _getLocalStorage method
        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work);
        });
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

    _hideForm() {
        // EMPTY THE INPUTS:
        inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';
        
        // ADD hidden class (dirty trick included when displaying):
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e){
        // helper function:
        const validInputs = (...inputs) => 
            inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...inputs) => 
            inputs.every(inp => inp > 0);
        e.preventDefault();

        // get data from form
        const type = inputType.value;
        const distance = +inputDistance.value; // + conver it to number
        const duration = +inputDuration.value; // + conver it to number
        const {lat, lng} = this.#mapEvent.latlng;
        let workout;

        // if activity running, create the running object
        if (type === 'running') {
            const cadence = +inputCadence.value;
            // check if data is valid
            // using guard clause:
            if (
                // !Number.isFinite(distance) || 
                // !Number.isFinite(duration) || 
                // !Number.isFinite(cadence)
                !validInputs(distance, duration, cadence) ||
                !allPositive(distance, cadence, duration)) {
                return alert('Inputs have to be possitive numbers');
            }

            // create running object:
            workout = new Running([lat, lng], distance, duration, cadence);
        }

        // if activity cycling, create the cycling object
        if (type === 'cycling') {
            const elevation = +inputElevation.value;
            // check if data is valid
            if(!allPositive(distance, duration) ||
                !allPositive(distance, duration)) {
                return alert('Inputs have to be possitive numbers')
            }

            // create cycling object:
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        // add new object to workout array
        this.#workouts.push(workout);

        // render workout on map as marker:
        this._renderWorkoutMarker(workout);

        // render workout on list
        this._renderWorkout(workout);

        // hide form + clear inputs fields:
        this._hideForm();

        // set local storage to all workouts>
        this._setLocalStorage();
    }

    _renderWorkoutMarker(workout) {
        // render workout on map as marker
        L.marker(workout.coords).addTo(this.#map)
        .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            })
        )
        .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.desciption}`)
        .openPopup(); 
    }

    _renderWorkout(workout) {
        let html = `        
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.desciption}</h2>
        <div class="workout__details">
          <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>`;

        if (workout.type === 'running') 
            html += `
              <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
              </div>
            </li>
            `;
        

        if (workout.type === 'cycling') 
            html += `
              <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
              </div>
            </li>
            `;
        
        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');

        // guard clause>
        if(!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1
            }
        });

        // using public interface:
        // workout.click();
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts')); 
        // JSON.parse is opposite of JSON.stringify()

        // guard clause:
        if(!data) return;
        
        // restore back the data:
        this.#workouts = data;

        this.#workouts.forEach(work => {
            this._renderWorkout(work);
        });
    }

    // this is possible to remove workouts from local storage
    reset() {
        localStorage.removeItem('workouts');
        location.reload();
    }

    // MORE FUNCTIONALITY:
    _deleteWorkout(e) {
        let workout
        const workoutEl = e.target.closest('.workout');
        console.log('DBLCLICK');
        // guard clause>
        if(!workoutEl) return;

        this.#workouts.pop(workoutEl);

        // delete workout on UI
        workoutEl.remove();
        console.log(workoutEl.coords);
        console.log(workout.coords);

        // delete workout marker
        // const workoutPosition = this.#workouts.id;
        // console.log(this.#workouts.filter(el => el.id === workout.id));
        // console.log(workoutPosition);
        // this.#workouts.pop(workoutPosition);
    }
};

// create app object
const app = new App();
// app._getPosition(); // better to do it in the constructor

// accessing global variable from the other.sj script:
// console.log(`I am ${firstName}`); // printed 'Tomas'