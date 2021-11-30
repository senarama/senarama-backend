/**
 * check if given value is empty
 * @param {any} val value to check
 * @returns {boolean} true if `val` is empty otherwise false
 */
const isEmpty = (val) => {
  // primitive type check
  if (val === undefined) return true;
  if (val === null) return true;
  if (Number.isNaN(val)) return true;
  if (typeof val === 'number') return false;
  if (val === '') return true;
  if (val.length === 0) return true;
  // objects type check
  if (Array.isArray(val)) {
    if (val.length === 0) return true;
    if (val.length > 0) {
      return val.filter((i) => !isEmpty(i)).length === 0;
    }
  }
  if (typeof val === 'object' && Object.keys(val).length === 0) return true;

  return false;
};

module.exports = isEmpty;
