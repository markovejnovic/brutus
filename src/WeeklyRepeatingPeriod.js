import DayPeriod from './DayPeriod';
import { compareWeekDays } from './util/weekdays';

/**
 * Represents a weekly repeating DayPeriod
 *
 * Arguments:
 *  schedule (JSON) - A list of objects with properties (string) day and
 *    (DayPeriod) period
 */

class WeeklyRepeatingPeriod {
  constructor(schedule) {
    this.schedule = schedule;
  }

  /**
   * The ordered schedule
   */
  get schedule() {
    return this._schedule;
  }

  /**
   * Sets the weekly repeating DayPeriod
   *
   * Arguments:
   *  schedule (JSON) - A list of objects with properties (string) day and
   *    (DayPeriod) period
   *
   * Note:
   *  For example, you would call this as this.setJsonSchedule([{day: "monday",
   *    period: new DayPeriod(...)}, {day: "...", period: ...}])
   */
  set schedule(schedule) {
    this._schedule = schedule.sort((a, b) => {
      compareWeekDays(a.day, b.day);
    });
  }
}
