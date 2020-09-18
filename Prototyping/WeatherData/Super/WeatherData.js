const Event = require("../../Event");
const DataType = require("../../DataType");
const Multi = require("../../Multi");

class WeatherData extends Multi.Inherit(Event, DataType) {
    constructor(date, place, type, unit, value) {
        super(date, place, type, unit);
        this.Value = value;
    }

    GetValue(){
        return this.Value;
    }
    
    SetValue(value) {
        this.Value = value;
    }
}

module.exports = WeatherData;