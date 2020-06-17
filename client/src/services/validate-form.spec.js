import {
  isValidForm,
  isValidContract,
  createTruthyPropsObject,
  clearInputFields,
  isValidCreateCarForm,
  isValidEditCarForm,
} from './validate-form';

describe('isValidForm() should', () => {
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

describe('isValidContract() should', () => {
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

describe('createTruthyPropsObject() should', () => {
  it('return object with no undefined props', () => {
    const mockObject = { name: 'test', brand: undefined };
    const mockOutput = { name: 'test' };
    expect(createTruthyPropsObject(mockObject)).toEqual(mockOutput);
  });

  it('return object with no null props', () => {
    const mockObject = { name: 'test', brand: null };
    const mockOutput = { name: 'test' };
    expect(createTruthyPropsObject(mockObject)).toEqual(mockOutput);
  });

  it('return object with no empty string props', () => {
    const mockObject = { name: 'test', brand: '' };
    const mockOutput = { name: 'test' };
    expect(createTruthyPropsObject(mockObject)).toEqual(mockOutput);
  });

  it('return object with no falsy values props', () => {
    const mockObject = { name: 'test', brand: 0 };
    const mockOutput = { name: 'test' };
    expect(createTruthyPropsObject(mockObject)).toEqual(mockOutput);
  });

  it('return empty {} if all props are falsy values', () => {
    const mockObject = { name: '', brand: null, class: undefined };
    const mockOutput = {};
    expect(createTruthyPropsObject(mockObject)).toEqual(mockOutput);
  });

  it('return copy of the object if all props are valid', () => {
    const mockObject = { name: 'test', brand: 'test1' };
    const mockOutput = { name: 'test', brand: 'test1' };
    expect(createTruthyPropsObject(mockObject)).toEqual(mockOutput);
  });
});

describe('clearInputFields() should', () => {
  it('(1) return object which truthy values are replaced by ""', () => {
    const mockObject = { name: 'test', brand: undefined };
    const mockOutput = { name: '' };
    expect(clearInputFields(mockObject)).toEqual(mockOutput);
  });

  it('(2) return object which truthy values are replaced by ""', () => {
    const mockObject = { name: 'test', brand: null };
    const mockOutput = { name: '' };
    expect(clearInputFields(mockObject)).toEqual(mockOutput);
  });

  it('(3) return object which truthy values are replaced by ""', () => {
    const mockObject = { name: 'test', brand: '' };
    const mockOutput = { name: '' };
    expect(clearInputFields(mockObject)).toEqual(mockOutput);
  });

  it('(4) return object which truthy values are replaced by ""', () => {
    const mockObject = { name: 'test', brand: 0 };
    const mockOutput = { name: '' };
    expect(clearInputFields(mockObject)).toEqual(mockOutput);
  });

  it('return empty {} if all props are falsy values', () => {
    const mockObject = { name: '', brand: null, class: undefined };
    const mockOutput = {};
    expect(clearInputFields(mockObject)).toEqual(mockOutput);
  });
});

describe('isValidCreateCarForm() should', () => {
  it('return true if all object props are not equal to ""', () => {
    const mockObject = { name: 'test', brand: 'tests' };
    expect(isValidCreateCarForm(mockObject)).toEqual(true);
  });

  it('return true if object props have spaces but are not equal to ""', () => {
    const mockObject = { name: ' test', brand: 'tests ' };
    expect(isValidCreateCarForm(mockObject)).toEqual(true);
  });

  it('return false if at least one object prop is equal to ""', () => {
    const mockObject = { name: '', brand: 'tests' };
    expect(isValidCreateCarForm(mockObject)).toEqual(false);
  });

  it('return false if at least one object prop has only spaces', () => {
    const mockObject = { name: '  ', brand: 'tests' };
    expect(isValidCreateCarForm(mockObject)).toEqual(false);
  });
});

describe('isValidEditCarForm() should', () => {
  it('return true if object props are not equal to ""', () => {
    const mockObject = { name: 'test', brand: 'tests' };
    expect(isValidEditCarForm(mockObject)).toEqual(true);
  });

  it('return true if object props have spaces but are not equal to ""', () => {
    const mockObject = { name: ' test', brand: 'tests ' };
    expect(isValidEditCarForm(mockObject)).toEqual(true);
  });

  it('return true if at least one object prop is not equal to ""', () => {
    const mockObject = { name: 'test', brand: '' };
    expect(isValidEditCarForm(mockObject)).toEqual(true);
  });

  it('return false if all object props are equal to ""', () => {
    const mockObject = { name: '', brand: '' };
    expect(isValidEditCarForm(mockObject)).toEqual(false);
  });

  it('return false if object props are equal to "" or have only spaces', () => {
    const mockObject = { name: '', brand: '  ' };
    expect(isValidEditCarForm(mockObject)).toEqual(false);
  });
});
