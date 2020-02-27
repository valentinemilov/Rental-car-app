import React from 'react';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class SearchCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
    // console.log(this.state.value);
  }

  handleSubmit(event) {
    console.log(`A name was submitted: ' ${this.state.value}`);
    event.preventDefault();
  }

  render() {
    // const { contracts } = this.state;
    // console.log(contracts);
    return (
      <div className="container">
        <Form>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Col sm="7">
              <Form.Control size="lg" type="text" placeholder="type model to search" value={this.state.value} onChange={this.handleChange} />
            </Col>
            <Button variant="outline-success" size="lg" onClick={this.handleSubmit}>Search</Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SearchCar;
