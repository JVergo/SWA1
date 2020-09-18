const WeatherPrediction = require("./Super/WeatherPrediction");

class TemperaturePrediction extends WeatherPrediction {
    constructor(date, place, to, from, isMertic) {
        super(date, place, 'Temprature', isMertic ? 'C' : 'F', to, from);
        this.IsMertic = isMertic;
    }

    ConvertToC() {
        if(!this.IsMertic)
        {
            this.IsMertic = true;
            this.SetTo((this.to  - 32) * 5/9);
            this.SetFrom((this.from  - 32) * 5/9);
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
            this.SetTo((this.to * 9/5) + 32);
            this.SetFrom((this.from * 9/5) + 32);
            this.SetUnit('F');
        }
        else
        {
            console.log("Temprature is alrade in freedom units");
        }
    }
}

module.exports = TemperaturePrediction;