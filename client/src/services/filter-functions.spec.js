import { createArrayOfUniqueStrings } from './filter-functions';

const mockProp = 'name';
const alwaysFirstElement = 'element';
const createMockObject = (name) => ({ name, adress: 'test' });

describe('createArrayOfUniqueStrings should', () => {
  it('return an array of one element', () => {
    // Arrange
    const mockArray = [];

    // Act
    const action = createArrayOfUniqueStrings(mockArray, mockProp, alwaysFirstElement);

    // Assert
    expect(action).toEqual(['element']);
  });

  it('return an array of two elements- the second unique', () => {
    // Arrange
    const objectOne = createMockObject('Test');
    const objectTwo = createMockObject('Test');
    const mockArray = [objectOne, objectTwo];

    // Act
    const action = createArrayOfUniqueStrings(mockArray, mockProp, alwaysFirstElement);

    // Assert
    expect(action).toEqual(['element', 'Test']);
  });

  it('return an array of three elements- second and third unique and sorted alphabetically ', () => {
    // Arrange
    const objectOne = createMockObject('bbc');
    const objectTwo = createMockObject('abc');
    const objectThree = createMockObject('abc');
    const objectFour = createMockObject('bbc');

    const mockArray = [objectOne, objectTwo, objectThree, objectFour];

    // Act
    const action = createArrayOfUniqueStrings(mockArray, mockProp, alwaysFirstElement);

    // Assert
    expect(action).toEqual(['element', 'abc', 'bbc']);
    expect(action).not.toEqual(['element', 'bbc', 'abc']);
  });
});
