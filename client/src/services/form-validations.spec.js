import {
  validateNameOnChange,
  validateNameOnSubmit,
  validateAgeOnChange,
  validateAgeOnSubmit,
  validateDate,
} from './form-validations';

const noErrorMsg = '';
const noEmptyFieldMsg = 'Cannot be empty';
const minNameLengthMsg = 'Must be at least 3 chars';
const minAgeMsg = 'Age must be over 18';
const invalidDateMsg = 'Invalid date';

describe('validateNameOnChange should', () => {
  it('return minNameLengthMsg if name.length > 0 and < 3', () => {
    expect(validateNameOnChange('a')).toBe(minNameLengthMsg);
    expect(validateNameOnChange('aa')).toBe(minNameLengthMsg);
  });

  it('return noErrorMsg if name.length >= 3', () => {
    expect(validateNameOnChange('aaa')).toBe(noErrorMsg);
  });
});

describe('validateNameOnSubmit should', () => {
  it('return noEmptyFieldMsg if name is empty string', () => {
    expect(validateNameOnSubmit('')).toBe(noEmptyFieldMsg);
  });

  it('return minNameLengthMsg if name.length > 0 and < 3', () => {
    expect(validateNameOnSubmit('a')).toBe(minNameLengthMsg);
    expect(validateNameOnSubmit('aa')).toBe(minNameLengthMsg);
  });

  it('return noErrorMsg if name.length >= 3', () => {
    expect(validateNameOnSubmit('aaa')).toBe(noErrorMsg);
  });
});

describe('validateAgeOnChange should', () => {
  it('return minAgeMsg if age < 18', () => {
    expect(validateAgeOnChange(17)).toBe(minAgeMsg);
    expect(validateAgeOnChange(-1)).toBe(minAgeMsg);
  });

  it('return noErrorMsg if age >= 18', () => {
    expect(validateAgeOnChange(18)).toBe(noErrorMsg);
  });

  it('return noErrorMsg if age is empty string', () => {
    expect(validateAgeOnChange('')).toBe(noErrorMsg);
  });
});

describe('validateAgeOnSubmit should', () => {
  it('return minAgeMsg if age < 18', () => {
    expect(validateAgeOnSubmit(17)).toBe(minAgeMsg);
    expect(validateAgeOnSubmit(-1)).toBe(minAgeMsg);
  });

  it('return noErrorMsg if age >= 18', () => {
    expect(validateAgeOnSubmit(18)).toBe(noErrorMsg);
  });

  it('return noEmptyFieldMsg if age is empty string', () => {
    expect(validateAgeOnSubmit('')).toBe(noEmptyFieldMsg);
  });
});

describe('validateDate should', () => {
  it('return invalidDateMsg if date is before now', () => {
    const pastDate = '2020-03-09T00:00:00.000Z';
    expect(validateDate(pastDate)).toBe(invalidDateMsg);
  });

  it('return invalidDateMsg if date is before now', () => {
    const futureDate = '2030-03-09T00:00:00.000Z';
    expect(validateDate(futureDate)).toBe(noErrorMsg);
  });
});
