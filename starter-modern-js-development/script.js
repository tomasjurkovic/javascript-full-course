// Importing module

// one way: importing only some parts:
// import {
//   addToCart, // it needs to have same names as exported
//   totalPrice as price, // changing names of existing imported variables
//   ts,
// } from './shoppingCart.js';

// addToCart('gluten-free bread', 5);
// console.log(totalPrice, ts);

// another way: importing everything as a 'class' at once:
// import * as ShoppingCart from './shoppingCart.js';
// console.log('Importing module');
// ShoppingCart.addToCart('vegan yoghurt', 1);
// console.log(ShoppingCart.totalPrice);

// third way: import default exported value
import thisIsDefaultlyExportedFunctionAddToCart, {
  cart,
} from './shoppingCart.js';
thisIsDefaultlyExportedFunctionAddToCart('gluten-free pizza', 2);
thisIsDefaultlyExportedFunctionAddToCart('gluten-free bread', 1);
thisIsDefaultlyExportedFunctionAddToCart('vegan cheese', 5);

console.log(cart);
// prints real items in the cart:
/*
{product: 'gluten-free pizza', quantity: 2}
{product: 'gluten-free bread', quantity: 1}
{product: 'vegan cheese', quantity: 5}
*/

// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

const getLastPost = async function name(params) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost); // returns promise

// not very clean way how to resolve this promise
// lastPost.then(last => console.log(last));

// but await can be used to handle this above:
const lastPost2 = await getLastPost();
console.log(lastPost2);
// returns nice object like this:
/* {title: 'at nam consequatur ea labore ea harum', text: 'cupiditate quo est a modi nesciunt soluta\nipsa vol…nam et distinctio eum\naccusamus ratione error aut'} */
