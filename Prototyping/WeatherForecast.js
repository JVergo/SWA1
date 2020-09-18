class WeatherForecast {
    #_currentPlace = null;
    #_currentType = null;
    #_currentPeriod = null;
    
    constructor(weatherPrediction) {
        this.WeatherPrediction = weatherPrediction;
    }

    GetCurrentPlace() {
        return this.#_currentPlace;
    }
    SetCurrentPalce(newPlace) {
        this.#_currentPlace = newPlace;
    }
    ClearCurrentPalce() {
        this.#_currentPlace = null;
    }

    GetCurrentType() {
        return this.#_currentType;
    }
    SetCurrentType(newType) {
        this.#_currentType = newType;
    }
    ClearCurrentType() {
        this.#_currentType = null;
    }

    GetCurrentPeriod() {
        return this.#_currentPeriod;
    }
    SetCurrentPeriod(newType) {
        this.#_currentPeriod = newType;
    }
    ClearCurrentPeriod() {
        this.#_currentPeriod = null;
    }

    ConvertToUsUnits() {
        for (let i = 0; i < this.WeatherPrediction.length; i++) {
            const prediction = this.WeatherPrediction[i];
            switch (prediction.GetType()) {
                case "Clouds":
                    
                    break;

                case "Precipitation":
                    prediction.ConvertToInches();
                    break;

                case "Temprature":
                    prediction.ConvertToF();
                    break;

                case "Wind":
                    prediction.ConvertToMPH();
                    break;
            
                default:
                    break;
            }
        }
    }

    ConvertToInternationalUnits() {
        for (let i = 0; i < this.WeatherPrediction.length; i++) {
            const prediction = this.WeatherPrediction[i];
            switch (prediction.GetType()) {
                case "Clouds":
                    
                    break;

                case "Precipitation":
                    prediction.ConvertToMM();
                    break;

                case "Temprature":
                    prediction.ConvertToC();
                    break;

                case "Wind":
                    prediction.ConvertToMS();
                    break;
            
                default:
                    break;
            }
        }
    }

    Add(weatherPrediction) {
        this.WeatherPrediction.push(weatherPrediction);
    }

    get Data() { return this.WeatherPrediction; }

    GetFilteredData() {
        let filteredData = this.Data;

        if(this.#_currentPlace != null)
        {
            filteredData = this.FilterName(filteredData);
        }

        if(this.#_currentType != null) {
            filteredData = this.FilterType(filteredData);
        }

        if(this.#_currentPeriod != null) {
            filteredData = this.FilterPeriod(filteredData);
        }

        return filteredData;
    }

    FilterName(filteredData) {
        let data = [];

        filteredData.forEach(d => {
            if(d.GetPalce() == this.#_currentPlace) {
                data.push(d);
            }
        });

        return data;
    }

    FilterType(filteredData) {
        let data = [];

        filteredData.forEach(t => {
            if(t.GetType() == this.#_currentType) {
                data.push(t);
            }
        });

        return data;
    }

    FilterPeriod(filteredData) {
        let data = [];

        filteredData.forEach(d => {
            if(this.#_currentPeriod.Contains(d.GetTime())) {
                data.push(d);
            }
        });

        return data;
    }
}

module.exports = WeatherForecast