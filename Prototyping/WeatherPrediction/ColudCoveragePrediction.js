const WeatherPrediction = require("./Super/WeatherPrediction");

class ColudCoveragePrediction extends WeatherPrediction {
    constructor(date, place, to, from) {
        super(date, place, "Clouds", "", to, from);
    }
}

module.exports = ColudCoveragePrediction;