const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search');
const temperature = document.querySelector('.temp');
const city = document.querySelector('.city');
const condition = document.querySelector('.condition');
const localTime = document.querySelector('.local-time');
const localDate = document.querySelector('.local-date');
const humidity = document.querySelector('.humidity');
const visibility = document.querySelector('.visibility');
const weatherResults = document.querySelector('.weather-results');
const cityTempTimeDate = document.querySelector('.city-temp-time-date');
const weatherDetails = document.querySelector('.weather-details');
const nullInput = document.querySelector('.null-input');
const invalidLocation = document.querySelector('.invalid-location');
const invalidLocationP = document.querySelector('.invalid-location p');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = searchInput.value.trim();

    if (location === ""){
        nullInput.style.display = 'flex';
        cityTempTimeDate.style.display = 'none';
        cityTempTimeDate.classList.remove('show');
        weatherDetails.style.display = 'none';
        invalidLocation.style.display = 'none';
        weatherResults.style.display = 'flex';
    } else {

        const RapidAPI = `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'dcc32fb81dmsh9c770f01600af8cp11bf0cjsn1322268445e6',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
    
        try {
            const response = await fetch(RapidAPI, options);
            const data = await response.json();
            const [date, time] = data.current.last_updated.split(" ");
            temperature.textContent = `${data.current.temp_c} °C`;
            city.textContent = data.location.name;
            condition.textContent = data.current.condition.text;
            localDate.textContent = date;
            localTime.textContent = time;
            humidity.textContent = `${data.current.humidity}%`;
            visibility.textContent = `${data.current.vis_km} Km`;
            cityTempTimeDate.style.display = 'flex';
            cityTempTimeDate.classList.add('show');
            weatherDetails.style.display = 'flex';
            nullInput.style.display = 'none';
            invalidLocation.style.display = 'none';
            weatherResults.style.display = 'flex';
    
        } catch (err) {
            console.log(err);
            weatherResults.style.display = 'flex';
            invalidLocationP.textContent = `"${location}" not found! Ensure you have the right spelling/location!`
            invalidLocation.style.display = 'flex';
            weatherDetails.style.display = 'none';
            cityTempTimeDate.style.display = 'none';
            nullInput.style.display = 'none';
        }
    }
});
