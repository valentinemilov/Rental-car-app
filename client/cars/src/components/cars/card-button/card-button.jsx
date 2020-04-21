import React from 'react';
import Button from 'react-bootstrap/Button';

import './card-button.css';

export default function CardButton({ children }) {
  return (
    <Button className="card-button" variant="outline-success">{children}</Button>
  );
}
