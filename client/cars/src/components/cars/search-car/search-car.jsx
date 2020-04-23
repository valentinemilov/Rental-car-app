import React from 'react';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';

import './search-car.css';

class SearchCar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e) {
    this.props.onHandleChange(e.target.value);
  }

  render() {
    return (
      <Form className="search-bar">
        <Col lg="11">
          <Form.Control
            className="search-form"
            size="m"
            type="text"
            placeholder="type model to search"
            onChange={this.handleSearchChange}
            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
          />
        </Col>
      </Form>
    );
  }
}

export default SearchCar;
