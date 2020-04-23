/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  calculateDates,
  calculateCoefficientByAge,
  calculateCoefficientByDays,
  calculateEstimatedDailyPrice,
  calculateTotalPrice,
} from '../../../services/calculations';
import { now } from '../../../services/date-formatter';
import './card-total.css';

export default function CardTotal({ contract, price, onFormSubmit }) {
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

  const handleFormSubmit = () => {
    onFormSubmit();
  };

  return (
    <div className="checkout-price">
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
          Days:
        </span>
        <span>
          {estimatedDaysRented}
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
      <div className="checkout-price-btn">
        <FontAwesomeIcon onClick={handleFormSubmit} type="submit" icon={faCheckCircle} />
        <Link to="/"><FontAwesomeIcon icon={faTimesCircle} /></Link>
      </div>
    </div>
  );
}
