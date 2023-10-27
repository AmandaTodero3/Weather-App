function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();   
    if (hours < 10){
        hours = `0${hours}`
    }
    let minutes = date. getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
 
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let daily = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
    daily.forEach(function (day) {
        forecastHTML += ` 
            <div class="col-2">
                <div class="weather-forecast-date">
                    ${day} 
                </div>
                <img 
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png" 
                alt="" width="42">
                <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max">18°</span>
                    <span class="weather-forecast-temperature-min">12°</span>  
                </div>                          
            </div>
        `;
    });

    forecastHTML += `</div>`;
    forecastElement.innerHTML = forecastHTML;
}


function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement=document.querySelector("#date")
    let iconElement=document.querySelector("#icon");

    fahrenheitTemperature = response.data.temperature.current;

    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    icon.setAttribute("alt", response.data.condition.description);
}

function search(city) {
let apiKey = "feat836b3fcca8a0oba283a48d9a8f94";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayTemperature);   
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    // remove the active class from fahrenheit link
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let celsiusTemperature = (fahrenheitTemperature - 32) * 5 / 9;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}



let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link"); 
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

displayForecast();
search("Mooresville");