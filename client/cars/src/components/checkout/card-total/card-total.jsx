/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import {
  calculateDates,
  calculateCoefficientByAge,
  calculateCoefficientByDays,
  calculateEstimatedDailyPrice,
  calculateTotalPrice,
} from '../../../services/calculations';
import { now } from '../../../services/date-formatter';
import './card-total.css';

export default function CardTotal({ contract, price }) {
  const estimatedDaysRented = calculateDates(now(), contract.estimatedReturnDate);
  const coefficientByAge = calculateCoefficientByAge(contract.age);
  const discountCoefficientByDays = calculateCoefficientByDays(estimatedDaysRented);
  const estimatedDailyPrice = calculateEstimatedDailyPrice(
    price,
    coefficientByAge,
    discountCoefficientByDays,
  ).toFixed(2);
  const totalEstimatedPrice = calculateTotalPrice(estimatedDailyPrice, estimatedDaysRented)
    .toFixed(2);

  return (
    <div className="checkout-card-price">
      <div>
        <span>
          Days:
        </span>
        <span>
          {estimatedDaysRented}
        </span>
      </div>
      <div>
        <span>
          Daily Price:
        </span>
        <span>
          ${estimatedDailyPrice}
        </span>
      </div>
      <div>
        <span>
          Total Price:
        </span>
        <span>
          ${totalEstimatedPrice}
        </span>
      </div>
    </div>
  );
}
