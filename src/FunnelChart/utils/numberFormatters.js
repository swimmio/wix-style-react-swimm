const SI_SYMBOL = ['', 'K', 'M', 'B'];

const numberFormater = new Intl.NumberFormat();

const formatNumberToPrecision = (value = 0, precision = 0) =>
  numberFormater.format(
    parseFloat(typeof value === 'number' ? value.toFixed(precision) : value),
  );

const formatToCompactNumber = (value = 0, precision = 0) => {
  const tier = Math.min(
    (Math.log10(Math.abs(value)) / 3) | 0,
    SI_SYMBOL.length - 1,
  );
  if (tier === 0) {
    return value.toFixed().toString();
  }
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = value / scale;
  return scaled.toFixed(scaled.toString().length > 1 ? precision : 0) + suffix;
};

const formatToPercent = (value = 0) => {
  const formatedValue =
    typeof value === 'number' ? formatNumberToPrecision(value, 0) : value;

  return `${formatedValue}%`;
};

const countPercentageFromBase = (base, chunk, precision) => {
  if (chunk === 0 || base === 0) {
    return 0;
  }
  if (precision === undefined) {
    return (chunk * 100) / base;
  }
  if (precision < 0 || !(precision === parseInt(precision, 10))) {
    throw new Error('Precision should be integer');
  }
  return Number(((chunk * 100) / base).toFixed(precision));
};

export {
  formatNumberToPrecision,
  formatToCompactNumber,
  formatToPercent,
  countPercentageFromBase,
};
