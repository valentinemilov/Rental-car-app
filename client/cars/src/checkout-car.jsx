import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import carService from './services/car-service';

class CheckoutCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: null,
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const car = await carService.getIndividulCar(id);
      this.setState({ car });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { car } = this.state;
    return (
      car && (
        <div className="container">
          <div className="row">
            <Card className="col-md-4">
              <Card.Img variant="top" src={car.picture} />
              <Card.Body>
                <Card.Text>
                  Model:
                  {' '}
                  {car.model}
                </Card.Text>
                <Card.Text>
                  Class:
                  {' '}
                  {car.class}
                </Card.Text>
                <Card.Text>
                  Price:
                  {' '}
                  {car.price}
                </Card.Text>
              </Card.Body>
            </Card>

            <Form className="col-md-3 offset-md-1">
              <Form.Group>
                <Form.Label>First name</Form.Label>
                <Form.Control type="input" placeholder="First name" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last name</Form.Label>
                <Form.Control type="input" placeholder="Last name" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control type="input" placeholder="age" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Return date</Form.Label>
                <Form.Control type="datetime-local" />
              </Form.Group>
              <Button variant="outline-success" type="submit">confirm</Button>
              <Link to="/"><Button variant="outline-danger">cancel</Button></Link>
            </Form>
            <Card className="col-md-3 offset-md-1">
              <Card.Body>
                <Card.Text>
                  Days
                  {' '}
                  `...`
                </Card.Text>
                <Card.Text>
                  Price per day
                  {' '}
                  `...`
                </Card.Text>
                <Card.Text>
                  Total
                  {' '}
                  `...`
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      )
    );
  }
}

export default CheckoutCar;
