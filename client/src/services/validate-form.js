/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { toastError } from './toastify';

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

const noEmptyMsg = 'No empty fields are allowed';
const noImageMsg = 'Image must be uploaded';
const createMsg = (str) => `${str} cannot be empty`;

const errorMsg = (car) => {
  const values = Object.values(car);
  const [brand, model] = values;

  if (!brand && !model) return toastError(noEmptyMsg);
  if (!brand) return toastError(createMsg('Brand'));
  if (!model) return toastError(createMsg('Model'));
};

const errorCreateCarMsg = (car) => {
  const values = Object.values(car);
  const [brand, model, carClass, picture] = values;
  const filteredValuse = values.filter((x) => x === '');

  if (filteredValuse.length > 1) return toastError(noEmptyMsg);
  if (!brand) return toastError(createMsg('Brand'));
  if (!model) return toastError(createMsg('Model'));
  if (!carClass) return toastError(createMsg('Class'));
  if (!picture) return toastError(noImageMsg);
};

export {
  isValidForm,
  isValidContract,
  createTruthyPropsObject,
  renameImg,
  isValidCreateCarForm,
  isValidEditCarForm,
  clearInputFields,
  errorMsg,
  errorCreateCarMsg,
};
