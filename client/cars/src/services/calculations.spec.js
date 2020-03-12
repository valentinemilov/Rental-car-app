import {
  calculateCoefficientByDays,
  calculateCoefficientByAge,
  calculateEstimatedDailyPrice,
  calculatePenaltyCoefficient,
  calculatePenaltyDailyPrice,
  calculateDaysOverdue,
  calculateCurrentDailyPrice,
  calculateTotalPrice,
  calculateNoOverdueDays,
  calculateDates,
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

describe('calculateCurrentDailyPrice should', () => {
  it('show estimated daily price if there are no overdue days', () => {
    expect(calculateCurrentDailyPrice(0, 25, 40)).toBe(25);
  });

  it('show penalty daily price if there are overdue days', () => {
    expect(calculateCurrentDailyPrice(5, 25, 40)).toBe(40);
  });
});

describe('calculateTotalPrice should', () => {
  it('calculate correctly total price', () => {
    expect(calculateTotalPrice(36.75, 6)).toBe(220.5);
    expect(calculateTotalPrice(55.125, 5)).toBe(275.625);
  });
});

describe('calculateNoOverdueDays should', () => {
  it('calculate the current number of days by current and estimated days rented', () => {
    expect(calculateNoOverdueDays(6, 3)).toBe(3);
  });

  it('retun the total estimated number of days when overdue period starts', () => {
    expect(calculateNoOverdueDays(3, 6)).toBe(3);
  });
});

describe('calculateDates should', () => {
  it('return the result in days from subtracting two dates', () => {
    const firstDate = '2020-03-09T07:52:00.000Z';
    const seondDate = '2020-03-09T07:55:00.000Z';

    expect(calculateDates(firstDate, seondDate)).toBe(1);
  });

  it('return the result in days from subtracting two dates', () => {
    const firstDate = '2020-03-09T07:00:00.000Z';
    const seondDate = '2020-03-10T07:01:00.000Z';

    expect(calculateDates(firstDate, seondDate)).toBe(2);
  });

  it('return the result in days from subtracting two dates', () => {
    const firstDate = '2020-03-09T07:00:00.000Z';
    const seondDate = '2020-03-10T06:59:00.000Z';

    expect(calculateDates(firstDate, seondDate)).toBe(1);
  });

  it('return the result in days from subtracting two dates', () => {
    const firstDate = '2020-03-09T07:00:00.000Z';
    const seondDate = '2020-03-09T19:01:00.000Z';

    expect(calculateDates(firstDate, seondDate)).toBe(1);
  });

  it('return the result in days from subtracting two dates', () => {
    const firstDate = '2020-03-10T07:00:00.000Z';
    const seondDate = '2020-03-09T19:01:00.000Z';

    expect(calculateDates(firstDate, seondDate)).toBe(0);
  });
});
