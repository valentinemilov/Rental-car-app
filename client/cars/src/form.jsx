import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class InputForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChanged(event) {
    const key = event.target.getAttribute('data-name');
    const { value } = event.target;
    this.props.onInputChanged(key, value);
  }

  handleFormSubmit(event) {
    this.props.onFormSubmit(event);
  }

  render() {
    return (
      <Form className="col-md-3 offset-md-1">
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="input"
            data-name="firstName"
            name="firstName"
            placeholder="First name"
            value={this.props.firstName}
            onChange={this.handleInputChanged}
          />
          <span className="errors">{this.props.errors.firstNameError}</span>
        </Form.Group>

        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="input"
            data-name="lastName"
            name="lastName"
            placeholder="Last name"
            value={this.props.lastName}
            onChange={this.handleInputChanged}
          />
          <span className="errors">{this.props.errors.lastNameError}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            data-name="age"
            name="age"
            min="18"
            placeholder="age"
            value={this.props.age}
            onChange={this.handleInputChanged}
          />
          <span className="errors">{this.props.errors.ageError}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Return date</Form.Label>
          <Form.Control
            type="datetime-local"
            data-name="estimatedReturnDate"
            name="estimatedReturnDate"
            defaultValue={moment().format('YYYY-MM-DDTHH:mm')}
            min={moment().format('YYYY-MM-DDThh:mm')}
            onChange={this.handleInputChanged}
          />
          <span className="errors">{this.props.errors.dateError}</span>
        </Form.Group>
        <Button className="btn-submit" variant="outline-success" type="submit" onClick={this.handleFormSubmit}>confirm</Button>
        <Link to="/"><Button variant="outline-danger">cancel</Button></Link>
      </Form>
    );
  }
}
