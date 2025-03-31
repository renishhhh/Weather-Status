let cityName = document.querySelector('.weather_city');
let dateTime = document.querySelector('.weather_date_time');
let w_forecast = document.querySelector('.weather_forecast');
let w_icon = document.querySelector('.weather_icon');
let w_temperature = document.querySelector('.weather_temperature');
let w_mintemperature = document.querySelector('.weather_min');
let w_maxtemperature = document.querySelector('.weather_max');

let w_feelslike = document.querySelector('.weather_feelslike');
let w_humidity = document.querySelector('.weather_humidity');
let w_wind = document.querySelector('.weather_wind');
let w_pressure = document.querySelector('.weather_pressure');

let citySearch = document.querySelector('.weather_search');

const getCountryName = (code) => {
    return new Intl.DisplayNames(['en'], { type: "region" }).of(code);
};

const getDateTime = (dt) => {
    const curdate = new Date(dt * 1000); // Fixed variable name

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(curdate);
    return formattedDate;
};

let city = "pune";

// Search functionality
citySearch.addEventListener('submit', (e) => {
    e.preventDefault();
    let cityInput = document.querySelector('.city_name'); // Fixed duplicate variable name issue
    city = cityInput.value;
    getWeatherData();
    cityInput.value = "";
});

const getWeatherData = async () => {
    const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c4fb81e08673593c2c56053675a1f685&units=metric`;
    
    try {
        const res = await fetch(weatherurl);
        const data = await res.json();

        if (data.cod !== 200) {
            throw new Error(data.message); // Handle API errors
        }

        const { main, name, weather, wind, sys, dt } = data;

        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
        w_temperature.innerHTML = `${main.temp}°C`;
        w_mintemperature.innerHTML = `Min: ${main.temp_min}°C`;
        w_maxtemperature.innerHTML = `Max: ${main.temp_max}°C`;

        w_feelslike.innerHTML = `${main.feels_like.toFixed(2)}°C`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

// Load weather data on page load
window.addEventListener("load", getWeatherData);
