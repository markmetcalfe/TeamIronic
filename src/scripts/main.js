const numbers = require('./numbers');

function main(){
  console.log("loaded");

  document.getElementById('marge').src = 'assets/marge.png';

  numbers.numbers();
}

document.addEventListener("DOMContentLoaded", main);