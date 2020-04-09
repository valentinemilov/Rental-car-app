import moment from 'moment';

const validateName = (name) => {
  if (name.length === 0) {
    return 'Cannot be empty';
  }

  if (name.length < 3) {
    return 'Must be at least 3 chars';
  }

  return '';
};

const validateAge = (age) => {
  if (age.length === 0) {
    return 'Cannot be empty';
  }

  if (age < 18) {
    return 'Age must be over 18';
  }

  return '';
};

const validateDate = (date) => (date < moment().format('YYYY-MM-DDTHH:mm') ? 'Invalid date' : '');

export {
  validateName,
  validateAge,
  validateDate,
};
