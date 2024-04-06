let marketdata = "https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/carm.json"

try {
  price = $.parseJSON($.get(marketdata)["responseText"])["marketdata"]["data"][0][24]
  } 
catch(err){
  alert(err)
  };

function pumpIt(){
  price += 0.01
  document.getElementById("output").innerHTML = `<p>${price.toFixed(2)}</p>`
}

document.getElementById("output").innerHTML = `<p>${price.toFixed(2)}</p>`