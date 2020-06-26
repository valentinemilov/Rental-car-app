const createArrayOfUniqueStrings = (inputArray, prop, firstElement) => {
  const sortedArrayOfStrings = inputArray
    .map((x) => x[prop])
    .sort((a, b) => a.localeCompare(b));

  return [firstElement, ...new Set(sortedArrayOfStrings)];
};

const createSortedArrayOfStrings = (inputArray, prop, firstElement) => {
  const sortedArrayOfStrings = inputArray
    .map((x) => x[prop])
    .filter((x) => x !== firstElement)
    .sort((a, b) => a.localeCompare(b));

  return [firstElement, ...sortedArrayOfStrings];
};

const filterByGivenProp = (word, prop) => (el, _, currentArr) => {
  if (word !== '') {
    return el[prop] === word;
  }

  return currentArr;
};

const filterByBrandAndModel = (word) => (car) => (
  car.brand
    .toLowerCase()
    .startsWith(word.toLowerCase())
  || car.model
    .toLowerCase()
    .startsWith(word.toLowerCase())
);

export {
  createArrayOfUniqueStrings,
  createSortedArrayOfStrings,
  filterByGivenProp,
  filterByBrandAndModel,
};
