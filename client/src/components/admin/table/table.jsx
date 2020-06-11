/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './table.css';
import convertCarStatus from './convert-status';
import imageUrl from '../../../config/imageUrl';
import { renameImg } from '../../../services/validate-form';

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
          <th>*</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((x, i) => (
          <tr key={x.id}>
            <td>{i + 1}</td>
            <td><img src={`${renameImg(x.picture, imageUrl)}${x.picture}`} alt="car" /></td>
            <td>{x.brand}</td>
            <td>{x.model}</td>
            <td>{x.class}</td>
            <td>
              $
              {x.price}
            </td>
            <td>{convertCarStatus(x.isAvailable)}</td>
            {/* <td><Button variant="info" size="sm" onClick={() => onClickToNavigate(x.id)}>Edit</Button></td> */}
            <td>
              <Link to={`/admin/car/${x.id}`}>
                <Button variant="info" size="sm">Edit</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
