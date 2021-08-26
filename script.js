const weather = document.getElementById('weather');
const searchButton = document.getElementById('search');
const textbook = document.getElementById('location');
const toggle = document.querySelector('.toggle input');

toggle.addEventListener('click', () => {
    const onoff = toggle.parentNode.querySelector('.onoff');
    onoff.textContent = toggle.checked ? 'F' : 'C'
    convertTemp(toggle.checked);
})

async function getWeatherData(location) {
    const weatherData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=66af45296fcaebd3b931b8f77877fd0b`,
    { 
        mode: 'cors' 
    } 
    );
    if (weatherData.status === 400 || weatherData.status === 404) {
        alert('city/country not found');
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
        icon_code : response.weather[0].icon,
        humidity : response.main.humidity,
        wind_speed : response.wind.speed,
        time: response.dt
    };
    
    return data;
}

function displayWeather(data) {
    resetDOM();
    let location = createLocationDOM(data.location);
    let weatherDescription = createWeatherDescriptionDOM(data.weatherDescription,data.time)
    let weatherInformation = createWeatherInformationDOM(data.temp,data.humidity,data.wind_speed)
    let weather_icon = createIconDOM(data.icon_code)

    let location_weatherDescription = document.createElement('div');
    location_weatherDescription.classList.add('location_weatherDescription')
    location_weatherDescription.appendChild(weatherDescription);
    location_weatherDescription.appendChild(location);

    let tempInfo = document.createElement('div');
    tempInfo.classList.add('tempInfo');
    tempInfo.appendChild(weather_icon);
    tempInfo.appendChild(weatherInformation);

    
    weather.appendChild(location_weatherDescription);
    weather.appendChild(tempInfo);

}

function resetDOM() {
    while (weather.firstChild) {
        weather.lastChild.remove();
    }
}

function createLocationDOM(location) {
    let locationDOM = document.createElement('h2');
    locationDOM.textContent = location;
    return locationDOM;
}

function createWeatherDescriptionDOM(weatherDescription,unix) {
    let weatherDescriptionDOM = document.createElement('p');
    weatherDescriptionDOM.textContent = `${weatherDescription}, loaded at: ${unixToDate(unix)}`;

    return weatherDescriptionDOM;
}

function createWeatherInformationDOM(temp,humidity,wind_speed) {
    let weatherInfoDOM = document.createElement('div');
    let tempDIV = document.createElement('div');
    let humidity_wind_speedDIV = document.createElement('div');
    weatherInfoDOM.classList.add('weatherInfoDOM');
    tempDIV.classList.add('tempDIV');
    humidity_wind_speedDIV.classList.add('humidity_wind_speedDIV');
    let tempDOM = document.createElement('p');
    tempDOM.textContent = `${temp}°C`;
    tempDOM.setAttribute("value",temp);
    let humidityDOM = document.createElement('p');
    humidityDOM.textContent = humidity;
    let wind_speedDOM = document.createElement('p');
    wind_speedDOM.textContent = wind_speed;

    let humidityICON = document.createElement('img');
    humidityICON.src = './assets/humidity.svg'
    humidityICON.classList.add('weather_info_icon')
    
    let wind_speedICON = document.createElement('img');
    wind_speedICON.src = './assets/windy.svg'
    wind_speedICON.classList.add('weather_info_icon')

    tempDIV.appendChild(tempDOM);
    humidity_wind_speedDIV.appendChild(humidityICON);
    humidity_wind_speedDIV.appendChild(humidityDOM);
    humidity_wind_speedDIV.appendChild(wind_speedICON);
    humidity_wind_speedDIV.appendChild(wind_speedDOM);
    
    weatherInfoDOM.appendChild(tempDIV);
    weatherInfoDOM.appendChild(humidity_wind_speedDIV);

    return weatherInfoDOM
}

function createIconDOM(icon_code) {
    let weather_icon_DOM = document.createElement('img');
    weather_icon_DOM.src = `${getIcon(icon_code)}`;
    weather_icon_DOM.classList.add('icon')
    return weather_icon_DOM
}
// °
function convertTemp(bool) {
    let temp = weather.querySelector('.tempDIV p');
    let actual_temp = temp.getAttribute("value");
    //if checked,convert to f
    if (bool) {
        actual_temp = actual_temp*9/5+32
        temp.setAttribute("value",actual_temp);
        temp.textContent = `${Math.round((actual_temp * 100)) / 100}°F`
    }
    else {
        actual_temp = (actual_temp-32)*5/9
        temp.setAttribute("value",actual_temp);
        temp.textContent = `${Math.round((actual_temp* 100)) / 100}°C`
    }
}

function unixToDate(unix) {
    let date = new Date(unix * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    return formattedTime;
}

function getIcon(icon_code) {
    if (icon_code === '01d') {
        //sunny
        return `./assets/sunnyday.svg`;
      }
    
      if (icon_code === '01n') {
        //moon
        return './assets/moon.svg';
      }
      if (icon_code === '02d') {
        //cloudy day
        return `./assets/cloudyday.svg`;

      }
      if (icon_code === '02n') {
        //cloudy night
        return `./assets/cloudynight.svg`;

      }
      if (icon_code === '03d' || icon_code === '03n') {
        //cloud
        return `./assets/cloud.svg`;

      }
      if (icon_code === '04d' || icon_code === '04n') {
        //cloudy
        return `./assets/cloudy.svg`;

      }
      if (icon_code === '09d' || icon_code === '09n' || icon_code === '10d' || icon_code === '10n') {
        //rainy
        return `./assets/rain.svg`;

      }
      if (icon_code === '11d' || icon_code === '11n') {
        //lightning
        return `./assets/lightning.svg`;

      }
      if (icon_code === '13d' || icon_code === '13n') {
        //snow
        return `./assets/snow.svg`;

      }

      return '';
}


searchButton.addEventListener('click', function(e) {
    getSearchValue(e);
});

function getSearchValue(e) {
    e.preventDefault();
    let str = document.getElementById('location').value;
    getWeatherData(str);
}


getWeatherData('Australia');

