// Get references to DOM elements
const searchButton = document.getElementById("searchBtn");
const locationButton = document.getElementById("locationBtn");
const cityName = document.getElementById("cityName");
const weatherDetails = document.getElementById("weatherDetails");

// Function to fetch weather data by city name
async function getDataByCity(cityName) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=214f28f38b8441c9aa923049240605&q=${cityName}&aqi=yes`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Failed to fetch data:", error);
        alert("Failed to fetch data. Please try again later.");
    }
}

// Function to fetch weather data by coordinates
async function getDataByCoords(lat, lon) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=214f28f38b8441c9aa923049240605&q=${lat},${lon}&aqi=yes`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Failed to fetch data:", error);
        alert("Failed to fetch data. Please try again later.");
    }
}

// Function to update the DOM with fetched data
function updateWeatherDetails(data) {
    if (data) {
        weatherDetails.innerHTML = `
            <div class="flex items-center justify-center mb-4">
                <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" class="w-16 h-16">
                <div class="ml-4">
                    <h3 class="text-2xl font-bold">${data.location.name}, ${data.location.region}, ${data.location.country}</h3>
                    <p class="text-lg">${data.current.condition.text}</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-800 p-4 rounded-lg">
                    <h4 class="text-xl font-semibold">Temperature</h4>
                    <p>Current: ${data.current.temp_c} °C</p>
                    <p>Feels Like: ${data.current.feelslike_c} °C</p>
                    <p>Max Temp: ${data.current.heatindex_c} °C</p>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg">
                    <h4 class="text-xl font-semibold">Wind</h4>
                    <p>Speed: ${data.current.wind_kph} kph</p>
                    <p>Direction: ${data.current.wind_dir}</p>
                    <p>Gust: ${data.current.gust_kph} kph</p>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg">
                    <h4 class="text-xl font-semibold">Pressure</h4>
                    <p>${data.current.pressure_mb} mb</p>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg">
                    <h4 class="text-xl font-semibold">Humidity</h4>
                    <p>${data.current.humidity}%</p>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg">
                    <h4 class="text-xl font-semibold">Visibility</h4>
                    <p>${data.current.vis_km} km</p>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg">
                    <h4 class="text-xl font-semibold">Air Quality</h4>
                    <p>CO: ${data.current.air_quality.co}</p>
                    <p>NO2: ${data.current.air_quality.no2}</p>
                    <p>O3: ${data.current.air_quality.o3}</p>
                    <p>PM2.5: ${data.current.air_quality.pm2_5}</p>
                    <p>PM10: ${data.current.air_quality.pm10}</p>
                </div>
            </div>
        `;
    }
}

// Event listener for the search button
searchButton.addEventListener("click", async () => {
    // Get the city name from the input field
    let input = cityName.value;
    // Fetch weather data
    const result = await getDataByCity(input);

    // Update the DOM with the fetched data
    updateWeatherDetails(result);
});

// Event listener for the location button
locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const result = await getDataByCoords(latitude, longitude);
                updateWeatherDetails(result);
            },
            (error) => {
                console.error("Error getting location:", error);
                alert("Failed to get location. Please try again later.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
