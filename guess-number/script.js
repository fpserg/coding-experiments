const logArray = [];

const play = document.getElementById('play');
play.addEventListener('click', playGame);

function playGame(){

var x = Number(Math.ceil(Math.random()*100));

alert (x);

var y = Number(prompt('I picked a number between 1 and 100. Try to guess it!'));

var i = 1;

for (i;y!==x && y!==0;i++){

if(y<1 || y>100){
var y = Number(prompt(`Error! ${y} is out of 1-100 range!`))
}

else if (y>x){
var y = Number(prompt(`My number is LOWER than ${y}. Try again.`))
}

else if(y<x){
var y = Number(prompt(`My number is HIGHER than ${y}. Try again.`))
}

else if(y===0){
break
}
}

if(y===0){
alert ('Terminated by user')
}

else if (y===x){
alert (`Right! You win! You guessed the number in ${i} turns.`)
}
console.log(`i=${i}`);
logArray.push(i*1);

var score = document.getElementById('score');
score.innerHTML += `<li>${i}</li>`;
}

const end = document.getElementById('end');
end.addEventListener('click', endGame);

function endGame(){
logArray.sort((a, b) => a-b);
alert (`Game over! You played ${logArray.length} rounds and your best score is ${logArray[0]} attempts.`)
}
