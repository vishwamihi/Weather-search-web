//Code By Vishwa Mihiranga - Coding Club bandaranayake College Gampaha

const apiKey = '2d61a72574c11c4f36173b627f8cb177';
async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const city = cityInput.value;

    if (!city) {
        weatherInfo.innerHTML = '<p class="alert alert-danger">Please enter a city name.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            weatherInfo.innerHTML = '<p class="alert alert-danger">City not found. Please try again.</p>';
        } else {
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            const temperature = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like);
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            weatherInfo.innerHTML = `
                <div class="weather-card">
                    <div class="text-center">
                        <img src="${iconUrl}" alt="Weather icon" class="weather-icon">
                        <div class="temperature">${temperature}°C</div>
                        <div class="description">${data.weather[0].description}</div>
                        <div class="location">${data.name}, ${data.sys.country}</div>
                    </div>
                    <div class="details mt-3">
                        <div class="detail">
                            <i class="fas fa-thermometer-half"></i>
                            <div>Feels like</div>
                            <div>${feelsLike}°C</div>
                        </div>
                        <div class="detail">
                            <i class="fas fa-tint"></i>
                            <div>Humidity</div>
                            <div>${humidity}%</div>
                        </div>
                        <div class="detail">
                            <i class="fas fa-wind"></i>
                            <div>Wind</div>
                            <div>${windSpeed} m/s</div>
                        </div>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        weatherInfo.innerHTML = '<p class="alert alert-danger">An error occurred. Please try again.</p>';
        console.error('Error:', error);
    }
}

document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});