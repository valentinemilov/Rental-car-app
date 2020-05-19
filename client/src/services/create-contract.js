/* eslint-disable no-param-reassign */
import carService from './car-service';
import { validateNameOnSubmit, validateAgeOnSubmit, validateDate } from './form-validations';
import { isValidForm, isValidContract } from './validate-form';

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

export default createContract;
