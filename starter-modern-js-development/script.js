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
