import moment from 'moment';

const noErrorMsg = '';
const noEmptyFieldMsg = 'Cannot be empty';
const minNameLengthMsg = 'Must be at least 3 chars';
const minAgeMsg = 'Age must be over 18';
const invalidDateMsg = 'Invalid date';

const validateNameOnChange = (name, min = 0, max = 3) => {
  if (name.length < max && name.length > min) {
    return minNameLengthMsg;
  }

  return noErrorMsg;
};

const validateNameOnSubmit = (name, min = 0, max = 3) => {
  if (name.length === min) {
    return noEmptyFieldMsg;
  }

  if (name.length < max) {
    return minNameLengthMsg;
  }

  return noErrorMsg;
};

const validateAgeOnChange = (age, min = 0, max = 18) => {
  if (age < max && age >= min) {
    return minAgeMsg;
  }

  return noErrorMsg;
};

const validateAgeOnSubmit = (age, min = 0, max = 18) => {
  if (age.length === min) {
    return noEmptyFieldMsg;
  }

  if (age < max) {
    return minAgeMsg;
  }

  return noErrorMsg;
};

const validateDate = (date) => (date < moment().format('YYYY-MM-DDTHH:mm') ? invalidDateMsg : noErrorMsg);

export {
  validateNameOnChange,
  validateNameOnSubmit,
  validateAgeOnChange,
  validateAgeOnSubmit,
  validateDate,
};
