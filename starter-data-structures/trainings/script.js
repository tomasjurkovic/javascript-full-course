'use strict';

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    repeatingArray: ["one", "two", 'one', 'three', 'one', 'three', 'four', 'three', 'one', 'two'],
    capacity: {
        interior: 55,
        balcony: 10,
        saloon: 25,
        underground: 30,
    },
    openingHours: {
      thu: {
        open: 12,
        close: 22,
      },
      fri: {
        open: 11,
        close: 23,
      },
      sat: {
        open: 0, // Open 24 hours
        close: 24,
      },
    },
    order: function (starerIndex, mainIndex) {
      return [this.starterMenu[starerIndex], this.mainMenu[mainIndex]];
    },
    orderDelivery: function ({
      starerIndex = 1,
      mainIndex = 0,
      time = '20:00',
      address = 'Kosice',
    }) {
      console.log(
        `Order recieved! ${this.starterMenu[starerIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
      );
    },
    orderPasta: function (ing1, ing2, ing3) {
      console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
    },
  
    orderPizza: function (mainIngredient, ...ohterIngredients) {
      console.log(mainIngredient);
      console.log(ohterIngredients);
    },
  };

// creating one array with joining two arrays:
const allMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];

console.log(allMenu);

// creating variables from object including changing of the some's names:
const { capacity: 
    {interior, balcony, saloon: vipSection, underground} 
} = restaurant;

console.log(vipSection);

const allCategories = [...restaurant.categories, 'vegan', 'american', 'mexican', 'asian', 'gluten-free'];

console.log(allCategories);

const printRepeated = function (...items) {
    console.log(`${items.length} same items is included in the array`);
};

printRepeated('ara', 'jira', 'ara', 'jira');