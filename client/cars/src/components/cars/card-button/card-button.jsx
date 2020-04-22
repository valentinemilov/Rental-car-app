/* eslint-disable react/button-has-type */
import React from 'react';

import './card-button.css';

export default function CardButton({ children }) {
  return (
    <button className="card-button">{children}</button>
  );
}
