/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

export default function Filters({ arr, onSelectChange }) {
  const options = arr.map((x) => (
    <option
      key={x}
      value={x}
    >
      {x}
    </option>
  ));

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    onSelectChange(selectedValue);
  };

  return (
    <select className="a" onClick={handleSelectChange}>
      {options}
    </select>
  );
}
