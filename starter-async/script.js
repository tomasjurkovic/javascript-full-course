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
// setTimeout(() => {
//     console.log('1 second passed');
//     setTimeout(() => {
//         console.log('2 seconds passed');
//         setTimeout(() => {
//             console.log('3 seconds passed');
//             setTimeout(() => {
//                 console.log('4 seconds passed');
//                 setTimeout(() => {
//                     console.log('5 seconds passed');
//                 }, 1000);
//             }, 1000);
//         }, 1000);
//     }, 1000);
// }, 1000);

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
    })
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
        // renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
};

// btn.addEventListener('click', function () {
//     getCountryData('portugal');
// });

// getCountryData('cuba');

// coding challenge 1:
/* 
Coding Challenge #1
In this challenge you will build a function 'whereAmI' which renders a country 
only based on GPS coordinates. For that, you will use a second API to geocode 
coordinates. So in this challenge, you’ll use an API on your own for the first time �
Your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') 
and a longitude value ('lng') (these are GPS coordinates, examples are in test 
data below).
2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means 
to convert coordinates to a meaningful location, like a city and country name. 
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call 
will be done to a URL with this format: 
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and 
promises to get the data. Do not use the 'getJSON' function we created, that 
is cheating �
3. Once you have the data, take a look at it in the console to see all the attributes 
that you received about the provided location. Then, using this data, log a 
message like this to the console: “You are in Berlin, Germany”
4. Chain a .catch method to the end of the promise chain and log errors to the 
console
5. This API allows you to make only 3 requests per second. If you reload fast, you 
will get this error with code 403. This is an error with the request. Remember, 
fetch() does not reject the promise in this case. So create an error to reject 
the promise yourself, with a meaningful error message
PART 2
6. Now it's time to use the received data to render a country. So take the relevant 
attribute from the geocoding API result, and plug it into the countries API that 
we have been using.
7. Render the country and catch any errors, just like we have done in the last 
lecture (you can even copy this code, no need to type the same code)
The Complete JavaScript Course 31
Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474
*/

// const whereAmI = function name(lat, lng) {
//     getJSON(
//         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=58ffa65367f94f82b05ff64146e5a386`,
//         'Country not found'
//     ).then(data => {
//         const matchedCountry = data.features[0].properties.country;
//         const matchedCity = data.features[0].properties.city;
//         console.log(`You are in ${matchedCity}, ${matchedCountry}`);

//         // render country that is recieved back
//         getCountryData(matchedCountry);
//     }).catch(err => {
//         console.error(`${err} 💥💥💥`);
//         renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
// }

// jonas inspired solulion without getJSON
const whereAmI = function name(lat, lng) {
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=58ffa65367f94f82b05ff64146e5a386`)
    .then(res => {
        if(!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
        return res.json();
    }).then(data => {
        console.log(data);
        const matchedCountry = data.features[0].properties.country;
        const matchedCity = data.features[0].properties.city;
        console.log(`You are in ${matchedCity}, ${matchedCountry}`);

        // render country that is recieved back
        getCountryData(matchedCountry);
    }).catch(err => {
        console.error(`${err} 💥💥💥`);
        renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
}

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
// whereAmI(48.71395, 21.25808);

// EVENT LOOP:
console.log('Test start'); 
setTimeout(() => console.log('0 sec timer'), 0); 
Promise.resolve('Resolved promise 1').then(res => console.log(res)); 
Promise.resolve('Resolved promise 2').then(res => {
    // just this microtask takes long time
    for (let i = 0; i < 111111111; i++) {};
    console.log(res);
});
console.log("Test end"); 
// 1, 5, 3, 4, 2 order
// top level code goes first
// promise and timout goes after it / both in callback queues
// callback of the resolved promise will go to microtask queue
// it means it has priority over basic callback queue

// Building new Promise:
// it takes just one argument - executor function
// executor funtion has 2 params / resolve and reject
const lotteryPromise = new Promise(function(resolve, reject) {  
    console.log('Lottery draw is happening 🔮');
    setTimeout(function() {
        if(Math.random() >= 0.5) {
            resolve("You WIN 🏆");
        } else {
            reject(new Error("You lost your money 💩")); // nice to create new error object here
        }
    }, 2500); 
});

// consuming promise
// needs to call it, then method what to do with the result  
// and catch if it is rejected
lotteryPromise.then(res => console.log(res))
    .catch(err => console.error(err));

// promisifing setTimeout function
// const wait = function (seconds) {
//     return new Promise(function(resolve) {
//         setTimeout(resolve, seconds * 1000);
//     });
// };

// arrow function:
const wait = function (seconds) {
    return new Promise((resolve) =>
        setTimeout(resolve, seconds * 1000));
};

wait(2).then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
}).then(() => console.log('I waited one more second'));

// callback hell example refactored: previous code
// setTimeout(() => {
//     console.log('1 second passed');
//     setTimeout(() => {
//         console.log('2 seconds passed');
//         setTimeout(() => {
//             console.log('3 seconds passed');
//             setTimeout(() => {
//                 console.log('4 seconds passed');
//                 setTimeout(() => {
//                     console.log('5 seconds passed');
//                 }, 1000);
//             }, 1000);
//         }, 1000);
//     }, 1000);
// }, 1000);

// instead of callback hell:
wait(1).then(() => {
    console.log('1 second passed');
    return wait(1);
}).then(() => {
    console.log('2 seconds passed');
    return wait(1);
}).then(() => {
    console.log('3 seconds passed');
    return wait(1);
}).then(() => {
    console.log('4 seconds passed');
    return wait(1);
}).then(() => {
    console.log('5 seconds passed');
    return wait(1);
});

// for (let i = 1; i <= 5; i++) {
//     wait(1).then(() => {
//         console.log(`${i} second${i >= 2 ? 's' : ''} passed`);
//         return wait(1);
//     });    
// }

// create fulfilled promise imidiately:
Promise.resolve('example success').then(x => console.log(x));
// create rejected promise imidiately:
Promise.reject('example reject').catch(x => console.error(x));

// promisifying geolocation function API:

// navigator.geolocation.getCurrentPosition(
//     position => console.log(position),
//     err => console.log(err)
// );

const getPosition = function() {
    return new Promise(function (resolve, reject) {
        // simple way:
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     err => reject((err))
        // );
        // one line code:
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

getPosition().then(pos => console.log(pos))
    .catch(err => console.error(err));


// reversegeolocation:

const whereAmIPromise = function () {

    getPosition().then(pos => {
        console.log(pos.coords);
        const {latitude: lat, longitude: lng} = pos.coords;
        return fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=58ffa65367f94f82b05ff64146e5a386`)
    }).then(res => {
        if(!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
        return res.json();
    }).then(data => {
        console.log(data);
        const matchedCountry = data.features[0].properties.country;
        const matchedCity = data.features[0].properties.city;
        console.log(`You are in ${matchedCity}, ${matchedCountry}`);
        
        // render country that is recieved back
        getCountryData(matchedCountry);
    }).catch(err => {
        console.error(`${err} 💥💥💥`);
        renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
}
    
btn.addEventListener('click', whereAmIPromise);

// ASYNC AWAIT
// just add acync after function name and =
// inside async funtion we can have one or more await statement
const  whereAmIAsync = async function () {
    try {
        // Geolocation:
        const pos = await getPosition()
        const { latitude: lat, longitude: lng } = pos.coords;
    
        // reverse GeoCoding:
        const resGeo = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=58ffa65367f94f82b05ff64146e5a386`);
        const dataGeo = await resGeo.json();
        if (!resGeo.ok) throw new Error('Problem getting location data');
        const country = await dataGeo.features[0].properties.country.toLowerCase()

        // country data>
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        if (!res.ok) throw new Error('Problem getting country data');
        const data = await res.json();

    
        // should be working with
        renderCountry(data[0]);
        renderCountry('whewikwiwwiiw')
        // same like this what we do before, but nicer and cleaner, no callback hell:
        // fetch(`https://restcountries.com/v3.1/name/${country}`)
        //     .then(res => console.log(res));
    } catch (err) {
        renderError(`${err.message}`)
        console.error(err.message);
    }
}

whereAmIAsync();
console.log('FIRST');

// TRY CATCH block:
// try {
//     // simulate this scenario, where I reassign const x which is not allowed
//     let y = 1;
//     const x =2
//     x =3
// } catch (err) {
//     alert(err.message)
//     // prints Assignment to constant variable.
// }