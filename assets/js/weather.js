
// start weather


findLocation();

function findLocation(){
    $.ajax({
        url: "https://geolocation-db.com/jsonp",
        jsonpCallback: "callback",
        dataType: "jsonp",
        success: function(location) {
            getWeather(location.country_name);
        }
    });
}


function getWeather(location){


    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://community-open-weather-map.p.rapidapi.com/weather?q=${location}&lat=0&lon=0&callback=test&id=2172797&lang=null&units=imperial&mode=xml`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "3dc1a5e9b7msh7b9b73e36775f80p149c82jsn11e81a626521",
            "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        let weather = JSON.parse(response.substring(5,response.length - 1));
        console.log(weather);
        let weatherHTML = `
            <div class="d-flex flex-column">
                <div class="text-center fs-1 p-4">
                    ${weather.name} <i class="text-danger fa-solid fa-location-dot"></i>
                </div>
                <div class="text-center fs-2">
                    <span>${Math.round(FirToCil(weather.main.feels_like))}°</span>
                    <span class="text-capitalize">${weather.weather[0].description}</span>
                </div>
                <div class="d-flex flex-row text-center h-100 pt-4 fs-5">
                    <div class="col-4 border-end">
                        Humadity: <span class="text-bold">${weather.main.humidity}%</span>
                    </div>
                    <div class="col-4 border-end">
                        <i class="fa-solid fa-wind me-2"></i> Wind Speed: <span class="text-bold">${weather.wind.speed}km/h</span>
                    </div>
                    <div class="col-4">
                        Pressure: <span class="text-bold">${weather.main.pressure} hPa</span>
                    </div>
                </div>
            </div>
        `;
        $('.Weather').html(weatherHTML);
    });
}

function FirToCil(cil){
    return (cil-32) * 5/9;
}