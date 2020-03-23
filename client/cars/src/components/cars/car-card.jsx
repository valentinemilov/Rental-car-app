import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import CardButton from './card-button';

export default function CarCard({
  id, model, picture, price, carClass,
}) {
  return (
    <Card className="car-card col-md-4">
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
        {/* <Button variant="outline-success">checkout</Button> */}
        {/* <Link to={`/cars/${id}`}><Button variant="outline-success">checkout</Button></Link> */}
        <Link to={`/cars/${id}`}><CardButton>checkout</CardButton></Link>
      </Card.Body>
    </Card>
  );
}
