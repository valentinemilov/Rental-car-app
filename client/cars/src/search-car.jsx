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
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return (
      <div className="container">
        <Form>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Col sm="7">
              <Form.Control className='search-form' size="lg" type="text" placeholder="type model to search" value={this.state.value} onChange={this.handleChange} />
            </Col>
            <Button variant="outline-success" size="lg" type="submit" onClick={(e) => this.props.handleSubmit(e, this.state.value)}>Search</Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SearchCar;
