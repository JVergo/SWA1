const WeatherData = require("./Super/WeatherData");

class Wind extends WeatherData {
    constructor(date, place, value, isMertic, direction) {
        super(date, place, "Wind", isMertic ? "M/S" : "MPH", value);
        this.IsMertic = isMertic;
        this.direction = direction;
    }

    ConvertToMS() {
        if(!this.IsMertic)
        {
            this.IsMertic = true;
            this.SetValue(this.Value / 2.237);
            this.SetUnit("M/S");
        }
        else
        {
            console.log("Temprature is alrade in mertic units");
        }
    }

    ConvertToMPH() {
        if(this.IsMertic)
        {
            this.IsMertic = false;
            this.SetValue(this.Value * 2.237);
            this.SetUnit("MPH");
        }
        else
        {
            console.log("Temprature is alrade in freedom units");
        }
    }

    GetDirection() {
        return this.direction;
    }

    SetDirection(value) {
        this.direction = value;
    }
}

module.exports = Wind;