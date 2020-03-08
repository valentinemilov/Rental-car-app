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
    this.props.onInputChanged(event.target.value);
  }

  handleFormSubmit(event) {
    this.props.onFormSubmit(event.target.value);
    console.log(event);
  }

  render() {
    return (
      <Form className="col-md-3 offset-md-1">
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="input"
            name="firstName"
            placeholder="First name"
            value={this.props.firstName}
            onChange={this.handleInputChanged}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="input"
            name="lastName"
            placeholder="Last name"
            value={this.props.lastName}
            onChange={this.handleInputChanged}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            placeholder="age"
            value={this.props.age}
            onChange={this.handleInputChanged}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Return date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="estimatedReturnDate"
            defaultValue={moment(new Date()).format('YYYY-MM-DDTHH:mm')}
            min={moment(new Date()).format('YYYY-MM-DDThh:mm')}
            onChange={this.handleInputChanged}
          />
        </Form.Group>
        <Button variant="outline-success" type="submit" onClick={this.handleFormSubmit}>confirm</Button>
        <Link to="/"><Button variant="outline-danger">cancel</Button></Link>
      </Form>
    );
  }
}
