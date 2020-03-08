import moment from 'moment';

const calculateDates = (a, b) => {
  const first = moment(a);
  const second = moment(b);

  return Math.ceil(second.diff(first, 'days'));
};

export default calculateDates;
