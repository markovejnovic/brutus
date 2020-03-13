import DayMoment from './DayMoment';

const TIME_START_TOO_BIG_ERROR = 'The specified startTime is larger than ' +
  'timeStop.';

const TIME_STOP_TOO_SMALL_ERROR = 'The specified stopTime is smaller than ' +
  'timeStart.';

/**
 * Represents a time period in a day
 *
 * Parameters:
 *  timeStart (DayMoment) - The time the period starts at in a day
 *  timeStop (DayMoment) - The time the period stops at in a day
 */
class TimePeriod {
  constructor(timeStart, timeStop) {
    this._timeStart = timeStart;
    this._timeStop = timeStop;
  }

  /**
   * The time at which the period begins
   */
  get timeStart() {
    return this._timeStart;
  }

  set timeStart(start) {
    if (this._timeStop && start.seconds >= this.timeStop.seconds) {
      throw new RangeError(TIME_START_TOO_BIG_ERROR);
    }
    this._timeStart = start;
  }

  /**
   * The time at which the period stops
   */
  get timeStop() {
    return this._timeStop;
  }

  set timeStop(stop) {
    if (this._timeStart && stop.seconds <= this.timeStart.seconds) {
      throw new RangeError(TIME_STOP_TOO_SMALL_ERROR);
    }
    this._timeStop = stop;
  }

  /**
   * Returns the length in seconds of the time period
   */
  get length() {
    return this.timeStop.seconds - this.timeStart.seconds;
  }

  /**
   * Sets a new period
   *
   * Arguments:
   *  start (DayMoment) - The beginning time of the period
   *  stop (DayMoment) - The end of the period
   */
  setPeriod(start, stop) {
    this._timeStart = null;
    this._timeStop = null;

    this.timeStart = start;
    this.timeStop = stop;
  }

  /**
   * Checks whether the DayMoment is in this
   *
   * Arguments:
   *  moment (DayMoment) - The time moment to check against
   *
   * Returns:
   *  bool - Whether the time moment is in this time period
   */
  isMomentIn(moment) {
    let mSecs = moment.seconds;

    return this.timeStart.seconds <= mSecs && mSecs <= this.timeStop.seconds;
  }

  /**
   * Checks whether two time periods conflict
   *
   * Parameters:
   *  period (TimePeriod) - The time period to check against
   *
   * Returns:
   *  bool - Whether two time periods conflict
   */
  conflicts(period) {
    return this.isMomentIn(period.timeStart) || this.isMomentIn(period.timeStop);
  }
}

export default TimePeriod;
