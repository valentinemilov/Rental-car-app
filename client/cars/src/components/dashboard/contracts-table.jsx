/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Button from 'react-bootstrap/Button';

import {
  calculateDates,
  calculateEstimatedDailyPrice,
  calculateCoefficientByDays,
  calculateCoefficientByAge,
  calculatePenaltyCoefficient,
  calculateDaysOverdue,
  calculateCurrentDailyPrice,
  calculatePenaltyDailyPrice,
  calculateTotalPrice,
  calculateNoOverdueDays,
} from '../../services/calculations';
import { formatDate, now } from '../../services/date-formatter';

export default class ContractsTable extends React.Component {
  render() {
    const { model } = this.props;
    const { name } = this.props;
    const { contract } = this.props;

    const startDay = formatDate(this.props.startDay);
    const estimatedReturnDate = formatDate(this.props.estimatedReturnDate);
    const estimatedDaysRented = calculateDates(contract.pickupDate, contract.estimatedReturnDate);
    const coefficientByAge = calculateCoefficientByAge(contract.age);
    const discountCoefficientByDays = calculateCoefficientByDays(estimatedDaysRented);
    const estimatedDailyPrice = calculateEstimatedDailyPrice(
      contract.price,
      coefficientByAge,
      discountCoefficientByDays,
    ).toFixed(2);

    const currentDaysRented = calculateDates(contract.pickupDate, now());
    const daysOverdue = calculateDaysOverdue(estimatedDaysRented, currentDaysRented);
    const penaltyCoefficient = calculatePenaltyCoefficient(daysOverdue);
    const penaltyDailyPrice = calculatePenaltyDailyPrice(
      estimatedDailyPrice,
      penaltyCoefficient,
    ).toFixed(2);

    const currentDailyPrice = calculateCurrentDailyPrice(
      daysOverdue,
      estimatedDailyPrice,
      penaltyDailyPrice,
    );

    const daysWithNoOverdue = calculateNoOverdueDays(estimatedDaysRented, currentDaysRented);
    const totalEstimatedPrice = calculateTotalPrice(estimatedDailyPrice, daysWithNoOverdue);
    const totalPenaltyPrice = calculateTotalPrice(penaltyDailyPrice, daysOverdue);
    const totalCurrentPrice = (totalEstimatedPrice + totalPenaltyPrice).toFixed(2);

    return (
      <tr>
        <td>{model}</td>
        <td>{name}</td>
        <td>{startDay}</td>
        <td>{estimatedReturnDate}</td>
        <td>{estimatedDaysRented}</td>
        <td>
          $
          {' '}
          {estimatedDailyPrice}
        </td>
        <td>{currentDaysRented}</td>
        <td>
          $
          {' '}
          {currentDailyPrice}
        </td>
        <td>
          $
          {' '}
          {totalCurrentPrice}
        </td>
        <td><Button variant="info" size="sm" onClick={() => this.props.onClickToClose(contract.id)}>return car</Button></td>
      </tr>
    );
  }
}
