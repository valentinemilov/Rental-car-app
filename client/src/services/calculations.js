import moment from 'moment';
import coefficients from '../config/discounts';
import penalty from '../config/penalties';

const calculateDates = (a, b) => {
  if (a === '' || b === '') {
    return 0;
  }

  const firstDate = moment(a);
  const secondDate = moment(b);

  if (firstDate > secondDate) {
    return 0;
  }

  return Math.ceil(secondDate.diff(firstDate, 'minutes', true) / 1440);
};

const calculateCoefficientByDays = (days) => {
  if (days <= 1) {
    return coefficients.rentedForOneDay;
  }

  if (days > 1 && days < 7) {
    return coefficients.rentedBetweenTwoAndSixDays;
  }

  return coefficients.rentedMoreThanSixDays;
};

// const agePenalty = [
//   { min: 18, max: 25, coef: coefficients.ageBelowTwentyFive },
//   { min: 26, max: 1000, coef: coefficients.ageAboveTwentyFive },
// ];

const calculateCoefficientByAge = (age) => {
  // return agePenalty.find((p) => p.min <= age && age <= p.max).coef;
  if (age > 25) {
    return coefficients.ageAboveTwentyFive;
  }

  return coefficients.ageBelowTwentyFive;
};

const calculateEstimatedDailyPrice = (price, increaseFunc, discountFunc) => (
  price * (1 + increaseFunc - discountFunc)
);

const calculatePenaltyCoefficient = (days) => {
  if (days <= 2) {
    return penalty.belowThreeDays;
  }

  if (days >= 6) {
    return penalty.equalOrAboveSixDays;
  }

  return penalty.betweenThreeAndFiveDays;
};

const calculatePenaltyDailyPrice = (priceFunc, coeffFunc) => (
  priceFunc * (1 + coeffFunc)
);

const calculateDaysOverdue = (estimatedDay, currentDay) => {
  const overdueDays = currentDay - estimatedDay;

  return overdueDays > 0 ? overdueDays : 0;
};

const calculateNoOverdueDays = (estimatedDays, currentDays) => {
  const subtractedDays = estimatedDays - currentDays;

  return subtractedDays > 0 ? currentDays : estimatedDays;
};

const calculateCurrentDailyPrice = (overdueDays, estimatedPrice, penaltyPrice) => (
  overdueDays <= 0 ? estimatedPrice : penaltyPrice
);

const calculateTotalPrice = (price, days) => price * days;

export {
  calculateDates,
  calculateCoefficientByDays,
  calculateCoefficientByAge,
  calculateEstimatedDailyPrice,
  calculatePenaltyCoefficient,
  calculatePenaltyDailyPrice,
  calculateDaysOverdue,
  calculateNoOverdueDays,
  calculateCurrentDailyPrice,
  calculateTotalPrice,
};
