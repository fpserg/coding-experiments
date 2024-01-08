$.ajaxSetup({
  async: false
});

const go = document.getElementById("go");
go.addEventListener("click", main);

function main(){
let ticker1 = document.getElementById("ticker1").value.toUpperCase()

let ticker2 = document.getElementById("ticker2").value.toUpperCase()

let timeFrame = document.getElementById("period").value

function getIdByTicker(ticker){
let idUrl = "https://api.coingecko.com/api/v3/search?query=" + ticker;

let cryptoData 

try {
  cryptoData = $.parseJSON($.get(idUrl)["responseText"])["coins"]
  } 
catch(err){
  alert(err)
  };

let cryptoId

for (let i=0; i<cryptoData.length; i++){
  if (cryptoData[i]["symbol"] === ticker.toUpperCase()){
    cryptoId = cryptoData[i]["id"];
    break
  }
}

const url = "https://api.coingecko.com/api/v3/coins/" + cryptoId + "/market_chart?vs_currency=usd&days=" + timeFrame + "&interval=daily&precision=8"

const datePrice =  $.parseJSON($.get(url)["responseText"])["prices"];

let priceArray = []
let dateArray = []

for (let i=0; i<parseInt(timeFrame); i++){
  try {
    priceArray.push(datePrice[i][1])
    }
  catch(err) {
    alert(err)
    break
    } 
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

function ma(maRange) {

let maArray = [];

for (let i=0; i<maRange; i++) {
  maArray.push(null)
}

for (let i=maRange+1; i<=timeFrame; i++) {
  let sm = 0;
  for (let j=i-maRange; j<i; j++) {
    sm += c[j]
  }
  sm /= maRange
  maArray.push(Math.round(sm*1e8)/1e8)
}

return maArray
}

let p1 = parseInt(document.getElementById("ma1").value)
let p2 = parseInt(document.getElementById("ma2").value)
let p3 = parseInt(document.getElementById("ma3").value)

let ma1 = ma(p1);
let ma2 = ma(p2);
let ma3 = ma(p3);

//console.log(a)
//console.log(b)
//console.log(c)
//console.log(d)
console.log(ma1)
console.log(ma2)
console.log(ma3)

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
  colors: ['#ffa500', '#ff0000', '#00ff00', '#ffffff'],
  series: [
  {
    name: 'price',
    data: c
  },
  {
    name: `ma-${p1}`,
    data: ma1
  },
  {
    name: `ma-${p2}`,
    data: ma2
  },
  {
    name: `ma-${p3}`,
    data: ma3
  },
],
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