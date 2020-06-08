import React from 'react';

import './text-input.css';

const TextInput = (props) => (
  <div className="admin-form-group">
    <label htmlFor={props.labelFor}>{props.label}</label>
    <input
      className="admin-form-control"
      type={props.type}
      data-name={props.data}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.handleChange}
    />
  </div>
);

export default TextInput;
