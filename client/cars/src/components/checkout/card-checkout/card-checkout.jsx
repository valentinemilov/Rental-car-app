/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Card from 'react-bootstrap/Card';
import '../style.css';

export default function CardCheckout({ car }) {
  return (
    <Card className="col-md-4">
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
      </Card.Body>
    </Card>
  );
}
