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
// const lastPost2 = await getLastPost();
// console.log(lastPost2);
// returns nice object like this:
/* {title: 'at nam consequatur ea labore ea harum', text: 'cupiditate quo est a modi nesciunt soluta\nipsa vol…nam et distinctio eum\naccusamus ratione error aut'} */

// module pattern which was used before:
// main goal of module patter is encapsulate functionality to have private data and to expose public api
const ShoppingCart2 = (function () {
  const cart = [];
  const shoppingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product}${
        quantity >= 2 ? 's' : ''
      } added to cart. Shipping costs: ${shoppingCost}`
    );
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product}${quantity >= 2 ? 's' : ''} ordered from supplier`
    );
  };

  // return all I wanted to expose to the outside
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('gluten-free pizza', 2);
console.log(ShoppingCart2); // it prints whole object
console.log(ShoppingCart2.shoppingCost); // prints undefined / I did no returned it (not publicly accessed)
// but I can access it in function inside the whole module and display it in console like it is done in line: 72
console.log(ShoppingCart2.totalPrice); // prints 237 / I returned it

// importing from node_modules:
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'tomato', quantity: 2 },
    { product: 'pizza', quantity: 3 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(state);
console.log(stateClone);
console.log(stateDeepClone);
