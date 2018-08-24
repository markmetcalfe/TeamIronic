exports.numbers = function(){

  let numbers = [];

  for(let i = 0; i < 10; i++){

    numbers.push(i);

    console.log(numbers.join(' '));
  }
}