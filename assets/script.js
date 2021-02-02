
var city
var cities = []
var nameCity =  document.getElementById('cityName')
var apiur1 
var apiur2
 var weekWeather
 var weekWeather2


 
async function getWeather(){
    var city = document.getElementById('inputValue').value
    apiur1 =`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=166a433c57516f51dfab1f7edaed8413&units=imperial`
    
    // get the city information
    weekWeather = await fetch( apiur1 ).then( r=>r.json() )
    document.getElementById('cityName').textContent = weekWeather.city.name + ' ' + `${moment().format('L')}`  
    var windFix = Math.floor(`${weekWeather.list[0].speed}`);
    document.getElementById('windSpeed').innerHTML = `WindSpeed: ${windFix} MPH`
    const cityName = document.createElement('button')
    cityName.setAttribute('class',  `btn-secondary ${city.name}`)
    cityName.setAttribute('id', 'deleted-when-cleared')
    cityName.textContent = `${weekWeather.city.name}`
    
    document.querySelector('.list-group').appendChild(cityName) 
    for ( i=1;i<7; i++){
        var element = document.getElementById('col'); 
        element.classList.remove('hidden');
        document.getElementById(`humidity${i}`).innerHTML = `Humidity: ${weekWeather.list[i-1].humidity} %`
        var temperatureFix = Math.floor(`${weekWeather.list[i-1].temp.day}`)
        document.getElementById(`temperature${i}`).innerHTML = `Temp: ${temperatureFix} °C`
        document.querySelector(`#imageWeather${i}`).src = `http://openweathermap.org/img/wn/${weekWeather.list[i-1].weather[0].icon}@2x.png`
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

        document.querySelector(`#cardtime${i}`).textContent =  moment().add(`${i}`, 'day').format('L')
        var cardwitdh = document.querySelector(`#card${i}`)
        cardwitdh.style.margin = "5px"
        cardwitdh.style.width = "165px"

        var coordinateLat = weekWeather.city.coord.lat
        var coordinateLon = weekWeather.city.coord.lon
    
        apiur2 =`http://api.openweathermap.org/data/2.5/uvi?lat=${coordinateLat}&lon=${coordinateLon}&appid=166a433c57516f51dfab1f7edaed8413` 
        weekWeather2 = await fetch( apiur2 ).then( r=>r.json() )
    
        document.getElementById(`uvIndex`).innerHTML = `UV Index: ${weekWeather2.value }`
        

// cities.push(`${weekWeather.city.name}`)
//         localStorage.setItem('cities', JSON.stringify(cities));


//         if (localStorage.getItem("cities"))  {
//             var citiesObject = localStorage.getItem('cities');
//             cities = JSON.parse(citiesObject)
//             for (var i =0; i<citiesObject.length; i++ )
//             {const cityName = document.createElement('button')
//             cityName.setAttribute('class',  `btn-secondary ${city.name}`)
//             cityName.setAttribute('id', 'deleted-when-cleared')
//             cityName.textContent = `${weekWeather.city.name}`} 
//         }

}
}
