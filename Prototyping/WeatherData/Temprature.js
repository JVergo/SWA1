const WeatherData = require("./Super/WeatherData");

class Temprature extends WeatherData {
    constructor(date, place, value, isMertic) {
        super(date, place, 'Temprature', isMertic ? 'C' : 'F', value);
        this.IsMertic = isMertic;
    }

    ConvertToC() {
        if(!this.IsMertic)
        {
            this.IsMertic = true;
            this.SetValue((this.Value  - 32) * 5/9);
            this.SetUnit('C');
        }
        else
        {
            console.log("Temprature is alrade in mertic units");
        }
    }

    ConvertToF() {
        if(this.IsMertic)
        {
            this.IsMertic = false;
            this.SetValue((this.Value * 9/5) + 32);
            this.SetUnit('F');
        }
        else
        {
            console.log("Temprature is alrade in freedom units");
        }
    }
}

module.exports = Temprature;