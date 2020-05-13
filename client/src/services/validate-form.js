/* eslint-disable no-param-reassign */
import carService from './car-service';
import { validateNameOnSubmit, validateAgeOnSubmit, validateDate } from './form-validations';

const isValidForm = (errors) => Object.values(errors)
  .every((x) => x.length === 0);

const isValidContract = (contract) => Object.values(contract)
  .every((x) => x !== '' && x !== 0);

const createContract = async (contract, errors, id) => {
  try {
    if (isValidForm(errors) && isValidContract(contract)) {
      contract.age = Number(contract.age);
      contract.estimatedReturnDate = new Date(contract.estimatedReturnDate).toISOString();
      await carService.createContract(id, contract);

      return false;
    }

    errors.firstNameError = validateNameOnSubmit(contract.firstName);
    errors.lastNameError = validateNameOnSubmit(contract.lastName);
    errors.ageError = validateAgeOnSubmit(contract.age);
    errors.dateError = validateDate(contract.estimatedReturnDate);

    return {
      contract,
      errors,
    };
  } catch (err) {
    console.error(err);
  }
};

export {
  isValidForm,
  isValidContract,
  createContract,
};
