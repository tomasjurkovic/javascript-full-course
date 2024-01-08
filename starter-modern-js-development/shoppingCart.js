// Exporting module
console.log('Exporting module');

// blocking code:
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching');
// top level await really can block execution of code in the different modules

const shippingCode = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product}${quantity >= 2 ? 's' : ''} added to cart`
  );
};

const totalPrice = 237;
const totalQuantity = 23;

// possible to rename exported values using as keyword
export { totalPrice, totalQuantity as qt };

// here I export default the same function but without any name. it can be imported
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product}${quantity >= 2 ? 's' : ''} added to cart`
  );
}
