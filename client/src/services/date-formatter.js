import moment from 'moment';

const now = () => new Date();
const formatDate = (date) => (moment(date).format('YYYY-MM-DD H:mm'));
const addOneDay = (date) => (moment(date).add(1, 'days'));

export {
  formatDate,
  now,
  addOneDay,
};
