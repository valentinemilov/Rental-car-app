import moment from 'moment';

const validateName = (name) => (name.length < 3 ? 'Must be at least 3 chars' : '');
const validateAge = (age) => (age < 18 ? 'Age must be over 18' : '');
const validateDate = (date) => (date < moment().format('YYYY-MM-DDTHH:mm') ? 'Invalid date' : '');

export {
  validateName,
  validateAge,
  validateDate,
};