import {expect} from 'chai';
import DayPeriod from '../src/DayPeriod';
import DayMoment from '../src/DayMoment';

describe('DayPeriod.length', function () {
  it('calculates the length between two DayMoments correctly in seconds',
      function () {
    let m1 = new DayMoment(0, 0, 0);
    let m2 = new DayMoment(1, 2, 3);
    let p = new DayPeriod(m1, m2);
    expect(p.length).to.equal(3723);
  });
});

describe('DayPeriod.timeStart', function() {
  it('accepts values smaller than timeStop', function() {
    let p = new DayPeriod(new DayMoment(0, 0, 0), new DayMoment(0, 0, 2));
    expect(() => { p.timeStart = new DayMoment(0, 0, 1) }).to.not.throw(
      RangeError, 'The specified startTime is larger than timeStop.');
  });

  it('does not accept values equal to or greater than timeStop.', function() {
    let p = new DayPeriod(new DayMoment(0, 0, 0), new DayMoment(0, 0, 2));
    expect(() => { p.timeStart = new DayMoment(0, 0, 3) }).to.throw(
        RangeError, 'The specified startTime is larger than timeStop.') &&
      expect(() => { p.timeStart = new DayMoment(0, 0, 2) }).to.throw(
        RangeError, 'The specified startTime is larger than timeStop.');
  });
});

describe('DayPeriod.timeStop', function() {
  it('accepts values greater than timeStart', function() {
    let p = new DayPeriod(new DayMoment(0, 0, 2), new DayMoment(0, 0, 3));
    expect(() => { p.timeStop = new DayMoment(0, 0, 4) }).to.not.throw(
      RangeError, 'The specified stopTime is smaller than timeStart.');
  });

  it('does not accept values equal to or smaller than timeStart', function() {
    let p = new DayPeriod(new DayMoment(0, 0, 2), new DayMoment(0, 0, 3));
    expect(() => { p.timeStop = new DayMoment(0, 0, 1) }).to.throw(
        RangeError, 'The specified stopTime is smaller than timeStart.') &&
      expect(() => { p.timeStop = new DayMoment(0, 0, 2) }).to.throw(
        RangeError, 'The specified stopTime is smaller than timeStart.');
  });
});

describe('DayPeriod.isMomentIn(moment)', function() {
  it('returns true when moment is in the period', function() {
    let p = new DayPeriod(new DayMoment(0, 0, 0),
                          new DayMoment(48, 2, 60));
    let m = new DayMoment(2, 4, 0);
    expect(p.isMomentIn(m)).to.be.true;
  });

  it('returns false when the moment is not in the period', function() {
    let p = new DayPeriod(new DayMoment(0, 0, 0),
                          new DayMoment(0, 0, 1));
    let m = new DayMoment(0, 0, 3);
    expect(p.isMomentIn(m)).to.be.false;
  });

  it('returns true when the moment is the same as the this.timeStart',
      function() {
    let p = new DayPeriod(new DayMoment(0, 0, 0),
                          new DayMoment(0, 0, 1));
    let m = new DayMoment(0, 0, 0);
    expect(p.isMomentIn(m)).to.be.true;
  });

  it('returns true when the moment is the same as the this.timeStop',
      function() {
    let p = new DayPeriod(new DayMoment(0, 0, 0),
                          new DayMoment(0, 0, 1));
    let m = new DayMoment(0, 0, 1);
    expect(p.isMomentIn(m)).to.be.true;
  });
});

describe('DayPeriod.conflicts(period)', function () {
  it('correctly checks when it conflicts with another TimePeriod',
      function () {
    let p1 = new DayPeriod(new DayMoment(0, 0, 0),
                           new DayMoment(1, 2, 3));
    let p2 = new DayPeriod(new DayMoment(0, 0, 0),
                           new DayMoment(0, 2, 3));
    expect(p1.conflicts(p2) && p2.conflicts(p1)).to.be.true;
  });

  it('returns false when it does not conflict with another TimePeriod',
      function() {
    let p1 = new DayPeriod(new DayMoment(0, 0, 0),
                           new DayMoment(1, 2, 3));
    let p3 = new DayPeriod(new DayMoment(2, 3, 0),
                           new DayMoment(3, 0, 0));
    expect(p1.conflicts(p3) && p3.conflicts(p1)).to.be.false;
  });
});
