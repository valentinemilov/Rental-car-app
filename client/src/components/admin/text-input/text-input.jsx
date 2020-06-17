import React from 'react';

import './text-input.css';

const TextInput = (props) => {
  const {
    labelFor, label, type, data, id, placeholder, value, handleChange,
  } = props;

  return (
    <div className="admin-form-group">
      <label htmlFor={labelFor}>{label}</label>
      <input
        className="admin-form-control"
        type={type}
        data-name={data}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextInput;
