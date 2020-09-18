class DataType {
    constructor(type, unit) {
        this.type = type;
        this.unit = unit;
    }

    GetType() {
        return this.type;
    }

    GetUnit() {
        return this.unit;
    }

    SetUnit(value) {
        this.unit = value;
    }
}

module.exports = DataType;