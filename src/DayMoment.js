/**
 * Represents a moment in a day
 */
class DayMoment {

  constructor(hour, minute, second) {
    this.seconds = hour * 3600 + minute * 60 + second;
  }

  /**
   * The moment in time in seconds from the beggining of the day
   */
  get seconds() {
    return this._seconds;
  }

  set seconds(seconds) {
    if (seconds < 0) {
      throw new RangeError('DayMoment cannot take on negative values.');
    } else {
      this._seconds = seconds
    }
  }
}

export default DayMoment;
