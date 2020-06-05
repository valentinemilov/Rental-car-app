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

export {
  isValidForm,
  isValidContract,
  createTruthyPropsObject,
};
