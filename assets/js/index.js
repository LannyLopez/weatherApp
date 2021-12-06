var searchBtn = document.getElementById("search-btn")
var temp = document.getElementById("temp")
var humidity = document.getElementById("humidity")
var wind = document.getElementById("wind")
var uvi = document.getElementById("uvi")
var APIKey = "141387ae6b2b148812b1c2efe668a8cc"
var current = document.getElementById("currentConditions")

function getWeather(e) {
    e.preventDefault();
    var cityName = document.getElementById("cityname").value;
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&Appid=${APIKey}&units=imperial`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log("Temperature is: ", data.main.temp);
            console.log("Humidity is: ", data.main.humidity);
            console.log("speed is: ", data.wind.speed);

            current.textContent = "CITY: " + data.name;
            temp.textContent = "TEMP: " + data.main.temp + " ℉";
            humidity.textContent = "HUMIDITY: " + data.main.humidity + " % ";
            wind.textContent = "WIND: " + data.wind.speed + "/MPH";
            lat = data.coord.lat;
            lon = data.coord.lon;
            getForecast();
        });

    function getForecast(e) {
        var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;
        fetch(forecastUrl)
            .then(function (response2) {
                return response2.json();
            })
            .then(function (data) {
                console.log("uvi is: ", data);
                console.log(uvi);
                uvi.textContent = "UVI: " + data.current.uvi;
            });

        document.getElementById("uvi").value = "";
    }
    document.getElementById("cityname").value = "";
}
searchBtn.addEventListener("click", getWeather);

