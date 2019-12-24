const TEMP_CONVERT = (type, degree) => {
  if (type === 'toC') return Math.trunc((degree - 32) * (5 / 9));
  return Math.trunc((degree * (9 / 5)) + 32);
};

export default TEMP_CONVERT;
