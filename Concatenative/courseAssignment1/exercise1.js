//Event
function dEvent(place)
{
    const options = {place}
    let d = new Date()
    let t = d.toLocaleTimeString();
    function getTime() { return t }
    function getPlace() { return place }
    function toString() 
    {
        return `Place: ${getPlace()}, Time - ${getTime()}`
    }

    return {...options, getTime, getPlace, toString }
}

//DataType
function dataType(type, unit) 
{
    const options = {type, unit}
    let types = ["temperature", "precipitation", "wind", "cloud"]
    function getType() 
    { 
        if(types.includes(type))
        {
            return type
        }
        else
        {
            return "Not an acceptable data type."
        }
    }
    function getUnit() { return unit }
    function toString() 
    {
        return `Type: ${getType()}, Units: ${getUnit()}`
    }

    return {...options, getType, getUnit, toString }
}

console.log("Event Test")
let time1 = dEvent("Copenhagen")
console.log(time1.toString())
console.log()

console.log("DataType Test")
let dT = dataType("cloud", "Fahrenheit")
console.log(dT.toString())
console.log(dT.getType())
console.log()

//WeatherPrediction
function weatherPrediction(place, type, unit, fromNumber, toNumber)
{
    //inherit the time and then add to it because it is a prediction
    const options = {place, type, unit}
    function numberFrom() { return fromNumber }
    function numberTo() { return toNumber }
    function toString() 
    {
        return "Place: " + place + " Type: " + type + " Unit: " + unit + " From: " + 
        fromNumber + " To: " + toNumber
    }

    Object.assign(options, dEvent(options.place), dataType(options.type, options.unit))
    return {...options, numberTo, numberFrom, toString }
}

console.log("WeatherPrediction Test")
let wp = weatherPrediction("Aarhus", "temperature", "Celsius", 13, 20)
console.log(wp.toString())
console.log(wp.numberFrom())
console.log()

//TemperaturePrediction
function tempPrediction(fromNumber, toNumber) //is there a way to get to and from wp
{
    const options = {fromNumber, toNumber}
    function convertToF() 
	{ 
        fromNumber = (fromNumber * 1.8) + 32
        toNumber = (toNumber * 1.8) + 32
	}
	function convertToC() 
	{ 
        fromNumber = (fromNumber - 32) / 1.8 
        toNumber = (toNumber - 32) / 1.8 
    }
    function toString()
    {
        return fromNumber + " " + toNumber + " " 
    }

    Object.assign(options, weatherPrediction(options.fromNumber, options.toNumber))
    return { ...options, convertToC, convertToF, toString }
}

console.log("Temp test")
let tp = tempPrediction(13, 20)
console.log(tp.toString())
tp.convertToF()
console.log(tp.toString())
console.log(tp.numberTo())

//PrecipitationPrediction
function precipPrediction(precip, fromNumber, toNumber)
{
    //let precip = ["rain", "sleet", "snow", "hail"]
    //Return type of string array, it is possible to have different kinds of precip in one day
    function types(precip)
    {
        return null;
    }
    function convertToInches()
    {
        fromNumber = fromNumber / 25.4
        toNumber = toNumber / 25.4
    }
    function convertToMM()
    {
        fromNumber = fromNumber * 25.4
        toNumber = toNumber * 25.4
    }
    function toString()
    {
        return fromNumber + " " + toNumber + " " 
    }

    return { convertToInches, convertToMM }
}

//WindPrediction
function windPrediction(number)
{
    let direction = ["north", "south", "east", "west"]
    function directions()
    {

    }
    function convertToMPH()
    {
        number = number * 2,237
    }
    function convertToMS()
    {
        number = number / 2,237
    }

    return { convertToMPH, convertToMS }
}

//CloudPrediction
function cloudPrediction(number)
{
    let clouds = ["no clouds", "partly cloudy", "overcast"]
    function coverage()
    {

    }

    return { coverage }
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
function weatherForecast()
{
    function weatherForecast(data)
    {
        //returns the forecast
    }
    function add(data)
    {
        //adds predictions to the WeatherPrediction array
    }
    function data()
    {
        //returns a single prediction?
    }
    function getCurrentPlace() {}
    function clearCurrentPlace() {}
    function getCurrentType() {}
    function clearCurrentType() {}
    function getCurrentPeriod() {}
    function clearCurrentPeriod() {}
    // setCurrentPeriod()
}