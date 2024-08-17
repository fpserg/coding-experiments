const fightButton = document.getElementById("fight");
fightButton.addEventListener("click", start);

const hitButton = document.getElementById("face");

let hpEnemy = 5;
let hpPlayer = 5;
let gameOn = true;
let rndCnt = 0;
let ms = 1000;


function start(){

rndCnt++;
hpEnemy = 5;
hpPlayer = 5;
gameOn = true;

fightButton.disabled = true;

document.getElementById("roundCount").innerHTML = `<h2>ROUND ${rndCnt}</h2>`
  
hitButton.addEventListener("touchstart", hit);
hitButton.addEventListener("touchend", scaleBack);
document.getElementById("hpEnemy").innerHTML = `<h1>5</h1>`
document.getElementById("hpPlayer").innerHTML = `<h1>5</h1>`

enemyHit()


}

function scaleBack(){

  hitButton.style.transform = "scale(0.8)"
}

function hit(){

  hitButton.style.transform = "scale(1)"
  
  if (hpEnemy>0){
    hpEnemy--
  }

document.getElementById("hpEnemy").innerHTML = `<h1>${hpEnemy}</h1>`

  if(hpEnemy==0){
    gameOn = false;
    alert("You win!")
    fightButton.disabled = false;
hitButton.removeEventListener("touchstart", hit);
    return ms *= 0.8;

  }
}

async function enemyHit(){
  if(gameOn==true){
    await new Promise(resolve=>setTimeout(resolve, ms));

document.getElementById("hpPlayer").innerHTML = `<h1>${hpPlayer}</h1>`

    if(hpPlayer==0 && gameOn==true){
    gameOn = false;
    alert(`Game over!
You survived ${rndCnt} rounds.`);
    fightButton.disabled = false;
    return rndCnt = 0, ms = 1000;
    }
    
    hpPlayer--
    enemyHit()
  }
}
  

const popup = document.getElementById("popup");

const help = document.getElementById("help");

const ok = document.getElementById("btnOk");

const ol = document.getElementById("overlay");

help.addEventListener("click", () => {
  // при клике на кнопку "deleteBtn" устанавливаем CSS свойство "display" элемента с id "popup" на "block", чтобы показать попап.
  popup.style.display = "block";

  // добавляется класс "show" к элементу с id "overlay", чтобы показать затемнение.
  overlay.classList.add("show");
});

ok.addEventListener("click", () => {
  popup.style.display = "none";
  overlay.classList.remove("show");
});

ol.addEventListener("click", () => {
  popup.style.display = "none";
  overlay.classList.remove("show");
});