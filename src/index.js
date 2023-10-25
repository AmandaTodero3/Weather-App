
function displayTemperature(response) {
    console.log(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement=document.querySelector("#date")
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.inndfHTML = formateDate(response.data.dt * 1000);
}
let apiKey = "feat836b3fcca8a0oba283a48d9a8f94";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=New%20York&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
