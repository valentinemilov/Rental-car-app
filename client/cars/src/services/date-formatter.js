import moment from 'moment';

const now = () => new Date();
const formatDate = (date) => (moment(date).format('YYYY-MM-DD, H:mm'));
const addOneDayAndFormatIt = (date) => (moment(date).add(1, 'days').format('YYYY-MM-DDThh:mm'));

export {
  formatDate,
  now,
  addOneDayAndFormatIt,
};
