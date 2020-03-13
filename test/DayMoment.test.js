import {expect} from 'chai';
import DayMoment from '../src/DayMoment';

const negativeValueError = 'DayMoment cannot take on negative values.';

describe('DayMoment.seconds', function() {
  it('accepts positive and zero values.', function() {
    let m = new DayMoment(0, 0, 0);
    expect(() => {m.seconds = 0}).to.not.throw(RangeError, negativeValueError);
  });

  it('does not accept negative moments.', function() {
    let m = new DayMoment(0, 0, 0);
    expect(() => {m.seconds = -1}).to.throw(RangeError, negativeValueError);
  });
});

describe('DayMoment.getSeconds()', function () {
  it('calculates the number of seconds of a non-zero moment.',
      function () {
    let hourMoment = new DayMoment(1, 2, 3);
    expect(hourMoment.seconds).to.equal(3723);
  });

  it('calculates the number of seconds of a zero moment.',
      function () {
    let zeroMoment = new DayMoment(0, 0, 0);
    expect(zeroMoment.seconds).to.equal(0);
  });
});
