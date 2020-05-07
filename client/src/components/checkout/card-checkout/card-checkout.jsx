/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Card from 'react-bootstrap/Card';
import './card-checkout.css';

export default function CardCheckout({ car }) {
  return (
    <Card className="checkout-card">
      <Card.Img variant="top" src={car.picture} />
      <Card.Body>
        <Card.Text>
          {car.brand} {car.model}
        </Card.Text>
        <Card.Text>
          Class: {car.class}
        </Card.Text>
        <Card.Text>
          ${car.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}