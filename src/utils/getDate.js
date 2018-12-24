import moment from 'moment';

moment().format();

const zeroPadding = 2;

function getDateByDay(date, year, month) {
  const day = date.date().toString().padStart(zeroPadding, '0');

  return `${year}-${month}-${day}`;
}

function getDateByWeek(date, year, month, dayOfWeek) {
  date.day(dayOfWeek);
  const day = date.date().toString().padStart(zeroPadding, '0');

  return `${year}-${month}-${day}`;
}

function getDateByMonth(date, year, month) {
  return `${year}-${month}`;
}

export default function (date, dateTypeSelector, dayOfWeek) {
  const momentDate = moment(date);
  const year = momentDate.year();
  // 1 is added because moment.js months go from 0 to 11
  const month = (momentDate.month() + 1).toString().padStart(zeroPadding, '0');

  switch (dateTypeSelector) {
  case 'day':
    return getDateByDay(momentDate, year, month);
  case 'week':
    return getDateByWeek(momentDate, year, month, dayOfWeek);
  case 'month':
    return getDateByMonth(momentDate, year, month);
  default:
    return getDateByDay(momentDate, year, month);
  }
}
