/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Card from 'react-bootstrap/Card';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './car-card.css';

export default function CarCard({ car }) {
  return (
    <Card className="car-card col-md-4">
      <Card.Img variant="top" src={car.picture} />
      <Card.Body className="car-card-body">
        <Card.Text>
          {car.brand} {car.model}
        </Card.Text>
        <Card.Text>
          Class: {car.class}
        </Card.Text>
        <Card.Text>
          ${car.price}
        </Card.Text>
        <Link to={`/cars/${car.id}`}><FontAwesomeIcon icon={faAngleDoubleRight} /></Link>
      </Card.Body>
    </Card>
  );
}
