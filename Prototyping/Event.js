class Event {
    constructor(date, place) {
        this.date = date;
        this.place = place;
    }

    GetTime() {
        return this.date;
    }

    GetPalce() {
        return this.place;
    }
}

module.exports = Event;