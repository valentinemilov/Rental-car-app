import moment from 'moment';
import coefficients from '../config/discounts';

const calculateDates = (a, b) => {
  const first = moment(a);
  const second = moment(b);

  return Math.ceil(second.diff(first, 'minutes', true) / 1440);
};

const calculateEstimatedDiscountByDays = (price, days) => {
  if (days === 1) {
    return coefficients.rentedForOneDay * price;
  }

  if (days > 1 && days < 7) {
    return coefficients.rentedBetweenTwoAndSixDays * price;
  }

  return coefficients.rentedMoreThanSixDays * price;
};

// const agePenalty = [
//   { min: 18, max: 25, coef: coefficients.ageBelowTwentyFive },
//   { min: 26, max: 1000, coef: coefficients.ageAboveTwentyFive },
// ];

const calculateEstimatedIncreaseByAge = (price, age) => {
  // return agePenalty.find((p) => p.min <= age && age <= p.max).coef * price;
  if (age > 25) {
    return coefficients.ageAboveTwentyFive * price;
  }

  return coefficients.ageBelowTwentyFive * price;
};

export {
  calculateDates,
  calculateEstimatedDiscountByDays,
  calculateEstimatedIncreaseByAge,
};
