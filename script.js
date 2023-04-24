const APP_ID = '3354e1e58fb8c2b199b7659c3bed2e6e';

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
}

let getWeatherIconUrl = (description) => {
    switch (description) {
        case 'clear sky':
            return '/img/icons/sun.png';
        case 'few clouds':
            return '/img/icons/cloud-sun.png';
        case 'broken clouds':
            return '/img/icons/broken-clouds.png';
        case 'shower rain':
            return '/img/icons/shower-rain.png';
        case 'rain':
            return '/img/icons/rain.png';
        case 'thunderstorm':
            return '/img/icons/thunder.png';
        case 'snow':
            return '/img/icons/snow.png';
        case 'mist':
            return '/img/icons/mist.png';
        default:
            return '/img/icons/sun.png';
        }
}


const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location: data.name,
        wind: data.wind.speed,
        country: data.sys.country,
        clouds: data.clouds.all,
        pressure:data.main.pressure,
        humidity: data.main.humidity,
        temperature: data.main.temp + " °C",
        w_main: data.weather[0].main,
        w_description: data.weather[0].description,
        weatherIconUrl: getWeatherIconUrl(data.weather[0].description),
    }
        
    Object.keys(weatherData).forEach(keys => {
        document.getElementById(keys).innerText = weatherData[keys];
    });

    document.getElementById('weatherIconUrl').setAttribute('src', weatherData.weatherIconUrl);

    

    const sunsetTimestamp = data.sys.sunset;
    const sunsetDate = new Date(sunsetTimestamp * 1000);
    const sunsetHours = (sunsetDate.getHours()).toString().padStart(2, '0');
    const sunsetMinutes = sunsetDate.getMinutes().toString().padStart(2, '0');
    const sunsetTime = `${sunsetHours}:${sunsetMinutes}`;
    document.getElementById('sunset_id').textContent = sunsetTime;


    const sunriseTimestamp = data.sys.sunrise;
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunriseHours = (sunriseDate.getHours()).toString().padStart(2, '0');
    const sunriseMinutes = sunriseDate.getMinutes().toString().padStart(2, '0');
    const sunriseTime = `${sunriseHours}:${sunriseMinutes}`;
    document.getElementById('sunrise_id').textContent = sunriseTime;


    //horas pasadas desdde el sunrise

    const nowTimestamp = Date.now() / 1000; // convertimos a segundos
    const sunriseTimestamp1 = data.sys.sunrise;
    const hoursSinceSunrise = ((nowTimestamp - sunriseTimestamp1) / 3600).toFixed(2);
    document.getElementById("timepass1").textContent = hoursSinceSunrise+'h ago';

    //horas pasadas desdde el sunset

    const nowTimestamp2 = Date.now() / 1000; // convertimos a segundos
    const sunsetTimestamp1 = data.sys.sunset;
    const hoursSinceSunset = ((nowTimestamp - sunsetTimestamp1) / 3600).toFixed(2);
    document.getElementById("timepass2").textContent = hoursSinceSunset+'h ago';

    const currentTime = new Date().getTime() / 1000; // convertir a segundos
    if (currentTime > sunsetTimestamp || currentTime < sunriseTimestamp) {
    document.getElementById('weatherIconUrl').setAttribute('src', '/img/icons/moon.png');
    }
}




const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}
