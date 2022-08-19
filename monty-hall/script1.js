const play1 = document.getElementById('play1');
play1.addEventListener('click',playOne);

function playOne(){

//set variable for opening door
var doorOpen;
// set variable for counting rounds
var i = 0;
//set variable for counting switches
var switchCount = 0;
// set variable for counting wins
var winCount = 0;
// set variable for counting losses
var lossCount = 0;
//set variable for another round
var anotherRound = true;


for (i; anotherRound === true; i++){

//set the car behind a random door
const doorCar = Math.ceil(3*Math.random());
//alert(doorCar);
//let the player choose the door
var doorChosen = Number(prompt('Please choose the door 1-3'));
if(doorChosen>3){
alert('Error!');
var anotherRound = false;
}

else{
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

var doorSwitch = confirm(`The goat is behind door ${doorOpen}. Would you like to switch the door?`);

//switching the door
if (doorSwitch === true){
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
var switchCount = switchCount+1
}

if (doorChosen === doorCar){
var anotherRound = confirm(`You win! You chose door ${doorChosen} and the car was behind door ${doorCar}! Another round?`);
var winCount = winCount+1
}
else {
var anotherRound = confirm(`You lose! You chose door ${doorChosen} and the car was behind door ${doorCar}! Another round?`);
var lossCount = lossCount+1
}
}
}

console.log(`i = ${i}`);
console.log(`Switchcount = ${switchCount}`);
console.log(`Wincount = ${winCount}`);
console.log(`Losscount = ${lossCount}`);

alert(`You played ${i} rounds and switched the initial door ${switchCount} times. You won ${winCount} times and lost ${lossCount} times`)
}
