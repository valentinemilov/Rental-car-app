/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import CardButton from '../card-button/card-button';
import '../style.css';

export default function CarCard({ car }) {
  return (
    <Card className="car-card col-md-4">
      <Card.Img variant="top" src={car.picture} />
      <Card.Body>
        <Card.Text>
          Brand: {car.brand}
        </Card.Text>
        <Card.Text>
          Model: {car.model}
        </Card.Text>
        <Card.Text>
          Class: {car.class}
        </Card.Text>
        <Card.Text>
          Price: ${car.price}
        </Card.Text>
        <Link to={`/cars/${car.id}`}><CardButton>checkout</CardButton></Link>
      </Card.Body>
    </Card>
  );
}
