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
    // countriesContainer.style.opacity = 1;
}

// error rendering:
const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1;
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


// const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v3.1/name/${country}`).then(function (response) {
//        console.log(response); 
//        return response.json();
//     }).then(function (data) {
//         console.log(data);
//         renderCountry(data[0])
//     })
// };

// NOW IT LOOKS CLEANER AND FASTER (woeks same as above)
const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  
      return response.json();
    });
  };

// previous code:
// const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then((response) => {
//             console.log(response);

//             if(!response.ok) 
//                 throw new Error(`Country not found ${response.status}`);

//             return response.json()
//         } /*, err => alert(err) */) // possible to do it that way
//         .then((data) => {
//           renderCountry(data[0]); 
//           const neighbour = data[0].borders[0]

//           if(!neighbour) return;
          
//           return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//         }) 
//         .then((response) => {
//             if(!response.ok) 
//                 throw new Error(`Country not found ${response.status}`);

//             return response.json()
//         })
//         .then((data) => renderCountry(data[0], 'neighbour')) 
//         .catch(err => {
//             console.error(`${err} 💥💥💥`);
//             renderError(`💥 Something went wrong: ${err.message}. Try again!`);
//         })
//         .finally(() => {
//             // this gonna be called always:
//             // not useful always, but it hides f.e. loaded spinner
//             countriesContainer.style.opacity = 1;
//         });
// };

const getCountryData = function (country) {
    // Country 1
    getJSON(
      `https://restcountries.com/v3.1/name/${country}`,
      'Country not found'
    )
      .then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];
  
        if (!neighbour) throw new Error('No neighbour found!');
  
        // Country 2
        return getJSON(
          `https://restcountries.com/v3.1/alpha/${neighbour}`,
          'Country not found'
        );
      })
  
      .then(data => renderCountry(data, 'neighbour'))
      .catch(err => {
        console.error(`${err} 💥💥💥`);
        renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };

btn.addEventListener('click', function () {
    getCountryData('portugal');
});

getCountryData('cuba');