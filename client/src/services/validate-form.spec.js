import { isValidForm, isValidContract } from './validate-form';

describe('isValidForm should', () => {
  it('return true if the length of all object properties is 0', () => {
    const mockErrors = {
      firstNameError: '',
      lastNameError: '',
      ageError: '',
      dateError: '',
    };

    expect(isValidForm(mockErrors)).toBe(true);
  });

  it('return false if the length of at least one object property is not 0', () => {
    const mockErrors = {
      firstNameError: 'test',
      lastNameError: '',
      ageError: '',
      dateError: '',
    };

    expect(isValidForm(mockErrors)).toBe(false);
  });

  it('return false if the length of all object properties is not 0', () => {
    const mockErrors = {
      firstNameError: 'test',
      lastNameError: 'test',
      ageError: 'testErr',
      dateError: 'dateErr',
    };

    expect(isValidForm(mockErrors)).toBe(false);
  });
});

describe('isValidContract should', () => {
  it('return false if all object properties are empty string', () => {
    const mockContract = {
      firstName: '',
      lastName: '',
      age: '',
      date: '',
    };

    expect(isValidContract(mockContract)).toBe(false);
  });

  it('return false if at least one object property is empty string', () => {
    const mockContract = {
      firstName: 'test',
      lastName: 'tests',
      age: 20,
      date: '',
    };

    expect(isValidContract(mockContract)).toBe(false);
  });

  it('return false if at least one object property is 0', () => {
    const mockContract = {
      firstName: 'test',
      lastName: 'tests',
      age: 0,
      date: '2020-03-09T07:00:00.000Z',
    };

    expect(isValidContract(mockContract)).toBe(false);
  });

  it('return false if at least one object property is empty string or 0', () => {
    const mockContract = {
      firstName: 'test',
      lastName: 'tests',
      age: 0,
      date: '',
    };

    expect(isValidContract(mockContract)).toBe(false);
  });

  it('return true if all object properties are different from empty string or 0', () => {
    const mockContract = {
      firstName: 'test',
      lastName: 'tests',
      age: 20,
      date: '2020-03-09T07:00:00.000Z',
    };

    expect(isValidContract(mockContract)).toBe(true);
  });
});
