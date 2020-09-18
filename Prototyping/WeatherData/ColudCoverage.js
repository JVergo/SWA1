const WeatherData = require("./Super/WeatherData");

class CloudCoverage extends WeatherData {
    constructor(date, place, value) {
        super(date, place, "Clouds", "", value);
    }
}

module.exports = CloudCoverage;