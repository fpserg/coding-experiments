const play3 = document.getElementById('play3');
play3.addEventListener('click', playThree);

function playThree(){

var rounds = Number(prompt(`How many simulations would you like to run?`));

var doorCount = Number(prompt(`How many doors are there in the simulation?`));

var switchDoor = confirm(`Will you be switching your initial choice?`);

var j = 0;

// set variable for counting wins
var winCount = 0;
// set variable for counting losses
var lossCount = 0;

for (j; j<rounds; j++){

//set the car behind a random door
const doorCar = Math.ceil(doorCount*Math.random());
//set the player choice as random
var doorChosen = Math.ceil(doorCount*Math.random());

if (switchDoor === true && doorChosen !== doorCar
  ||
switchDoor === false && doorChosen === doorCar){
var winCount = winCount+1
}
else if (switchDoor === true && doorChosen === doorCar
  ||
switchDoor === false && doorChosen !== doorCar){
var lossCount = lossCount+1
}
}

console.log(`j = ${j}`);
console.log(`Wincount = ${winCount}`);
console.log(`Losscount = ${lossCount}`);

if(switchDoor === true){
var switchWinrate = winCount/j*100
}
else{
var switchWinrate = lossCount/j*100
}

alert(`You played ${j} rounds. You won ${winCount} times and lost ${lossCount} times. Switch winrate is ${switchWinrate}%.`)
}
