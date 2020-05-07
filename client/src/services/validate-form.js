const isValidForm = (errors) => Object.values(errors)
  .every((x) => x.length === 0);

const isValidContract = (contract) => Object.values(contract)
  .every((x) => x !== '' && x !== 0);

export {
  isValidForm,
  isValidContract,
};
