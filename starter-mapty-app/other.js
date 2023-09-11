const firstName = 'Tomas';

// this does not have access to script.js because of its order
// other is first in html, script.js is below and it was not loaded yet
console.log(latitude); // won't print anything since it has no access to it