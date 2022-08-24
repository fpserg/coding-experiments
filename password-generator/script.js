const run = document.getElementById('run');
run.addEventListener('click', generate);

function generate(){

const main = [...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz&@?!#%$'];
const upp = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const low = [...'abcdefghijklmnopqrstuvwxyz'];
const num = [...'0123456789'];
const sym = [...'!?&@#%$'];
const pwdLength = document.getElementById('length').value;

for (var j=0;j<1000;j++){

var newArray = [];

for (var i=0;i<pwdLength;i++){

var rndNum = Math.floor(Math.random()*main.length);

var rndSymbol = main[rndNum];

newArray.push(rndSymbol);

var includesUpp = newArray.some(e => upp.includes(e));
var includesLow = newArray.some(e => low.includes(e));
var includesNum = newArray.some(e => num.includes(e));
var includesSym = newArray.some(e => sym.includes(e));

if(includesUpp===true && includesLow===true && includesNum===true && includesSym===true){
var check = true
}
else{
var check = false
}
}

if (check===true){
break
}
}

console.log(`j=${j}`);

const password = newArray.join('');

document.getElementById('output').innerHTML += `<p>${password}</p>`;

console.log(newArray.length);
console.log(check);
}
