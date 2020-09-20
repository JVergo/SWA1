//Event
function dEvent(place)
{
    const options = {place}
    let d = new Date()
    options.t = d.toLocaleTimeString(); //perhaps use this method to set the date at object creation
    function getTime() { return options.t }
    function getPlace() { return options.place }
    function toString() 
    {
        return `Place: ${getPlace()}, Time - ${getTime()}`
    }

    return {...options, getTime, getPlace, toString }
}

console.log("Event Test")
let time1 = dEvent("Copenhagen") //how to pass time into the object?
console.log(time1.toString())
console.log()

//DataType
function dataType(type, unit) 
{
    const options = {type, unit}
    //let types = ["temperature", "precipitation", "wind", "cloud"]
    function getType() {  return options.type }
    function getUnit() { return options.unit }
    function toString() 
    {
        return `Type: ${getType()}, Units: ${getUnit()}`
    }

    return {...options, getType, getUnit, toString }
}

console.log("DataType Test")
let dT = dataType("cloud", "Fahrenheit")
console.log(dT.toString())
console.log(dT.getType())
console.log()

//WeatherPrediction
function weatherPrediction(dEvent, dataType, fromNumber, toNumber)
{
    //inherit the time and then add to it because it is a prediction
    const options = {fromNumber, toNumber} //raw variables
    function getNumberFrom() { return options.fromNumber }
    function getNumberTo() { return options.toNumber }

    //Object.assign(options, dEvent(options.place), dataType(options.type, options.unit))
    //Assigns everything from inside the passed parameters to the leftmost object.
    Object.assign(options, dEvent, dataType)
    function toString() 
    {
        return options.getPlace() + " " + options.getTime() + " " + options.getType() + " " + 
        options.getUnit() + " From: " + options.fromNumber + " To: " + options.toNumber
    }

    return {...options, getNumberFrom, getNumberTo, toString }
}

console.log("WeatherPrediction Test")
let wp = weatherPrediction(time1, dT, 13, 20)
//how do I pass the object values into the subclass?
console.log(wp.toString())
console.log(wp.getNumberFrom())

console.log()

//TemperaturePrediction
function tempPrediction(weatherPrediction) //is there a way to get to and from wp
{
    const options = {}
    Object.assign(options, weatherPrediction)
    function convertToF() 
	{ 
        options.fromNumber = (options.fromNumber * 1.8) + 32
        options.toNumber = (options.toNumber * 1.8) + 32
	}
	function convertToC() 
	{ 
        options.fromNumber = (options.fromNumber - 32) / 1.8 
        options.toNumber = (options.toNumber - 32) / 1.8 
    }
    function toString()
    {
        return options.fromNumber + " " + options.toNumber 
    }

    //Object.assign(options, weatherPrediction(options.fromNumber, options.toNumber))
    
    return { ...options, convertToC, convertToF, toString }
}

console.log("Temp test")
let tp = tempPrediction(wp)
console.log(tp.toString())
tp.convertToF()
console.log(tp.toString())
console.log(tp.fromNumber)
console.log()

//PrecipitationPrediction
function precipPrediction(weatherPrediction)
{
    const options = {}
    Object.assign(options, weatherPrediction)
    //Return type of string array, it is possible to have different kinds of precip in one day
    function types() //the type is established in the super class datatype?  compares boolean
    {
        let precip = ["rain", "sleet", "snow", "hail"]
        return precip;
    }
    function convertToInches()
    {
        options.fromNumber = options.fromNumber / 25.4
        options.toNumber = options.toNumber / 25.4
    }
    function convertToMM()
    {
        options.fromNumber = options.fromNumber * 25.4
        options.toNumber = options.toNumber * 25.4
    }
    function toString()
    {
        return options.fromNumber + " " + options.toNumber
    }

    //Object.assign(options, weatherPrediction(options.fromNumber, options.toNumber))    
    return { ...options, types, convertToInches, convertToMM, toString }
}

console.log("Precip test")
let pp = precipPrediction(wp)
console.log(pp.toString())
pp.convertToInches()
console.log(pp.toString())
console.log()

//WindPrediction
function windPrediction(weatherPrediction)
{
    const options = {}
    Object.assign(options, weatherPrediction)
    function directions()
    {
        let direction = ["north", "south", "east", "west"]
        return direction
    }
    function convertToMPH()
    {
        options.fromNumber = options.fromNumber * 2,237
        options.toNumber = options.toNumber * 2,237
    }
    function convertToMS()
    {
        options.fromNumber = options.fromNumber / 2,237
        options.toNumber = options.toNumber / 2,237
    }
    function toString()
    {
        return options.fromNumber + " " + options.toNumber
    }

    //Object.assign(options, weatherPrediction(options.fromNumber, options.toNumber))  
    return { ...options, directions, convertToMPH, convertToMS, toString }
}

console.log("Wind test")
let wwp = windPrediction(wp)
console.log(wwp.toString())
wwp.convertToMPH()
console.log(wwp.toString())
console.log()

//CloudPrediction
function cloudPrediction(weatherPrediction)
{
    const options = {}
    Object.assign(options, weatherPrediction)
    
    function coverage()
    {
        let clouds = ["no clouds", "partly cloudy", "overcast"]
        return clouds
    }
    function toString()
    {
        return options.fromNumber + " " + options.toNumber
    }

    return { ...options, coverage, toString }
}

//DateInterval
function dateInterval(from, to)
{
    function fromDate() { return from }
    function toDate() { return to }
    function contains(d) {
        if(d >= fromDate || d <= toDate)
        {
            return true
        }	
        else
        {
            return false
        }
	}

	return { toDate, fromDate, contains }
}

//WeatherForecast
function weatherForecast(data)
{
    let forecastArray = []

    function getWeatherForecast(data)
    {
        //returns the forecast
        //forecastArray.forEach(forecast => console.log(forecast))
        return forecastArray[data]
    }
    function add(data)
    {
        //adds predictions to the WeatherPrediction array
        forecastArray.push(data)
    }
    function data()
    {
        //returns a single prediction? 
        //return forecastArray[index]
        return forecastArray.forEach(forecast => console.log(forecast))
    }
    function getCurrentPlace() 
    {
        return data.getPlace()
    }
    function clearCurrentPlace() {}
    function getCurrentType() {}
    function clearCurrentType() {}
    function getCurrentPeriod() {}
    function clearCurrentPeriod() {}
    // setCurrentPeriod()

    return { getWeatherForecast, add, data }
}

let wf = weatherForecast(wp)
wf.add(wp)
console.log(wf.data())
//console.log(wf.data(0))

//     function WeatherEvent(place) {
//     const event = { timeECMA: new Date().toLocaleDateString(), place };

//     event.getTime = () => {
//         return event.timeECMA;
//     };

//     event.getPlace = () => {
//         return event.place;
//     }

//     event.setPlace = (newPlace) => {
//         event.place = newPlace;
//     }

//     event.setTime = (newTime) => {
//         event.time = newTime;
//     }

//     function toString() {
//         return `Place: ${getPlace()}, Time - ${getTime()}`;
//     }

//     return event;
// }

// function dataType(unit, type) {
//     const dataType = { unit: unit, type: type };

//     dataType.getUnit = () => {
//         return dataType.unit;
//     }

//     dataType.getType = () => {
//         return dataType.type;
//     }

//     dataType.setType = (newType) => {
//         dataType.type = newType;
//     }

//     dataType.setUnit = (newUnit) => {
//         dataType.type = newUnit;
//     }

//     return dataType;
// }

// function WeatherData(dataType, event, number, direction) {
//     const weatherData = { number: number, direction: direction };

//     function getDataType() {
//         return weatherData.dataType;
//     }

//     function getEvent() {
//         return weatherData.event;
//     }

//     function getNumber() {
//         return weatherData.number;
//     }

//     function getDirection() {
//         return weatherData.direction;
//     }

//     // ASSIGNS EVERYTHING FROM INSIDE THE PASSED IN OBJECTS TO THE LEFT MOST PARAMETER
//     Object.assign(weatherData, dataType, event);

//     return { ...weatherData, getDataType, getEvent, getNumber, getDirection };
// }
// const dT = dataType('mm', 'international');
// const wE = WeatherEvent('Horsens')
// const wD1 = WeatherData(dT, wE, 1, 'NW');
// console.log('test dataType & WeatherEvent DONE');
// console.log();

// // console.log(wD1);
// console.log(wD1.getTime());
// console.log(wD1.getPlace());
// console.log(wD1.getType());
// console.log(wD1.getUnit());
// console.log(wD1.number);
// console.log(wD1.direction);
// console.log('test WeatherData DONE');
// console.log();

// function Temperature(weatherData) {
//     // (0°C × 9/5) + 32 = 32°F
//     function convertToF() {
//         if (weatherData.type == 'international') {
//             weatherData.number = weatherData.number * (9 / 5) + 32;
//             weatherData.unit = 'fahrenheit';
//             weatherData.type = 'us';
//         };
//     };

//     // (32°F − 32) × 5/9 = 0°C
//     function convertToC() {
//         if (weatherData.type == 'us') {
//             weatherData.number = (weatherData.number - 32) * (5 / 9);
//             weatherData.unit = 'celsius';
//             weatherData.type = 'international';
//         };
//     };

//     return {convertToF, convertToC};
// }

// function Precipitation(weatherData) {
//     function precipitationType() {
//         return weatherData.dataType;
//     }

//     function convertToInches() {
//         if (weatherData.type == 'international') {
//             weatherData.number = (weatherData.number / 25.4);
//             weatherData.unit = 'inches';
//             weatherData.type = 'us'
//         }
//     };

//     function convertToMM() {
//         if (weatherData.type == 'us') {
//             weatherData.number = (weatherData.number * 0.0393701);
//             weatherData.unit = 'mm';
//             weatherData.type = 'international'
//         }
//     };

//     return {convertToInches, convertToMM}
// }

// function Wind(weatherData) {
//     function getDirection() {
//         return weatherData.direction;
//     };

//     function convertToMPH() {
//         if (weatherData.type == 'international') {
//             weatherData.number = (weatherData.number * 0.44704);
//             weatherData.unit = 'mph';
//             weatherData.type = 'us';
//         }
//     };

//     function convertToMS() {
//         if (weatherData.type == 'us') {
//             weatherData.number = (weatherData.number / 2.23694)
//             weatherData.unit = 'ms';
//             weatherData.type = 'international'
//         }
//     };

//     return {getDirection, convertToMPH, convertToMS}
// }

// function CloudCoverage(weatherData) {
//     function coverageType() {
//         return weatherData.unit;
//     }

//     return {coverageType}
// }

// function TemperatureData(weatherData) {
//     const temperatureData = {};
//     Object.assign(temperatureData, weatherData);
//     return { ...temperatureData, ...Temperature(weatherData) };
// }

// let wD2 = WeatherData(dT, wE, 1);
// let wD_TD = TemperatureData(wD2);
// console.log(wD_TD.getType());
// console.log(wD_TD.getPlace());
// console.log(wD_TD.number);
// console.log('test WeatherData DONE')
// console.log()

// function PrecipitationData(weatherData) {
//     let precipitationData = {};
//     Object.assign(precipitationData, weatherData);
//     return { ...precipitationData, ...Precipitation(weatherData) };
// }

// function WindData(weatherData) {
//     let windData = {};
//     Object.assign(windData, weatherData);
//     return { ...windData, ...Wind(weatherData) };
// }

// function CloudCoverageData(weatherData) {
//     let cloudCoverage = {};
//     Object.assign(cloudCoverage, weatherData);
//     return { ...cloudCoverage, ...CloudCoverage(weatherData) };
// }

// function WeatherHistory(currentType, currentPlace, weatherDataArr) {
//     const weatherHistory = { weatherDataArr, currentPlace, currentType };

//     weatherHistory.getCurrentPlace = () => {
//         return weatherHistory.currentPlace;
//     };

//     weatherHistory.getCurrentType = () => {
//         return weatherHistory.currentType;
//     }

//     weatherHistory.setCurrentType = (newType) => {
//         //helper method 1
//         function convertToUS(weatherData) {
//             if (weatherData.getType() == 'temperature')
//                 weatherData.convertToF();
//             else if (weatherData.getType() == 'precipitation')
//                 weatherData.convertToInches();
//             else if (weatherData.getType() == 'wind')
//                 weatherData.convertToMPH();
//         }

//         //helper method 2
//         function convertToInternational(weatherData) {
//             if (weatherData.getType() == 'temperature')
//                 weatherData.convertToC();
//             else if (weatherData.getType() == 'precipitation')
//                 weatherData.convertToMM();
//             else if (weatherData.getType() == 'wind')
//                 weatherData.convertToMS();
//         }

//         // execution
//         if (weatherHistory.currentType == 'us' && newType == 'international')
//         {
//             weatherDataArr.forEach(convertToInternational);
//             weatherHistory.currentType = 'international';
//         }
//         else if (weatherHistory.currentType == 'international' && newType == 'us')
//         {
//             weatherDataArr.forEach(convertToUS);
//             weatherHistory.currentType = 'us';
//         }
//     }
//     // function setCurrentPeriod()
//     // function clearCurrentPeriod()
//     // function convertToUsUnits()
//     // function convertToInternationalUnits()
//     weatherHistory.addWeatherData = (weatherData) => {
//         if (dataArr.length == 7)
//             weatherDataArr.shift();
//         weatherDataArr.push(weatherData);
//     }

//     weatherHistory.getWeatherData = () => {
//         return weatherHistory;
//     }

//     return weatherHistory;
// }


// // testing
// const testTemp = TemperatureData(WeatherData(dataType('celsius', 'temperature'), WeatherEvent(1000000, 'Horsens'), 50));
// // console.log(testTemp);
// console.log(testTemp.getType());
// console.log(testTemp.getUnit());
// console.log(testTemp.getTime());
// console.log(testTemp.getPlace());
// console.log(testTemp.number);
// console.log(testTemp.convertToF());
// console.log('test TemperatureData DONE');
// console.log();

// const testPrecip = PrecipitationData(WeatherData(dataType('mm', 'precipitation'), WeatherEvent(1000000, 'Horsens'), 1));
// // console.log(testPrecip);
// console.log(testPrecip.getType());
// console.log(testPrecip.getUnit());
// console.log(testPrecip.getTime());
// console.log(testPrecip.getPlace());
// console.log(testPrecip.number);
// console.log('test PrecipitationData DONE');
// console.log();

// const testWind = WindData(WeatherData(dataType('ms', 'wind'), WeatherEvent(1000000, 'Horsens'), 50, 'NW'));
// // console.log(testWind);
// console.log(testWind.getType());
// console.log(testWind.getUnit());
// console.log(testWind.getTime());
// console.log(testWind.getPlace());
// console.log(testWind.number);
// console.log(testWind.direction);
// console.log('test WindData DONE');
// console.log();

// const testCloud = CloudCoverageData(WeatherData(dataType('percentage', 'cloudCoverage'), WeatherEvent(1000000, 'Horsens'), 25));
// // console.log(testCloud);
// console.log(testCloud.getType());
// // testCloud.setType('testType')
// // console.log(testCloud.getType());
// console.log(testCloud.getUnit());
// console.log(testCloud.getTime());
// console.log(testCloud.getPlace());
// console.log(testCloud.number);
// console.log('test CloudCoverageData DONE');
// console.log();

// const weatherDataArr = [testTemp, testPrecip, testWind];
// const weatherHistory = WeatherHistory('international', 'Horsens', weatherDataArr);
// console.log(weatherHistory.getCurrentPlace());
// // console.log(weatherHistory.clearCurrentPlace());
// // console.log(weatherHistory.getCurrentPlace());
// console.log(weatherHistory.getCurrentType());
// console.log(weatherHistory.setCurrentType('us'));
// console.log(weatherHistory.getCurrentType());
// // TODO: TEST REMAINING METHODS
