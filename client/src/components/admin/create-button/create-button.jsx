import React from 'react';

import './create-button.css';

export default function CreateButton({ name }) {
  return (
    <button className="create-car-btn" type="submit">{name}</button>
  );
}
