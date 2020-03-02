import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function CarCard({
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
          {price}
        </Card.Text>
        <Button variant="outline-success">checkout</Button>
      </Card.Body>
    </Card>
  );
}

export default CarCard;
