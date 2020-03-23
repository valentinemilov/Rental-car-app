import React from 'react';
import Card from 'react-bootstrap/Card';
import './style.css';

export default function CheckoutCard({
  model, picture, price, carClass,
}) {
  return (
    <Card className="col-md-4">
      <Card.Img variant="top" src={picture} />
      <Card.Body>
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
      </Card.Body>
    </Card>
  );
}
