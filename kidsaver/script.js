function calc(){

let instalment = document.getElementById("instalment").value
let yrs = document.getElementById("yrs").value
let rate = document.getElementById("rate").value
let amt = 0
   
  for (let i=1; i<=parseFloat(yrs); i++){
    amt += parseFloat(instalment) * (1 + parseFloat(rate) / 100) ** i  
  }

document.getElementById("output").innerHTML = `<p>Твой птенец вывалится из гнезда с ${amt.toFixed(2)} рубасов на кармане!</p>`
}