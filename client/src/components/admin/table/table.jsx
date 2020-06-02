/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import './table.css';
import convertCarStatus from './convert-status';

export default function Table({ cars }) {
  return (
    <table className="all-cars">
      <thead>
        <tr>
          <th>#</th>
          <th>Picture</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Class</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((x, i) => (
          <tr key={x.id}>
            <td>{i + 1}</td>
            <td><img src={x.picture} alt="car" /></td>
            <td>{x.brand}</td>
            <td>{x.model}</td>
            <td>{x.class}</td>
            <td>
              $
              {x.price}
            </td>
            <td>{convertCarStatus(x.isAvailable)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
