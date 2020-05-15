import React from 'react';
import Form from 'react-bootstrap/Form';

import { now, addOneDay } from '../../../services/date-formatter';
import './form.css';

export default class InputForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChanged = this.handleInputChanged.bind(this);
  }

  handleInputChanged(event) {
    const key = event.target.getAttribute('data-name');
    const { value } = event.target;
    this.props.onInputChanged(key, value);
  }

  render() {
    const { contract } = this.props;
    const { errors } = this.props;

    return (
      <Form className="checkout-form">
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control 
            className="first"
            type="input"
            data-name="firstName"
            name="firstName"
            placeholder="First name"
            value={contract.firstName}
            onChange={this.handleInputChanged}
            autoFocus
          />
          <span className="errors">{errors.firstNameError}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="input"
            data-name="lastName"
            name="lastName"
            placeholder="Last name"
            value={contract.lastName}
            onChange={this.handleInputChanged}
          />
          <span className="errors">{errors.lastNameError}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            data-name="age"
            name="age"
            min="18"
            placeholder="age"
            value={contract.age}
            onChange={this.handleInputChanged}
          />
          <span className="errors">{errors.ageError}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Return date</Form.Label>
          <Form.Control
            type="datetime-local"
            data-name="estimatedReturnDate"
            name="estimatedReturnDate"
            defaultValue={addOneDay(now()).format('YYYY-MM-DDThh:mm')}
            min={addOneDay(now()).format('YYYY-MM-DDThh:mm')}
            onChange={this.handleInputChanged}
          />
          <span className="errors">{errors.dateError}</span>
        </Form.Group>
      </Form>
    );
  }
}
