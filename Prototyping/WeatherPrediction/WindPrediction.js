const WeatherPrediction = require("./Super/WeatherPrediction");

class WindPrediction extends WeatherPrediction {
    constructor(date, place, to, from, isMertic, direction) {
        super(date, place, "Wind", isMertic ? "M/S" : "MPH", to, from);
        this.IsMertic = isMertic;
        this.direction = direction;
    }

    Matches(weatherData) {
        let rangeMatch = super.Matches(weatherData);
        let match = false
        weatherData.forEach(wd => {
            if(wd.GetDirection() === this.GetDirection()) {
                match = true;
            }
        });
        
        return (match && rangeMatch ? true : false);
    }

    ConvertToMS() {
        if(!this.IsMertic)
        {
            this.IsMertic = true;
            this.SetTo(this.to / 2.237);
            this.SetFrom(this.from / 2.237);
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
            this.SetTo(this.to * 2.237);
            this.SetFrom(this.from * 2.237);
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

module.exports = WindPrediction;