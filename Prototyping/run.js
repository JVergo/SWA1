const WeatherHistory = require('./WeatherHistory');
const Temprature = require('./WeatherData/Temprature');
const Precipitation = require('./WeatherData/Precipitation');
const Wind = require('./WeatherData/Wind');
const ColudCoverage = require('./WeatherData/ColudCoverage');

const WeatherForecast = require('./WeatherForecast');
const TemperaturePrediction = require('./WeatherPrediction/TemperaturePrediction');
const PrecipitationPrediction = require('./WeatherPrediction/PrecipitationPrediction');
const WindPrediction = require('./WeatherPrediction/WindPrediction');
const ColudCoveragePrediction = require('./WeatherPrediction/ColudCoveragePrediction');

const DateInterval = require('./DateInterval');

console.log("Starting prototype part");

const history = new WeatherHistory([]);
const forecast = new WeatherForecast([]);

//Create places
let places = ["Horsens", "Århus", "AAlborg"];

//Create Dates
let dates = []
for (let i = 0; i < 15; i++) {
    dates.push(new Date(2000, 1, i));    
}

dates.forEach(d => {
    places.forEach(p => {
        let rand = Math.floor(Math.random() * 5);

        switch(rand) {
            case 0:
                history.Add(new Temprature(d, p, 20, true));
                forecast.Add(new TemperaturePrediction(d, p, 15, 25, true));
                break;
            case 1:
                history.Add(new Precipitation(d, p, 20, true, 'Light'));
                forecast.Add(new PrecipitationPrediction(d, p, 15, 25, true, ['Light']));
                break;
            case 2:
                history.Add(new Wind(d, p, 20, true, "North"));
                forecast.Add(new WindPrediction(d, p, 15, 25, true, ["North"]));
                break;
            case 3:
                history.Add(new ColudCoverage(d, p, 'Cloudy'));
                forecast.Add(new ColudCoveragePrediction(d, p, 'Cloudy', 'Sunny'));
                break;
        }
    });
    
});


history.SetCurrentPalce("Horsens");
history.ClearCurrentType("Wind");
history.SetCurrentPeriod(new DateInterval(dates[0], dates[1]));

console.log("\n");
console.log("\n");

forecast.SetCurrentPalce("Horsens");
console.log("Forecast");
console.log(forecast.GetFilteredData());