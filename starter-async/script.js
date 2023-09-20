'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// XML HTTP Request: old shool way:
const renderCountry = function (data, className = '') {
    // these are the helper functions, because of format of APIs is different
    // I had to calculate the right name, cuz it is flexible
    const getLangFromAPI = function() {
        const languages = data.languages;
        const shortLang = Object.keys(languages)[0];
        return shortLang;   
    }

    const getCurrencyFromAPI = function() {
        const currencies = data.currencies;
        const shortCur = Object.keys(currencies)[0];
        return shortCur;
    }
    
    const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
        <h3 class="country__name">${data.name['common']}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} mil. people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[getLangFromAPI()]}</p>
        <p class="country__row"><span>💰</span>${data.currencies[getCurrencyFromAPI()]['name']}</p>
    </div>
    </article>
    `;
    
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

// const getCountryAndNeighbour = function (country) {
    
//     // AJAX call country 1:
//     const request = new XMLHttpRequest();
//     // request.open('GET', 'https://countries-api-836d.onrender.com/countries/')
//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     request.send();
    
//     request.addEventListener('load', function(){
//         const [data] = JSON.parse(this.responseText);
//         console.log([data]);
        
//         // render country 1:
//         renderCountry(data);

//         const [neighbour] = data.borders;
//         if(!neighbour) return;

//         console.log(neighbour);

//         // AJAX call country 2:
//         const request2 = new XMLHttpRequest();
//         // we can call this API also by country code:
//         request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//         request2.send();

//         // nested callback:
//         request2.addEventListener('load', function () {
//             const [data2] = JSON.parse(this.responseText);
//             console.log([data2]);
            
//             // render country 2:
//             renderCountry(data2, 'neighbour');
//         });
//     });
// };

// // sequence of AJAX Calls:
// getCountryAndNeighbour("portugal");
// getCountryAndNeighbour("slovakia");

// callback hell example
setTimeout(() => {
    console.log('1 second passed');
    setTimeout(() => {
        console.log('2 seconds passed');
        setTimeout(() => {
            console.log('3 seconds passed');
            setTimeout(() => {
                console.log('4 seconds passed');
                setTimeout(() => {
                    console.log('5 seconds passed');
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);

// FETCH API>
// AJAX call country 1:
const request = fetch(`https://restcountries.com/v3.1/name/portugal`);
console.log(request); // we have promise stored in the request variable:
