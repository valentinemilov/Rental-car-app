/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

export default function Filters({
  mappedArray, onSelectChange, dataFilter, label,
}) {
  const options = mappedArray.map((x) => (
    <option key={x} value={x}>{x}</option>
  ));

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const key = dataFilter;
    onSelectChange(key, selectedValue);
  };

  return (
    <div>
      <label htmlFor={label}>Sort by {label}</label>
      <select id={label} className="select" onClick={handleSelectChange}>
        {options}
      </select>
    </div>
  );
}
