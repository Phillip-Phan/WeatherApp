const weather = document.getElementById('weather');

async function getWeatherData(location) {
    const weatherData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=66af45296fcaebd3b931b8f77877fd0b`,
    { 
        mode: 'cors' 
    } 
    );
    if (weatherData.status === 400) {
        console.log(weatherData.json().then(function(response) {
            console.log(response.message)
        }));
    } else {
        weatherData.json().then(function(response) {
            console.log(response);
            let data = processJSON(response);
            displayWeather(data);
    });
    }
}

function processJSON(response) {

    let data = {
        weatherDescription : response.weather[0].description,
        temp : response.main.temp,
        minTemp : response.main.temp_min,
        maxTemp : response.main.temp_max,
        location : response.name
    };
    
    return data;
}

function displayWeather(data) {
    console.log(`${data.weatherDescription} \n ${data.temp} \n ${data.minTemp} \n ${data.maxTemp} `)
    let location = document.createElement('h2');
    location.textContent = data.location;
    let weatherDescription = document.createElement('p');
    weatherDescription.textContent = `${data.weatherDescription}`;
    let temperature = document.createElement('p');
    temperature.textContent = `${data.temp}, min: ${data.minTemp}, max: ${data.maxTemp}`;
    weather.appendChild(location);
    weather.appendChild(weatherDescription);
    weather.appendChild(temperature);

}



getWeatherData('Australia');

