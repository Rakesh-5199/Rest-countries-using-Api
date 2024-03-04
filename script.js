var container = document.getElementById("countriesContainer");
var row = document.getElementById("countriesRow");

fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data1) => bar(data1))
    .catch((error) => console.error('Error fetching country data:', error));

async function showWeather(lat, lon, countryName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY&units=metric`);
        const data = await response.json();
        console.log(data.main.temp);
        // Example: Display temperature
        alert(`Current temperature in ${countryName}: ${data.main.temp} °C`);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function bar(data1) {
    for (var i = 0; i < data1.length; i++) {
        var col = document.createElement("div");
        col.className = "col-md-4";
        
        var country = data1[i];
        var countryName = country.name.common;
        var capital = country.capital ? country.capital[0] : "Unknown";
        var flag = country.flags.png;
        var region = country.region || "N/A";
        var countryCode = country.cca2 || "N/A";

        col.innerHTML = `
        <div class="card" style="width: 18rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div class="card-body" style="display: flex; flex-direction: column;">
                <h5 class="card-title" style="font-weight: bold; margin-bottom: 10px;">${countryName.toUpperCase()}</h5>
                <div style="background-color: #ccc; padding: 10px; text-align: center; flex-grow: 1;">
                    <img src="${flag}" class="card-img-top" style="max-width: 100%; height: auto;" alt="Flag">
                </div>
            </div>
            <div style="padding: 10px;">
                <p class="card-text" style="font-weight: bold;">Capital: ${capital}</p>
                <p class="card-text" style="font-weight: bold;">Region: ${region}</p>
                <p class="card-text" style="font-weight: bold;">Country Code: ${countryCode}</p>
                <a href="#" class="btn btn-primary" onclick="showWeather(${country.latlng[0]}, ${country.latlng[1]}, '${countryName}')">Weather</a>
            </div>
        </div>`;
    
        row.append(col);
    }
    container.append(row);
}
