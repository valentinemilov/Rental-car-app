import {
  calculateCoefficientByDays,
  calculateCoefficientByAge,
  calculateEstimatedDailyPrice,
  calculatePenaltyCoefficient,
  calculatePenaltyDailyPrice,
  calculateDaysOverdue,
} from './calculations';

// describe('constructor should', () => {
//     it('throw if model name is too short', () => {

//         // Arrange, Act, Assert
//         expect(() => new Table('ac', MaterialType.Wooden, 15, 0.5, 2, 1.5)).toThrow();
//     });

describe('calculateCoefficientByDays should', () => {
  it('return no discount for one day', () => {
    expect(calculateCoefficientByDays(1)).toBe(0);
  });

  it('return 0.15 discount coeff for more than or equal to two and less than 7 days', () => {
    expect(calculateCoefficientByDays(2)).toBe(0.15);
    expect(calculateCoefficientByDays(6)).toBe(0.15);
  });

  it('return 0.25 discount coeff for more than 7 days including', () => {
    expect(calculateCoefficientByDays(7)).toBe(0.25);
  });
});

describe('calculateEstimatedIncreaseByAge should', () => {
  it('return no increase for age above 25', () => {
    expect(calculateCoefficientByAge(30)).toBe(0);
  });

  it('return 0.2 increase coeff increase for age <= 25', () => {
    expect(calculateCoefficientByAge(25)).toBe(0.2);
  });
});

describe('calculateEstimatedDailyPrice should', () => {
  it('calculate correctly daily price', () => {
    expect(calculateEstimatedDailyPrice(35, 0.2, 0.15)).toBe(36.75);
  });
});

describe('calculatePenaltyCoefficient should', () => {
  it('return 0.2 coeff for one or two days delay', () => {
    expect(calculatePenaltyCoefficient(1)).toBe(0.2);
    expect(calculatePenaltyCoefficient(2)).toBe(0.2);
  });

  it('return 0.5 coeff for three to five days delay', () => {
    expect(calculatePenaltyCoefficient(3)).toBe(0.5);
    expect(calculatePenaltyCoefficient(5)).toBe(0.5);
  });

  it('return 1.0 coeff for six or more days delay', () => {
    expect(calculatePenaltyCoefficient(6)).toBe(1);
  });
});

describe('calculatePenaltyDailyPrice should', () => {
  it('calculate daily price for overdue clients', () => {
    expect(calculatePenaltyDailyPrice(36.75, 0.5)).toBe(55.125);
    expect(calculatePenaltyDailyPrice(50, 0.2)).toBe(60);
    expect(calculatePenaltyDailyPrice(50, 1)).toBe(100);
  });
});

describe('calculateDaysOverdue should', () => {
  it('calculate days overdue by current and estimated days rented', () => {
    expect(calculateDaysOverdue(5, 6)).toBe(1);
  });

  it('retun 0 days overdue', () => {
    expect(calculateDaysOverdue(4, 3)).toBe(0);
  });
});
