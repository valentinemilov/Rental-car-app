import { calculateEstimatedDiscountByDays, calculateEstimatedIncreaseByAge } from './calculations';

// describe('constructor should', () => {
//     it('throw if model name is too short', () => {

//         // Arrange, Act, Assert
//         expect(() => new Table('ac', MaterialType.Wooden, 15, 0.5, 2, 1.5)).toThrow();
//     });

describe('calculateEstimatedDiscountByDays should', () => {
  it('return no discount for one day', () => {
    expect(calculateEstimatedDiscountByDays(10, 1)).toBe(0);
  });

  it('return 15% discount for more than or equal to two and less than 7 days', () => {
    expect(calculateEstimatedDiscountByDays(100, 2)).toBe(15);
    expect(calculateEstimatedDiscountByDays(100, 6)).toBe(15);
  });

  it('return 25% discount for more than 7 days including', () => {
    expect(calculateEstimatedDiscountByDays(100, 7)).toBe(25);
  });
});

describe('calculateEstimatedIncreaseByAge should', () => {
  it('return no increase for age above 25', () => {
    expect(calculateEstimatedIncreaseByAge(10, 30)).toBe(0);
  });

  it('return 20% increase for age <= 25', () => {
    expect(calculateEstimatedIncreaseByAge(10, 25)).toBe(2);
  });
});
