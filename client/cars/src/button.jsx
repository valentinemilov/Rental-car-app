import React from 'react';
import Button from 'react-bootstrap/Button';

export default function CardButton({ children }) {
  return (
    <Button variant="outline-success">{children}</Button>
  );
}
