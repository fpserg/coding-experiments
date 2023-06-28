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
  var pe1 = mCap / Data[`${ticker}`]["np_1_mn"];
  var pe2 = mCap / Data[`${ticker}`]["np_2_mn"];
  var pe3 = mCap / Data[`${ticker}`]["np_3_mn"];
  var evEbitda1 = ev / Data[`${ticker}`]["ebitda_1_mn"];
  var evEbitda2 = ev / Data[`${ticker}`]["ebitda_2_mn"];
  var evEbitda3 = ev / Data[`${ticker}`]["ebitda_3_mn"];
  var evs1 = ev / Data[`${ticker}`]["sales_1_mn"];
  var evs2 = ev / Data[`${ticker}`]["sales_2_mn"];
  var evs3 = ev / Data[`${ticker}`]["sales_3_mn"];
  var dy1 = Data[`${ticker}`]["dps_1"] / price * 100;
  var dy2 = Data[`${ticker}`]["dps_2"] / price * 100;
  var dy3 = Data[`${ticker}`]["dps_3"] / price * 100;
  var vsAth = (price / Data[`${ticker}`]["ath"] - 1) * 100;
  var vsIpo = (price / Data[`${ticker}`]["ipo"] - 1) * 100;
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

document.getElementById("output").innerHTML = 
`<p>Price: R ${price} | MCap: ${(mCap / 1000).toFixed(1)} R bn | ADTV ${(adtv / 1000000).toFixed(1)} R mn | VS ATH ${vsAth.toFixed(0)}% | VS IPO ${vsIpo.toFixed(0)}% | FF ${ff.toFixed(1)}%</p>`
  document.getElementById("table").innerHTML = 
`<table>
  <tr>
    <th></th>
    <th>23</th>
    <th>24</th>
    <th>25</th>
  </tr>
  <tr>
    <td id="fc">EV/S</td>
    <td>${evs1.toFixed(1)}</td>
    <td>${evs2.toFixed(1)}</td>
    <td>${evs3.toFixed(1)}</td>
  </tr>
  <tr>
    <td id="fc">EV/EBITDA</td>
    <td>${evEbitda1.toFixed(1)}</td>
    <td>${evEbitda2.toFixed(1)}</td>
    <td>${evEbitda3.toFixed(1)}</td>
  </tr>
  <tr>
    <td id="fc">PE</td>
    <td>${pe1.toFixed(1)}</td>
    <td>${pe2.toFixed(1)}</td>
    <td>${pe3.toFixed(1)}</td>
  </tr>
  <tr>
    <td id="fc">DY</td>
    <td>${dy1.toFixed(1)}%</td>
    <td>${dy2.toFixed(1)}%</td>
    <td>${dy3.toFixed(1)}%</td>
  </tr>
</table>`;

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
        colors: ['#ffffff']
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