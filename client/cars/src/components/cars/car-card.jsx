import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import CardButton from './card-button';
import './style.css';

export default function CarCard({
  id, brand, model, picture, price, carClass,
}) {
  return (
    <Card className="car-card col-md-4">
      <Card.Img variant="top" src={picture} />
      <Card.Body>
        <Card.Text>
          Brand:
          {' '}
          {brand}
        </Card.Text>
        <Card.Text>
          Model:
          {' '}
          {model}
        </Card.Text>
        <Card.Text>
          Class:
          {' '}
          {carClass}
        </Card.Text>
        <Card.Text>
          Price:
          {' '}
          $
          {price}
        </Card.Text>
        <Link to={`/cars/${id}`}><CardButton>checkout</CardButton></Link>
      </Card.Body>
    </Card>
  );
}
