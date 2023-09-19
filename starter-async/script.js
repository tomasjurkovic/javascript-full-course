'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// XML HTTP Request: old shool way:
const getCountryData = function (country) {
    
    const request = new XMLHttpRequest();
    // request.open('GET', 'https://countries-api-836d.onrender.com/countries/')
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();
    
    request.addEventListener('load', function(){
        const [data] = JSON.parse(this.responseText);
        console.log([data]);

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
        <article class="country">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h3 class="country__name">${data.name['common']}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[getLangFromAPI()]}</p>
            <p class="country__row"><span>💰</span>${data.currencies[getCurrencyFromAPI()]['name']}</p>
        </div>
        </article>
        `;
        
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
    });
};
getCountryData("portugal");
getCountryData("slovakia");
getCountryData("israel");
getCountryData('usa');
