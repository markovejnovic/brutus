const WEEK_DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

/**
 * Compares weekdays Monday through Friday
 *
 * Arguments:
 *  a (string) - The first day to compare
 *  b (string) - The last day to compare
 *
 * Returns:
 *  int - The comparison result
 *
 * Notes:
 *  This function has complexity of O(n). There's probably a better way.
 */
export function compareWeekDays(a, b) {
  let ai = WEEK_DAYS.indexOf(a.toLowerCase());
  let bi = WEEK_DAYS.indexOf(b.toLowerCase());

  if (ai < 0 || bi < 0) {
    throw new ReferenceError('Incorrectly spelled day.');
  }

  if (ai > bi) {
    return 1;
  } else if (ai < bi) {
    return -1;
  } else {
    return 0;
  }
}
