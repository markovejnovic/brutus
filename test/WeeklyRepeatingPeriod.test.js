import {expect} from 'chai';
import WeeklyRepeatingPeriod from '../src/WeeklyRepeatingPeriod';
import DayPeriod from '../src/DayPeriod';
import DayMoment from '../src/DayMoment';

describe('WeeklyRepeatingPeriod.conflicts(other)', function() {
  it('returns true when two WeeklyRepeatingPeriods conflict', function() {
    let p1 = new WeeklyRepeatingPeriod([{
      day: 'monday',
      period: new DayPeriod(new DayMoment(0, 0, 0), new DayMoment(1, 0, 0))
    }]);
    let p2 = new WeeklyRepeatingPeriod([{
      day: 'monday',
      period: new DayPeriod(new DayMoment(0, 0, 1), new DayMoment(0, 0, 2))
    }]);
    expect(p1.conflicts(p2) && p2.conflicts(p1)).to.be.true;
  });

  it('returns false when two WeeklyRepeatingPeriods of the same time but ' +
      'different days are used', function() {
    let p1 = new WeeklyRepeatingPeriod([{
      day: 'monday',
      period: new DayPeriod(new DayMoment(0, 0, 0), new DayMoment(1, 0, 0))
    }]);
    let p2 = new WeeklyRepeatingPeriod([{
      day: 'tuesday',
      period: new DayPeriod(new DayMoment(0, 0, 1), new DayMoment(0, 0, 2))
    }]);
    expect(p1.conflicts(p2) && p2.conflicts(p1)).to.be.false;
  });

  it('returns false when two WeeklyRepeatingPeriods of different times',
      function() {
    let p1 = new WeeklyRepeatingPeriod([{
      day: 'monday',
      period: new DayPeriod(new DayMoment(0, 0, 0), new DayMoment(1, 0, 0))
    }]);
    let p2 = new WeeklyRepeatingPeriod([{
      day: 'monday',
      period: new DayPeriod(new DayMoment(1, 0, 1), new DayMoment(1, 0, 2))
    }]);
    expect(p1.conflicts(p2) && p2.conflicts(p1)).to.be.false;
  });
});
