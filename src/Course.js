import WeeklyRepeatingPeriod from './WeeklyRepeatingPeriod';

/**
 * Represents a course the user takes
 *
 * Parameters:
 *  name (string) - The course name
 *  schedule (WeeklyRepeatingPeriod) - The weekly schedule
 */
class Course {
  constructor(name, schedule) {
    this.name = name;
    this.schedule = schedule;
  }

  /**
   * The course name
   */
  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  /**
   * The schedule of the course
   */
  get schedule() {
    return this._schedule;
  }

  set schedule(schedule) {
    this._schedule = schedule;
  }

  /**
   * Checks whether the course conflicts with another one
   *
   * Parameters:
   *  course (Course) - The course to check against
   *
   * Returns:
   *  bool - Whether the course conflicts
   */
  conflits(course) {
    return this.schedule.conflicts(course.schedule);
  }
}
