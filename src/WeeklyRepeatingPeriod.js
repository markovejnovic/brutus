import DayPeriod from './DayPeriod';
import { compareWeekDays } from './util/weekdays';

/**
 * Represents a weekly repeating DayPeriod
 *
 * Arguments:
 *  schedule (JSON) - A list of objects with properties (string) day and
 *    (DayPeriod) period
 */

export default class WeeklyRepeatingPeriod {
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

  /**
   * Checks whether there is a conflict with another WeeklyRepeatingPeriod
   *
   * Arguments:
   *  other (WeeklyRepeatingPeriod) - The schedule to check against
   *
   * Returns:
   *  boolean - Whether the two periods conflict
   *
   * Note:
   *  This is O(n^2) at worst. There is surely a better way to do this.
   *
   * TODO:
   *  Reimplement
   */
  conflicts(other) {
    let conflicts = false;

    this.schedule.forEach((obj) => {
      other.schedule.forEach((otherObj) => {
        if (obj.day === otherObj.day && obj.period.conflicts(otherObj.period)) {
          conflicts = true;
          return;
        }
      });
    });

    other.schedule.forEach((otherObj) => {
      this.schedule.forEach((obj) => {
        if (obj.day === otherObj.day && otherObj.period.conflicts(obj.period)) {
          conflicts = true;
          return;
        }
      });
    });

    return conflicts;
  }
}
