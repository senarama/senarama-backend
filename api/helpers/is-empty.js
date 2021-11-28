const isEmpty = (val) => {
  if (val === undefined) return true;
  if (val === null) return true;
  if (Number.isNaN(val)) return true;
  if (typeof val === 'number') return false;
  if (val === '') return true;
  if (val.length === 0) return true;
  if (typeof val === 'object' && Object.keys(val).length === 0) return true;

  return false;
};

module.exports = isEmpty;
