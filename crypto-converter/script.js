$.ajaxSetup({
  async: false
});

const go = document.getElementById("go");
go.addEventListener("click", main);

function main(){
let ticker1 = document.getElementById("ticker1").value.toUpperCase()

let ticker2 = document.getElementById("ticker2").value.toUpperCase()

let timeFrame = document.getElementById("period").value

//let ticker1 = "osmo"
//let ticker2 = "ton"


function getIdByTicker(ticker){
let idUrl = "https://api.coingecko.com/api/v3/search?query=" + ticker;

const cryptoData =  $.parseJSON($.get(idUrl)["responseText"])["coins"];

let cryptoId

for (let i=0; i<cryptoData.length; i++){
  if (cryptoData[i]["symbol"] === ticker.toUpperCase()){
    cryptoId = cryptoData[i]["id"];
    break
  }
}

const url = "https://api.coingecko.com/api/v3/coins/" + cryptoId + "/market_chart?vs_currency=usd&days=" + timeFrame + "&interval=daily&precision=8"

console.log(cryptoId)

const datePrice =  $.parseJSON($.get(url)["responseText"])["prices"];

let priceArray = []
let dateArray = []

for (let i=0; i<parseInt(timeFrame); i++){
  priceArray.push(datePrice[i][1])
  }
for (let i=0; i<parseInt(timeFrame); i++){
  dateArray.push(new Date(datePrice[i][0]).toDateString())
  }

let newArray = [dateArray, priceArray]

return newArray

}

let a = getIdByTicker(ticker1)[1]
let b = getIdByTicker(ticker2)[1]
let d = getIdByTicker(ticker1)[0]
let c = []
for (let i=0; i<a.length; i++){
c[i] = a[i] / b[i]
}

console.log(a)
console.log(b)
console.log(c)
console.log(d)

document.getElementById("output").innerHTML = `<p>${ticker1.toUpperCase()}/${ticker2.toUpperCase()}
<br>
Min: ${Math.min(...c).toFixed(8)}
<br>
Max: ${Math.max(...c).toFixed(8)}
<br>
Avg: ${(c.reduce((a, b) => a + b, 0) / c.length).toFixed(8)}
<br>
Last: ${c[c.length-1].toFixed(8)}
</p>`;

document.getElementById("chart").innerHTML = "";

var options = {
  chart: {
    type: 'line',
  },
  stroke: {
    width: 1
  },
  colors: ['#ffa500'],
  series: [{
    name: 'price',
    data: c
  }],
  xaxis: {
    categories: d,
    labels: {
      show: false
    }
  },
  yaxis: {
    decimalsInFloat: 2,
    labels: {
      style:{
        colors: ['#ffffff']
      },
    }, 
  },
  tooltip: {
    y: {
      formatter: function(value){
        return value.toFixed(8)
      }
    }
  }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();
}