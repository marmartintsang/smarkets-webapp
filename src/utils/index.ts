import moment from 'moment';

export const toDecimalOdds = (price: number) => (10000 / price).toFixed(2);

export const toBackStack = (quantity: number, price: number) =>
  ((quantity * price) / 100000000).toFixed(0);

export const getRemainingTime = (
  startDt: string,
  format: 'hour' | 'min' = 'hour',
) => {
  const duration = moment.duration(moment(startDt).diff(moment()));

  const formattedDuration =
    format === 'hour' ? duration.asHours() : duration.asMinutes();
  return Math.floor(formattedDuration);
};
