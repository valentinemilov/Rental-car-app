/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
const isValidForm = (errors) => Object.values(errors)
  .every((x) => x.length === 0);

const isValidContract = (contract) => Object.values(contract)
  .every((x) => x !== '' && x !== 0);

const createTruthyPropsObject = (object) => (
  Object.entries(object)
    .reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {})
);

const clearInputFields = (object) => (
  Object.entries(object)
    .reduce((a, [k, v]) => ((v ? (a[k] = '', a) : a)), {})
);

const renameImg = (img, str) => {
  if (img.startsWith(str)) {
    return '';
  }

  return str;
};

const isValidCreateCarForm = (car) => Object.values(car)
  .every((x) => x.trim() !== '');

const isValidEditCarForm = (car) => Object.values(car)
  .some((x) => x.trim() !== '');

export {
  isValidForm,
  isValidContract,
  createTruthyPropsObject,
  renameImg,
  isValidCreateCarForm,
  isValidEditCarForm,
  clearInputFields,
};
