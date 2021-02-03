
var apiur1 
var apiur2
 var weekWeather
 var weekWeather2
var name2
var cityBtn
window.onload = function () {
    let history = JSON.parse(localStorage.getItem('history')) || [];

    for (let index = 0; index < history.length; index ++ ) {
        let li = `<lis class='list-group-item list-group-item-action>${history[index]}</li>`;
        list.innerHTML += li;
    }
};


document.querySelector('#searchButton').onclick = function () {
    let searchValue = document.querySelector('#inputValue').value;
    if (searchValue) {
        document.querySelector('#inputValue').value = "" ;
        getWeather(searchValue);
    }
}

let list = document.querySelector('.history');
list.addEventListener('click', function(event) {
    if (!event.target.classList.contains('history')) {
        getWeather(event.target.textContent);
    }
});
function makeRow (text) {
    let li = `<lis class='list-group-item list-group-item-action'>${text}</li> `
    list.innerHTML += li;
}
 
async function getWeather(searchValue){
    let history = JSON.parse(localStorage.getItem('history')) || [];
    if (history.indexOf(searchValue) === -1){
        history.push(searchValue);

        localStorage.setItem('history', JSON.stringify(history));

        makeRow(searchValue);
    }
    
    apiur1 =`https://api.openweathermap.org/data/2.5/forecast/daily?q=${searchValue}&appid=166a433c57516f51dfab1f7edaed8413&units=imperial`
    
    // get the city information
  
    weekWeather = await fetch( apiur1 ).then( r=>r.json() )
    name2 = weekWeather.city.name
    document.getElementById('cityName').textContent = name2 + ' ' + `${moment().format('L')}`  
    var windFix = Math.floor(`${weekWeather.list[0].speed}`);
    document.getElementById('windSpeed').innerHTML = `WindSpeed: ${windFix} MPH`
                    
    for ( i=1;i<7; i++){
        var element = document.getElementById('col'); 
        element.classList.remove('hidden');
        document.getElementById(`humidity${i}`).innerHTML = `Humidity: ${weekWeather.list[i-1].humidity} %`
        var temperatureFix = Math.floor(`${weekWeather.list[i-1].temp.day}`)
        document.getElementById(`temperature${i}`).innerHTML = `Temp: ${temperatureFix} °C`
        document.querySelector(`#imageWeather${i}`).src = `https://openweathermap.org/img/wn/${weekWeather.list[i-1].weather[0].icon}@2x.png`
        //background image depends of weather condition
        if (`${weekWeather.list[i-1].weather[0].main}` == "Snow" ){
            document.querySelector(`#card${i-1}`).style.backgroundImage = "url(assets/snow.gif)";
        }
        else if (`${weekWeather.list[i-1].weather[0].main}` == "Clear") {
            document.querySelector(`#card${i-1}`).style.backgroundImage = "url(assets/sunny.gif)"; 
        }
        else if (`${weekWeather.list[i-1].weather[0].main}` == "Clouds"  ){
            document.getElementById(`card${i-1}`).style.backgroundImage = "url(assets/cloudy.gif)" 
        }
        else if (`${weekWeather.list[i-1].weather[0].main}` == "Rain"  )
            document.getElementById(`card${i-1}`).style.backgroundImage = "url(assets/rain.gif)" 
        else{  }

        document.querySelector(`#cardtime${i}`).innerHTML =  moment().add(`${i}`, 'day').format('L')
        var cardwitdh = document.querySelector(`#card${i}`)
        cardwitdh.style.margin = "5px"
        cardwitdh.style.width = "165px"

        var coordinateLat = weekWeather.city.coord.lat
        var coordinateLon = weekWeather.city.coord.lon
    
        apiur2 =`https://api.openweathermap.org/data/2.5/uvi?lat=${coordinateLat}&lon=${coordinateLon}&appid=166a433c57516f51dfab1f7edaed8413` 
        weekWeather2 = await fetch( apiur2 ).then( r=>r.json() )
    
        document.getElementById(`uvIndex`).innerHTML = `UV Index: ${weekWeather2.value }`
    //   
    }
    
}
function testing (clicked_id){
    city = clicked_id
    getWeather()
}

//  document.querySelector('#deleted-when-cleared').addEventListener('click',getWeather(citylist));
