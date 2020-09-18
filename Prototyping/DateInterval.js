class DateInterval {
    constructor(to, from) {
        this.to = to;
        this.from = from;
    }

    GetTo() {
        return this.to;
    }

    GetFrom() {
        return this.from;
    }

    Contains(date) {
        return (this.from >= date && this.to <= date);
    }
}

module.exports = DateInterval;