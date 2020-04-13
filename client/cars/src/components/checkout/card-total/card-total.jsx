/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Card from 'react-bootstrap/Card';

import {
  calculateDates,
  calculateCoefficientByAge,
  calculateCoefficientByDays,
  calculateEstimatedDailyPrice,
  calculateTotalPrice,
} from '../../../services/calculations';
import { now } from '../../../services/date-formatter';

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
    <Card className="col-md-3 offset-md-1">
      <Card.Body>
        <Card.Text>
          Days: {estimatedDaysRented}
        </Card.Text>
        <Card.Text>
          Price per day: ${estimatedDailyPrice}
        </Card.Text>
        <Card.Text>
          Total: ${totalEstimatedPrice}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
