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
        location : response.name,
        icon_code: response.weather[0].icon
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
    temperature.textContent = `${convertTempToC(data.temp)}, min: ${convertTempToC(data.minTemp)}, max: ${convertTempToC(data.maxTemp)}`;
    let weather_icon = document.createElement('img');
    weather_icon.src = `${getIcon(data.icon_code)}`;
    weather_icon.classList.add('icon')

    weather.appendChild(location);
    weather.appendChild(weatherDescription);
    weather.appendChild(temperature);
    weather.appendChild(weather_icon);

}

function convertTempToC(temp) {
    //kelvin to c
    //K = C + 273.15
    //C = K - 273.15
    return Math.round((temp - 273.15) * 100) / 100
}

function getIcon(icon_code) {
    console.log(icon_code)
    if (icon_code === '01d') {
        //sunny
        return `icons\wi-day-sunny.svg`;
      }
    
      if (icon_code === '01n') {
        //moon
        return 'icons/moon.svg';
      }
      if (icon_code === '02d') {
        //cloudy day
        return `icons\wi-day-cloudy-high.svg`;

      }
      if (icon_code === '02n') {
        //cloudy night
        return `icons\wi-night-alt-cloudy-high.svg`;

      }
      if (icon_code === '03d' || icon_code === '03n') {
        //cloud
        return `icons\wi-cloud.svg`;

      }
      if (icon_code === '04d' || icon_code === '04n') {
        //cloudy
        return `icons\wi-cloudy.svg`;

      }
      if (icon_code === '09d' || icon_code === '09n' || icon_code === '10d' || icon_code === '10n') {
        //rainy
        return `icons\wi-rain.svg`;

      }
      if (icon_code === '11d' || icon_code === '11n') {
        //lightning
        return `icons\wi-lightning.svg`;

      }
      if (icon_code === '13d' || icon_code === '13n') {
        //snow
        return `icons\wi-snow.svg`;

      }

      return '';
}

getWeatherData('Australia');

