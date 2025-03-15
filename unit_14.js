const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "appid": "****"
}

const cities = [
    { id: 6167863, name: "Toronto" },
    { id: 3088171, name: "Poznan" },
    { id: 709835, name: "Dokuchayevsk" },
    { id: 1699310, name: "Monreal, PH" }
];

function populateCitySelect() {
    const citySelect = document.querySelector('.form-select');
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.id;
        option.text = city.name;
        citySelect.add(option);
    });
}

populateCitySelect();

function getWeather() {
    const citySelect = document.querySelector('.form-select').value;
    fetch(`${param.url}weather?id=${citySelect}&units=metric&APPID=${param.appid}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}

function getWindDirection(deg) {
    const directions = ['⬆️ north', ' ↗️ north/east', '➡️ east', '↘️ south/east', '⬇️ south', '↙️ south/west', '⬅️ west', '↖️ north/west'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
}

function showWeather(data) {
    console.log(data);
    let dataNameOut = data.name + '<br>';
    let dataDescription = data.weather[0].description;
    let dataTempOut = Math.round(data.main.temp) + '\u00B0C';
    let dataIcon = data.weather[0].icon;
    let dataWindSpeed = 'Wind:' + " " + data.wind.speed;
    let dataWindDirection = getWindDirection(data.wind.deg);
    let dataPressure = 'Pressure:' + " " + data.main.pressure + ' ' + "mmHg";


    document.querySelector('.cityName').innerHTML = dataNameOut;
    document.querySelector('.temp').innerHTML = dataTempOut;
    document.querySelector('.description').innerHTML = dataDescription;
    document.querySelector('.iconWeather').src = `http://openweathermap.org/img/wn/${dataIcon}.png`;
    document.querySelector('.windSpeed').innerHTML = dataWindSpeed;
    document.querySelector('.windDirec').innerHTML = dataWindDirection;
    document.querySelector('.pressure').innerHTML = dataPressure;
}

getWeather();
document.querySelector('.form-select').onchange = getWeather;