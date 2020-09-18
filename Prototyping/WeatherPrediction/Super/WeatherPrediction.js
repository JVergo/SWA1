const Multi = require("../../Multi");
const Event = require("../../Event");
const DataType = require("../../DataType");

class WeatherPrediction extends Multi.Inherit(Event, DataType) {
    constructor(date, place, type, unit, to, from) {
        super(date, place, type, unit);
        this.to = to;
        this.from = from;
    }

    Matches(weatherData) {
        let match = false;
        weatherData.forEach(wd => {
            if(wd.GetValue() >= this.GetTo() && wd.GetValue() <= this.GetFrom())
            {
                match = true;
            } 
        });
        return match
    }

    GetTo() {
        return this.to;
    }
    SetTo(value) {
        this.to = value;
    }

    GetFrom() {
        return this.from;
    }
    SetFrom(value) {
        this.from = value;
    }

    ToString() {
        return this.GetType() + " " + "From: " + this.GetFrom() + " " + this.GetUnit() + " To: " + this.GetTo() + " " + this.GetUnit();
    }
}

module.exports = WeatherPrediction;