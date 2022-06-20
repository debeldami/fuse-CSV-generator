exports.asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

exports.getUnixTimestamp = (dateStr) => {
  const date = new Date(dateStr);
  console.log(date);

  return Math.floor(date.getTime() / 1000);
};
