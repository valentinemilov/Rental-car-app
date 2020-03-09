import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import moment from 'moment';

import carService from './services/car-service';
import CheckoutCard from './checkout-card';
import InputForm from './form';

class CheckoutCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: null,
      contract: {
        firstName: '',
        lastName: '',
        age: 18,
        pickupDate: '',
        estimatedReturnDate: '',
      },
    };

    this.onInputChanged = this.onInputChanged.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
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

  onInputChanged(event) {
    const { contract } = this.state;
    contract.pickupDate = moment(new Date()).format('YYYY-MM-DDTHH:mm');
    contract[event.target.name] = event.target.value;
    this.setState({ contract });
    // console.log(this.state.contract)
  }

  async onFormSubmit() {
    const { contract } = this.state;
    const contractToSend = { ...contract };
    contractToSend.age = +contractToSend.age;
    event.preventDefault();

    const { id } = this.state.car;
    try {
      await carService.createContract(id, contractToSend);
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
            {/* <Card className="col-md-4">
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
            </Card> */}
            <CheckoutCard
              picture={car.picture}
              model={car.model}
              class={car.class}
              price={car.price}
            />

            <Form className="col-md-3 offset-md-1">
              <Form.Group>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="input"
                  name="firstName"
                  placeholder="First name"
                  value={this.state.contract.firstName}
                  onChange={this.onInputChanged}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="input"
                  name="lastName"
                  placeholder="Last name"
                  value={this.state.contract.lastName}
                  onChange={this.onInputChanged}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  placeholder="age"
                  value={this.state.contract.age}
                  onChange={this.onInputChanged}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Return date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="estimatedReturnDate"
                  defaultValue={moment(new Date()).format('YYYY-MM-DDTHH:mm')}
                  min={moment(new Date()).format('YYYY-MM-DDThh:mm')}
                  onChange={this.onInputChanged}
                />
              </Form.Group>
              <Button variant="outline-success" type="submit" onClick={this.onFormSubmit}>confirm</Button>
              <Link to="/"><Button variant="outline-danger">cancel</Button></Link>
            </Form>
            {/* <InputForm
              firstName={this.state.contract.firstName}
              lastName={this.state.contract.lastName}
              age={this.state.contract.age}
              onInputChanged={this.onInputChanged}
              onFormSubmit={this.onFormSubmit}
            /> */}
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
