const APP_ID = '3354e1e58fb8c2b199b7659c3bed2e6e';

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', () => {
const cityInput = document.getElementById('city-input');
const cityName = cityInput.value;

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APP_ID}`)
    .then(response => response.json())
    .then(data => setWeatherData(data));
});


const getIconName = weatherData => {
    const main = weatherData.main.toLowerCase();
    const description = weatherData.description.toLowerCase();
    const isDay = weatherData.isDay;

if (main === "thunderstorm") {
    return "./img/icons/thunder.png";
} else if (main === "mist") {
    return "./img/icons/mist.png";
} else if (main === "rain") {
    return "./img/icons/rain.png";
} else if (main === "snow") {
    return "./img/icons/snow.png";
} else if (main === "clear" && isDay) {
    return "./img/icons/sun.png";
} else if (main === "clear" && !isDay) {
    return "./img/icons/moon.png";
} else if (main === "clouds" && description === "few clouds" && isDay) {
    return "./img/icons/clud.png";
} else if (main === "clouds" && description === "few clouds" && !isDay) {
    return "./img/icons/moon.png";
} else if (main === "clouds" && description === "scattered clouds") {
    return "./img//icons/cloud-sun.png";
}else if (main === "clouds" && description === "broken clouds") {
return "./img/icons/cloud-rain.png";
} else if (main === "clouds" && description === "overcast clouds") {
    return "./img/icons/broken-clouds.png";
} 
}


const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
}

const setWeatherData = data => {
    console.log(data)
    const weatherData = {
        humidity: data.main.humidity+ ' %',
        pressure: data.main.pressure + ' hPa',
        wind: data.wind.speed + ' m/s',
        clouds: data.clouds.all + ' %',
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp + " °C",
        main: data.weather[0].main,
        description: data.weather[0].description,
        sunrise: new Date(data.sys.sunrise * 1000),
        sunset: new Date(data.sys.sunset * 1000),
        isDay: (data.dt > data.sys.sunrise && data.dt < data.sys.sunset)
    }
    const iconName = getIconName(weatherData);
    const iconElement = document.getElementById('icon');
    iconElement.setAttribute('src', `${iconName}`);

    Object.keys(weatherData).forEach( key => {
        if (key === 'sunrise' || key === 'sunset') {
            document.getElementById(key).textContent = getFormattedTime(weatherData[key]);
        }else if(key=='isDay'){
        } 
        else {
            document.getElementById(key).textContent = weatherData[key];
        }
    });

    const now = new Date();
    const sunriseDiff = Math.round((now - weatherData.sunrise) / 1000);
    const sunsetDiff = Math.round((now - weatherData.sunset) / 1000);

    const sunriseHours = Math.floor(sunriseDiff / 3600);
    const sunriseMinutes = Math.floor((sunriseDiff % 3600) / 60);

    const sunsetHours = Math.floor(sunsetDiff / 3600);
    const sunsetMinutes = Math.floor((sunsetDiff % 3600) / 60);

    document.getElementById('sunriseago').textContent = `${sunriseHours}h ${sunriseMinutes}m`;
    document.getElementById('sunsetago').textContent = `${sunsetHours}h ${sunsetMinutes}m`;

}


const getFormattedTime = date => {
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
}

const fechaLocal = new Date();
const dia = fechaLocal.getDate();
const mes = fechaLocal.getMonth(); 
const anio = fechaLocal.getFullYear(); 
const nombresMeses = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octuber",
    "November",
    "December"
];
const fecha = document.getElementById("date");
const fecha2=document.getElementById("date2");
fecha.innerHTML = nombresMeses[mes] +" " + anio;
fecha2.innerHTML = dia +" "+nombresMeses[mes] + " " + anio;

const hora = fechaLocal.getHours();
const minutos = fechaLocal.getMinutes();


const time=document.getElementById("time");
time.innerHTML = hora.toString().padStart(2, "0") + ":" + minutos.toString().padStart(2, "0");


const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}
