/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import './filters.css';

export default function Filters({
  mappedArray, onSelectChange, dataFilter, label,
}) {
  const options = mappedArray.map((x) => (
    <option className="filter-option" key={x} value={x}>{x}</option>
  ));

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const key = dataFilter;
    onSelectChange(key, selectedValue);
  };

  return (
    <div className="filter-container">
      {label && (
      <label className="filter-label" htmlFor={label}>
        {label}
      </label>
      )}
      <select className="filter-select" id={label} onClick={handleSelectChange}>
        {options}
      </select>
    </div>
  );
}
