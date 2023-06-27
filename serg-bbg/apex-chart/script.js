const go = document.getElementById("go");
go.addEventListener("click", main);
var input = document.getElementById("ticker");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("go").click();
  }
});

function main(){
 const ticker = document.getElementById("ticker").value.toUpperCase();
 var marketdata = "https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/" + ticker + ".json";
 var hist = "https://iss.moex.com/iss/history/engines/stock/markets/shares/securities/" + ticker + ".json";
 var db = "https://fpserg.github.io/my-python/py-script/data.json";
  
 // loadJSON method to open the JSON file.
 function loadJSON(path, success) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
      }
    }
  };
  xhr.open('GET', path, true);
  xhr.send();
}
  
  loadJSON(hist, ltm);
  
  function ltm(Data)
 {
  var rows = Data["history.cursor"]["data"][0][1];
  var ltm = rows - 65;
  var histLTM = "https://iss.moex.com/iss/history/engines/stock/markets/shares/securities/" + ticker + ".json?start=" + ltm;
  
  loadJSON(marketdata, marketData);
  
  function marketData(Data)
{
  var ticker = Data["marketdata"]["data"][0][0];
  var price = Data["marketdata"]["data"][0][24];
  
   loadJSON(db, dataBase)
  
   function dataBase(Data)
{
  var mCap = Data[`${ticker}`]["shares_mn"] * price;
  var ev = mCap + Data[`${ticker}`]["net_debt_mn"];
  var pe = mCap / Data[`${ticker}`]["np_1_mn"];
  var evEbitda = ev / Data[`${ticker}`]["ebitda_1_mn"];
  var vsAth = (price / Data[`${ticker}`]["ath"] - 1) * 100;
  var vsIpo = (price / Data[`${ticker}`]["ipo"] - 1) * 100;
  var dy = Data[`${ticker}`]["dps_1"] / price * 100;
  var ff =  Data[`${ticker}`]["ff"];
    
   loadJSON(histLTM, history)
  
   function history(Data)
{  
  var histArray = Data["history"]["data"];
  
  var sumVal = 0;
  
  for (let i=0; i<histArray.length;i++)
  {
    sumVal += histArray[i][5]
  }
  
  var adtv = sumVal/histArray.length;
  

  var priceArray = []

  for (let i=0; i<histArray.length;i++)
  {
    priceArray.push(histArray[i][11])
  }

  var dateArray = []

  for (let i=0; i<histArray.length;i++)
  {
    dateArray.push(histArray[i][1])
  }

  var output = `${ticker} | R ${price} | MCap ${(mCap / 1000).toFixed(1)} R bn | VS ATH ${vsAth.toFixed(0)}% | VS IPO ${vsIpo.toFixed(0)}% | EV/EBITDA ${evEbitda.toFixed(1)} | P/E ${pe.toFixed(1)} | DY ${dy.toFixed(1)}% | FF ${ff.toFixed(1)}% | ADTV ${(adtv / 1000000).toFixed(1)} R mn `;
  document.getElementById("output").innerHTML = `<p>${output}</p>`;

document.getElementById("chart").innerHTML = "";

var options = {
  chart: {
    type: 'line',
  },
  colors: ['#ffa500'],
  series: [{
    name: 'price',
    data: priceArray
  }],
  xaxis: {
    categories: dateArray,
    labels: {
      show: false
    }
  },
  yaxis: {
    decimalsInFloat: 0,
    labels: {
      style:{
        colors: []
      }
    }
  },
  tooltip: {
    theme: 'dark'
  }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();




console.log(priceArray);


}
}
}
}
}
