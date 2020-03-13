import {expect} from 'chai';
import { compareWeekDays } from '../../src/util/weekdays';

describe('compareWeekDays(a, b)', function() {
  it('returns 1 for a > b', function() {
    expect(compareWeekDays('tuesday', 'monday')).to.equal(1);
  });

  it('returns -1 for a < b', function() {
    expect(compareWeekDays('monday', 'tuesday')).to.equal(-1);
  });

  it('returns 0 for a === b', function() {
    expect(compareWeekDays('monday', 'monday')).to.equal(0);
  });

  it('works with WeiRdLy capitalized days', function() {
    expect(compareWeekDays('MonDay', 'MonDAy')).to.equal(0);
  });

  it('throws an error when a day isn\'t properly written', function() {
    expect(() => { compareWeekDays('monday', 'tusday') }).to.throw(
        ReferenceError, 'Incorrectly spelled day.') &&
      expect(() => { compareWeekDays('mnday', 'tuesday') }).to.throw(
        ReferenceError, 'Incorrectly spelled day.');
  });
});

