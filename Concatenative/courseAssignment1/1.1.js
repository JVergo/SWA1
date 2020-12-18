function WeatherEvent(place) {
    const event = { time: new Date().toLocaleDateString(), place };

    function getTime() {
        return event.time;
    };

    function getPlace() {
        return event.place;
    }

    function setPlace(newPlace) {
        event.place = newPlace;
    }

    function setTime(newTime) {
        event.time = newTime;
    }

    function toString() {
        return `Place: ${getPlace()}, Time - ${getTime()}`;
    }

    return { ...event, getTime, getPlace, setPlace, setTime, toString }
}

function dataType(unit, type) {
    const dataType = { unit: unit, type: type };

    function getUnit() {
        return dataType.unit;
    }

    function getType() {
        return dataType.type;
    }

    function setType(newType) {
        dataType.type = newType;
    }

    function setUnit(newUnit) {
        dataType.type = newUnit;
    }

    return { ...dataType, getUnit, getType, setType, setUnit }
}

function WeatherData(dataType, event, number, direction) {
    const weatherData = { number: number, direction: direction };

    function getDataType() {
        return weatherData.dataType;
    }

    function getEvent() {
        return weatherData.event;
    }

    function getNumber() {
        return weatherData.number;
    }

    function getDirection() {
        return weatherData.direction;
    }

    // ASSIGNS EVERYTHING FROM INSIDE THE PASSED IN OBJECTS TO THE LEFT MOST PARAMETER
    Object.assign(weatherData, dataType, event);

    return { ...weatherData, getDataType, getEvent, getNumber, getDirection };
}
const dT = dataType('mm', 'international');
const wE = WeatherEvent('Horsens');
const wD1 = WeatherData(dT, wE, 1, 'NW');
console.log('test dataType & WeatherEvent DONE');
console.log();

// console.log(wD1);
console.log(wD1.getTime());
console.log(wD1.getPlace());
console.log(wD1.getType());
console.log(wD1.getUnit());
console.log(wD1.number);
console.log(wD1.direction);
console.log('test WeatherData DONE');
console.log();

function Temperature(weatherData) {
    // (0°C × 9/5) + 32 = 32°F
    function convertToF() {
        if (weatherData.type == 'international') {
            weatherData.number = weatherData.number * (9 / 5) + 32;
            weatherData.unit = 'fahrenheit';
            weatherData.type = 'us';
        }
    }

    // (32°F − 32) × 5/9 = 0°C
    function convertToC() {
        if (weatherData.type == 'us') {
            weatherData.number = (weatherData.number - 32) * (5 / 9);
            weatherData.unit = 'celsius';
            weatherData.type = 'international';
        }
    }

    return { convertToF, convertToC };
}

function Precipitation(weatherData) {
    function precipitationType() {
        return weatherData.dataType;
    }

    function convertToInches() {
        if (weatherData.type == 'international') {
            weatherData.number = (weatherData.number * 0.0393701);
            weatherData.unit = 'inches';
            weatherData.type = 'us'
        }
    }

    function convertToMM() {
        if (weatherData.type == 'us') {
            weatherData.number = (weatherData.number / 0.0393701);
            weatherData.unit = 'mm';
            weatherData.type = 'international'
        }
    }

    return { convertToInches, convertToMM }
}

function Wind(weatherData) {
    function getDirection() {
        return weatherData.direction;
    }

    function convertToMPH() {
        if (weatherData.type == 'international') {
            weatherData.number = (weatherData.number * 0.44704);
            weatherData.unit = 'mph';
            weatherData.type = 'us';
        }
    }

    function convertToMS() {
        if (weatherData.type == 'us') {
            weatherData.number = (weatherData.number / 2.23694)
            weatherData.unit = 'ms';
            weatherData.type = 'international'
        }
    }

    return { getDirection, convertToMPH, convertToMS }
}

function CloudCoverage(weatherData) {
    function coverageType() {
        return weatherData.unit;
    }

    return { coverageType }
}

function TemperatureData(weatherData) {
    const temperatureData = {};
    Object.assign(temperatureData, weatherData);
    return { ...temperatureData, ...Temperature(weatherData) };
}

let wD2 = WeatherData(dT, wE, 1);
let wD_TD = TemperatureData(wD2);
console.log(wD_TD.getType());
console.log(wD_TD.getPlace());
console.log(wD_TD.number);
console.log('test WeatherData DONE')
console.log()

function PrecipitationData(weatherData) {
    let precipitationData = {};
    Object.assign(precipitationData, weatherData);
    return { ...precipitationData, ...Precipitation(weatherData) };
}

function WindData(weatherData) {
    let windData = {};
    Object.assign(windData, weatherData);
    return { ...windData, ...Wind(weatherData) };
}

function CloudCoverageData(weatherData) {
    let cloudCoverage = {};
    Object.assign(cloudCoverage, weatherData);
    return { ...cloudCoverage, ...CloudCoverage(weatherData) };
}

function WeatherHistory(currentType, currentPlace, weatherDataArr) {
    const weatherHistory = { weatherDataArr, currentPlace, currentType };

    function getCurrentPlace() {
        return weatherHistory.currentPlace;
    }

    function setCurrentPlace(newPlace) {
        //helper method 1
        function changePlace(weatherData) {
            weatherData.setPlace(newPlace);
        }

        weatherHistory.weatherDataArr.forEach(changePlace);
        weatherHistory.currentPlace = newPlace;
    }

    function getCurrentType() {
        return weatherHistory.currentType;
    }

    function setCurrentType(newType) {
        //helper method 1
        function convertToUS(weatherData) {
            if (weatherData.getType() == 'temperature')
                weatherData.convertToF();
            else if (weatherData.getType() == 'precipitation')
                weatherData.convertToInches();
            else if (weatherData.getType() == 'wind')
                weatherData.convertToMPH();
        }

        //helper method 2
        function convertToInternational(weatherData) {
            if (weatherData.getType() == 'temperature')
                weatherData.convertToC();
            else if (weatherData.getType() == 'precipitation')
                weatherData.convertToMM();
            else if (weatherData.getType() == 'wind')
                weatherData.convertToMS();
        }

        // execution
        if (weatherHistory.currentType == 'us' && newType == 'international') {
            weatherHistory.weatherDataArr.forEach(convertToInternational);
            weatherHistory.currentType = 'international';
        }
        else if (weatherHistory.currentType == 'international' && newType == 'us') {
            weatherHistory.weatherDataArr.forEach(convertToUS);
            weatherHistory.currentType = 'us';
        }
    }
    // function setCurrentPeriod()
    // function clearCurrentPeriod()
    // function convertToUsUnits()
    // function convertToInternationalUnits()
    function addWeatherData(weatherData) {
        if (weatherHistory.weatherDataArr.length == 7)
            weatherHistory.weatherDataArr.shift();
        // pushing a stream of objects into the array
        weatherHistory.weatherDataArr.push(...weatherData);
    }

    function getWeatherData() {
        return weatherHistory;
    }

    return { ...weatherHistory, getCurrentPlace, setCurrentPlace, getCurrentType, setCurrentType, addWeatherData, getWeatherData }
}


// testing
const testTemp = TemperatureData(WeatherData(dataType('celsius', 'temperature'), WeatherEvent('Horsens'), 50));
// console.log(testTemp);
console.log(testTemp.getType());
console.log(testTemp.getUnit());
console.log(testTemp.getTime());
console.log(testTemp.getPlace());
console.log(testTemp.number);
console.log(testTemp.convertToF());
console.log('test TemperatureData DONE');
console.log();

const testPrecip = PrecipitationData(WeatherData(dataType('mm', 'precipitation'), WeatherEvent('Horsens'), 1));
// console.log(testPrecip);
console.log(testPrecip.getType());
console.log(testPrecip.getUnit());
console.log(testPrecip.getTime());
console.log(testPrecip.getPlace());
console.log(testPrecip.number);
console.log('test PrecipitationData DONE');
console.log();

const testWind = WindData(WeatherData(dataType('ms', 'wind'), WeatherEvent('Horsens'), 50, 'NW'));
// console.log(testWind);
console.log(testWind.getType());
console.log(testWind.getUnit());
console.log(testWind.getTime());
console.log(testWind.getPlace());
console.log(testWind.number);
console.log(testWind.direction);
console.log('test WindData DONE');
console.log();

const testCloud = CloudCoverageData(WeatherData(dataType('percentage', 'cloudCoverage'), WeatherEvent('Horsens'), 25));
// console.log(testCloud);
console.log(testCloud.getType());
console.log(testCloud.getUnit());
console.log(testCloud.getTime());
console.log(testCloud.getPlace());
console.log(testCloud.number);
console.log('test CloudCoverageData DONE');
console.log();

const weatherDataArr = [testTemp, testPrecip, testWind];
const weatherHistory = WeatherHistory('international', 'Horsens', weatherDataArr);
// console.log(weatherHistory);
console.log(weatherHistory.getCurrentPlace());
console.log(weatherHistory.getCurrentType());
weatherHistory.setCurrentType('us');
console.log(weatherHistory.getCurrentType());
console.log(weatherHistory.getCurrentPlace());
weatherHistory.setCurrentPlace('USA');
console.log(weatherHistory.getCurrentPlace());

console.log(weatherHistory.getWeatherData());
const weatherDataArr2 = [testTemp, testPrecip, testWind];
weatherHistory.addWeatherData(weatherDataArr2);
console.log(weatherHistory.getWeatherData());