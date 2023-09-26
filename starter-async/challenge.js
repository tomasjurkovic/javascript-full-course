'use strict';

/* Coding Challenge #2
For this challenge you will actually have to watch the video! Then, build the image 
loading functionality that I just showed you on the screen.
Your tasks:
Tasks are not super-descriptive this time, so that you can figure out some stuff by 
yourself. Pretend you're working on your own �
PART 1
1. Create a function 'createImage' which receives 'imgPath' as an input. 
This function returns a promise which creates a new image (use 
document.createElement('img')) and sets the .src attribute to the 
provided image path
2. When the image is done loading, append it to the DOM element with the 
'images' class, and resolve the promise. The fulfilled value should be the 
image element itself. In case there is an error loading the image (listen for 
the'error' event), reject the promise
3. If this part is too tricky for you, just watch the first part of the solution
PART 2
4. Consume the promise using .then and also add an error handler
5. After the image has loaded, pause execution for 2 seconds using the 'wait'
function we created earlier
6. After the 2 seconds have passed, hide the current image (set display CSS 
property to 'none'), and load a second image (Hint: Use the image element 
returned by the 'createImage' promise to hide the current image. You will 
need a global variable for that �)
7. After the second image has loaded, pause execution for 2 seconds again
8. After the 2 seconds have passed, hide the current image
Test data: Images in the img folder. Test the error handler by passing a wrong 
image path. Set the network speed to “Fast 3G” in the dev tools Network tab, 
otherwise images load too fast
GOOD LUCK � */
const imgContainer = document.querySelector('.images')

// arrow function:
const wait = function (seconds) {
    return new Promise((resolve) =>
        setTimeout(resolve, seconds * 1000));
};

// wait(2).then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
// }).then(() => console.log('I waited one more second'));

// part one:
const createImage = function(imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', function () {
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', function() {
            reject(new Error('Image not found'));
        });
    });

};

let currentImage;

// createImage('img/img-1.jpg')
//     .then(img => {
//         currentImage = img;
//         console.log('Image 1 loaded');
//         return wait(2);
//     }).then(() => {
//         currentImage.style.display = 'none';
//         return createImage('img/img-2.jpg');
//     }).then(img => {
//         currentImage = img;
//         console.log('Image 2 loaded');
//         return wait(2);
//     }).then(() => {
//         currentImage.style.display = 'none';
//     })
//     .catch(err => console.error(err));

// PART 1:

const loadNPause = async function (imgPath1, imgPath2) {
    try {
        // load img 1
        let img = await createImage(imgPath1);
        console.log('Image 1 loaded');
        await wait(2);
        img.style.display = 'none';
        
        // load img 2
        img = await createImage(imgPath2);
        console.log('Image 2 loaded');
        await wait(2);
        img.style.display = 'none';
    } catch (err) {
        console.error(err);
    }
};

// loadNPause('img/img-1.jpg', 'img/img-2.jpg');

/* Coding Challenge #3
Your tasks:
PART 1
1. Write an async function 'loadNPause' that recreates Challenge #2, this time 
using async/await (only the part where the promise is consumed, reuse the 
'createImage' function from before)
2. Compare the two versions, think about the big differences, and see which one 
you like more
3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
in the dev tools Network tab
PART 2
1. Create an async function 'loadAll' that receives an array of image paths 
'imgArr'
2. Use .map to loop over the array, to load all the images with the 
'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array �
5. Add the 'parallel' class to all the images (it has some CSS styles)
Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img3.jpg']. To test, turn off the 'loadNPause' function */

// part 2:
const loadAll = async function (imgArr) {
    try {
        const imgs = imgArr.map(async img => await createImage(img));
        console.log(imgs);
        // displays just 3 promises [Promise, Promise, Promise]

        // add promise.all to resolve them all:
        const imgsEl = await Promise.all(imgs);
        console.log(imgsEl);
        // prints 3 img elements now [img, img, img]

        // adding parallel class to each img element
        imgsEl.forEach(imgEl => imgEl.classList.add('parallel'));
    } catch (error) {
        console.error(err);
    }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

// const data = await Promise.all([
//     getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//     getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//     getJSON(`https://restcountries.com/v3.1/name/${c3}`),
// ])
// console.log(data1.capital, data2.capital, data3.capital);
// console.log(data.map(d => d[0].capital));
// } catch (error) {
// console.error(err);
// }