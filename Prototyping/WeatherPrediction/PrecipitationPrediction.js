const WeatherPrediction = require("./Super/WeatherPrediction");

class PrecipitationPrediction extends WeatherPrediction {
    constructor(date, place, to, from, isMertic, precipitationType) {       
        super(date, place, "Precipitation", isMertic ? "MM" : "Inches", to, from);
        this.IsMertic = isMertic;
        this.PrecipitationType = precipitationType;
    }

    Matches(weatherData) {
        let rangeMatch = super.Matches(weatherData);
        let match = false
        weatherData.forEach(wd => {
            if(wd.GetPrecipitationType() === this.GetPrecipitationType()) {
                match = true;
            }
        });
        
        return (match && rangeMatch ? true : false);
    }

    ConvertToMM() {
        if(!this.IsMertic)
        {
            this.IsMertic = true;
            this.SetTo(this.to * 25.4);
            this.SetFrom(this.from * 25.4);
            this.SetUnit("MM");
        }
        else
        {
            console.log("Temprature is alrade in mertic units");
        }
    }

    ConvertToInches() {
        if(this.IsMertic)
        {
            this.IsMertic = false;
            this.SetTo(this.to / 25.4);
            this.SetFrom(this.from / 25.4);
            this.SetUnit("Inches");
        }
        else
        {
            console.log("Temprature is alrade in freedom units");
        }
    }

    GetPrecipitationType() {
        return this.PrecipitationType;
    }
    SetPrecipitationType(value) {
        this.PrecipitationType = value;
    }
}

module.exports = PrecipitationPrediction