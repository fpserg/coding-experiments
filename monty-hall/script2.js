const play2 = document.getElementById('play2');
play2.addEventListener('click',playTwo);

function PlayTwo(){
var rounds = Number(prompt(`How many simulations would you like to run?`));

var switchDoor = confirm(`Will you be switching your initial choice?`);

var j = 0;

var switchWinrate

//set variable for opening door
var doorOpen;
// set variable for counting wins
var winCount = 0;
// set variable for counting losses
var lossCount = 0;

for (j; j<rounds; j++){

//set the car behind a random door
const doorCar = Math.ceil(3*Math.random());
//set the player choice as random
var doorChosen = Math.ceil(3*Math.random());

//open the door with a goat behind it
if(
 doorChosen === 1 && doorCar === 2
  ||
 doorChosen === 2 && doorCar === 1){
  var doorOpen = 3;
} else if(
 doorChosen === 1 && doorCar === 3
  ||
 doorChosen === 3 && doorCar === 1){
  var doorOpen = 2;
} else if(
 doorChosen === 2 && doorCar === 3
  ||
 doorChosen === 3 && doorCar === 2){
  var doorOpen = 1;
} else if(
 doorChosen === 1 && doorCar === 1){
  var doorOpen = Math.ceil(1+2*Math.random())
} else if(
 doorChosen === 2 && doorCar === 2){
  var doorOpen = Math.ceil(2*Math.random())*2-1
} else if(
 doorChosen === 3 && doorCar === 3){
  var doorOpen = Math.ceil(2*Math.random())
}

//switching the door
if (switchDoor === true){
 if (
  doorChosen === 1 && doorOpen === 2
  ||
  doorChosen === 2 && doorOpen === 1){
var doorChosen = 3
 }
 else if (
  doorChosen === 1 && doorOpen === 3
  ||
  doorChosen === 3 && doorOpen === 1){
var doorChosen = 2
 }
 else if (
  doorChosen === 2 && doorOpen === 3
  ||
  doorChosen === 3 && doorOpen === 2){
var doorChosen = 1
 }
}

if (doorChosen === doorCar){
var winCount = winCount+1
}
else {
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
