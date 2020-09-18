const WeatherData = require("./Super/WeatherData");

class Precipitation extends WeatherData {
    constructor(date, place, value, isMertic, precipitationType) {       
        super(date, place, "Precipitation", isMertic ? "MM" : "Inches", value);
        this.IsMertic = isMertic;
        this.PrecipitationType = precipitationType;
    }

    ConvertToMM() {
        if(!this.IsMertic)
        {
            this.IsMertic = true;
            this.SetValue(this.Value * 25.4);
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
            this.SetValue(this.Value / 25.4);
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

module.exports = Precipitation