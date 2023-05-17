'use-strict'

// Coding Challenge #1
// We're building a football betting app (soccer for my American friends �)!
// Suppose we get data from a web service about a certain game ('game' variable on
// next page). In this challenge we're gonna work with that data.
// Your tasks:
// 1. Create one player array for each team (variables 'players1' and
// 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field
// players. For Bayern Munich (team 1) create one variable ('gk') with the
// goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
// field players
// 3. Create an array 'allPlayers' containing all players of both teams (22
// players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
// new array ('players1Final') containing all the original team1 players plus
// 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called
// 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player
// names (not an array) and prints each of them to the console, along with the
// number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which
// team is more likely to win, without using an if/else statement or the ternary
// operator.
// Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
// Then, call the function again with players from game.scored

// STEP 1:

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
        ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnabry', 'Lewandowski',
    'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 21.33,
        x: 3.25,
        team2: 6.5,
    },
    printGoals: function (playerName) {
        
    }
};

// step 1:
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

// step 2: 
const [gk1, ...fieldPlayers1] = players1;
const [gk2, ...fieldPlayers2] = players2;

console.log(gk1, fieldPlayers1);
console.log(gk2, fieldPlayers2);

// step 3:
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// step 4:
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// optional
const players2Final = [...players2, 'Reus', 'Bellingham', 'Can'];
console.log(players1Final);
console.log(players2Final);

// step 5:
const {odds: 
    {team1, x: draw, team2},
} = game;
// const { team1, x, team2 } = game.odds;
// const draw = x;
console.log(team1); 
console.log(draw); 
console.log(team2); 

// step 6:
const printGoals = function (...players) {
    console.log(`${players.length} goals were scored`);
    for (let i = 0; i < players.length; i++) {
        console.log(players[i]);
    }
};

printGoals('Davies', 'Muller', 'Levandowski', 'Kimmich');
printGoals('Davies', 'Muller');
printGoals(...game.scored);

// step 7:
team1 < team2 && console.log('Team 1 is more likely to win.');
team1 > team2 && console.log('Team  is more likely to win.');


// CHALLENGE 2:

// Let's continue with our football betting app! Keep using the 'game' variable from 
// before.
// Your tasks:
// 1. Loop over the game.scored array and print each player name to the console, 
// along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already 
// studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them 
// (except for "draw"). Hint: Note how the odds and the game objects have the 
// same property names �
// 4. Bonus: Create an object called 'scorers' which contains the names of the 
// players who scored as properties, and the number of goals as the value. In this 
// game, it will look like this:
// {
//  Gnarby: 1,
//  Hummels: 1,
//  Lewandowski: 2
// }


// step 1:
let index = 1;
for (const goalscorer of game.scored) { 
    console.log(`Goal ${index}: ${goalscorer}`);
    index++;
}

// step 2:

const oddsValues = Object.values(game.odds);
let average = 0;
console.log(oddsValues);
for (let value of oddsValues) {
    average += value;
}

// values are: [21.33, 3.25, 6.5]
// printed is: 10.36
console.log(average/oddsValues.length);

// step 3:
const teamOdds = Object.entries(game.odds);
console.log(game.odds);


for (const [team, odd] of teamOdds) {
    const teamName = game[team]; 
    // using bracket notation to accessing object properties
    const message = team === 'x' ? 'draw' : `victory ${teamName}`;
    // using ternary operation to validate if team === 'x', 
    // if yes I'm replacing it with draw if no i'm using victory ${teamName}
    console.log(`Odd of ${message}: ${odd}`);
}

// step 4:
const scorers = {
    Gnabry: 1,
    Hummels: 1,
    Levandowski: 2, 
}

const arrayScorers = ['Gnabry', 'Lewandowski', 'Hummels', 'Lewandowski']

// for array we use array.entries():
for (const [i, scorer] of arrayScorers.entries()) {
    console.log(i, scorer);
}

// for objects we use Object.entries(objectName)
for (const [scorer, numberOfGoals] of Object.entries(scorers)) {
    console.log(scorer, numberOfGoals);
}

// STEP 1 Jonas:
for (const [i, player] of game.scored.entries()) {
    console.log(`Goal ${i + 1}: ${player}`);
}

console.log(game.scored.entries());

// STEP 2:
const odds = Object.values(game.odds);
let avrg = 0;
for (const odd of odds) {
    avrg += odd;
}

avrg /= odds.length;
console.log(avrg);

// STEP 4:

const scorers2 = {};
for (const player of game.scored) {
  scorers2[player] ? scorers2[player]++ : (scorers2[player] = 1);
}

console.log(scorers2); // prints: {Lewandowski: 2, Gnabry: 1, Hummels: 1}

// Coding challenge #3:
// Let's continue with our football betting app! This time, we have a map called 
// 'gameEvents' (see below) with a log of the events that happened during the 
// game. The values are the events themselves, and the keys are the minutes in which 
// each event happened (a football game has 90 minutes plus some extra time).
// Your tasks:
// 1. Create an array 'events' of the different game events that happened (no 
// duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64 
// was unfair. So remove this event from the game events log.
// 3. Compute and log the following string to the console: "An event happened, on 
// average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over 'gameEvents' and log each element to the console, marking 
// whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽ GOAL
// GOOD LUCK �

 const gameEvents = new Map([
 [17, '⚽ GOAL'],
 [36, '� Substitution'],
 [47, '⚽ GOAL'],
 [61, '� Substitution'],
 [64, '� Yellow card'],
 [69, '� Red card'],
 [70, '� Substitution'],
 [72, '� Substitution'],
 [76, '⚽ GOAL'],
 [80, '⚽ GOAL'],
 [92, '� Yellow card'],
 ]);
 
 // task 1:
 const events = new Set(gameEvents.values());
 console.log(events); 
 // I converted this to set, so I got only the unique values with no duplicates
 // it prints: {'⚽ GOAL', '� Substitution', '� Yellow card', '� Red card'}

// this was just a set, I forgot to create an array:
const events2 = [...new Set(gameEvents.values())];
console.log(events2);
// now it prints an array:
// ['⚽ GOAL', '� Substitution', '� Yellow card', '� Red card']

 // task 2:
 // I remove the yellow card from 64 minute by using this 'delete' method
 gameEvents.delete(64);
 console.log(gameEvents);
 // it returns map without the 64 key-value pair: 
 // {17 => '⚽ GOAL', 36 => '� Substitution', 47 => '⚽ GOAL', 61 => '� Substitution', 69 => '� Red card', …}

 // task 3:
let averageEvent = 0;
 for (const minute of gameEvents.keys()) {
    averageEvent += minute;
 }

 const msg = `An event happened, on average, every ${Math.round(averageEvent/90)} minutes`;
 console.log(msg);
 // prints: An event happened, on average, every 7 minutes

 // Jonas's solution:
 const time = [...gameEvents.keys()].pop(); 
 // it returns element that was cut from the array
 console.log(`An event happened, on average, every ${time/gameEvents.size} minutes`);
// prints An event happened, on average, every 9.2 minutes

 // task 4: 
for (const [minute, event] of gameEvents.entries()) {
    const half = minute <= 45 ? `[FIRST HALF]` : `[SECOND HALF]`;
    console.log(`${half} ${minute}: ${event}`);
};
// prints all events in style like this:
// [FIRST HALF] 17: ⚽ GOAL

// CODING CHALLENGE 4:
// Write a program that receives a list of variable names written in underscore_case 
// and convert them to camelCase.
// The input will come from a textarea inserted into the DOM (see code below to 
// insert the elements), and conversion will happen when the button is pressed.
// Test data (pasted to textarea, including spaces):
// underscore_case
// first_name
// Some_Variable 
//  calculate_AGE
// delayed_departure
// Should produce this output (5 separate console.log outputs):
// underscoreCase ✅
// firstName ✅✅
// someVariable ✅✅✅
// calculateAge ✅✅✅✅
// delayedDeparture ✅✅✅✅✅
// Hints:
// § Remember which character defines a new line in the textarea �
// § The solution only needs to work for a variable made out of 2 words, like a_b
// § Start without worrying about the ✅. Tackle that only after you have the variable 
// name conversion working �
// § This challenge is difficult on purpose, so start watching the solution in case 
// you're stuck. Then pause and continue!
// Afterwards, test with your own test data

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));



const textAreaElementTextContent = document.querySelector('textarea').value;
console.log(textAreaElementTextContent);

const btn1 = document.querySelector('button'); 

btn1.addEventListener('click', function() {
    const text = document.querySelector('textarea').value;
    const splitText = text.split('\n');
    let iterator = 1; 
    for (const word of splitText) {
        const lowerReplaced = word.trim().toLowerCase().replace('_', ' ');
        const part1 = lowerReplaced.slice(0, lowerReplaced.indexOf(' '));
        const part2 = lowerReplaced.slice(lowerReplaced.indexOf(' '));
        const part2UpperCase = part2.trim().slice(0, 1).toUpperCase() + part2.trim().slice(1);
        console.log(part1 + part2UpperCase + ' ' + '✅'.repeat(iterator));
        iterator++;
    }
})