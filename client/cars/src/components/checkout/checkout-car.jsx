import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import carService from '../../services/car-service';
import CheckoutCard from './checkout-card';
import CardTotal from './card-total';
import InputForm from './form';
import validateForm from '../../services/validate-form';

class CheckoutCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: null,
      contract: {
        firstName: '',
        lastName: '',
        age: 18,
        pickupDate: moment().format('YYYY-MM-DDTHH:mm'),
        estimatedReturnDate: moment().format('YYYY-MM-DDTHH:mm'),
      },
      errors: {
        firstNameError: '',
        lastNameError: '',
        ageError: '',
        dateError: '',
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

  onInputChanged(key, value) {
    const { contract } = this.state;
    const { errors } = this.state;
    contract[key] = value;
    contract.age = +contract.age;

    if (contract.firstName.length < 3) {
      errors.firstNameError = 'Must be at least 3 chars';
    } else {
      errors.firstNameError = '';
    }

    if (contract.lastName.length < 3) {
      errors.lastNameError = 'Must be at least 3 chars';
    } else {
      errors.lastNameError = '';
    }

    if (contract.age < 18) {
      errors.ageError = 'Age must be over 18';
    } else {
      errors.ageError = '';
    }

    if (contract.estimatedReturnDate < moment().format('YYYY-MM-DDTHH:mm')) {
      errors.dateError = 'Invalid date';
    } else {
      errors.dateError = '';
    }

    this.setState({ contract, errors });
  }

  async onFormSubmit(event) {
    const { contract } = this.state;
    const { errors } = this.state;
    const { id } = this.state.car;
    event.preventDefault();

    try {
      if (validateForm(errors)) {
        await carService.createContract(id, contract);
        await this.props.history.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { car } = this.state;
    const { contract } = this.state;
    const { errors } = this.state;
    return (
      car && (
        <div className="container">
          <div className="row">
            <CheckoutCard
              picture={car.picture}
              model={car.model}
              carClass={car.class}
              price={car.price}
            />
            <InputForm
              firstName={contract.firstName}
              lastName={contract.lastName}
              age={contract.age}
              errors={errors}
              onInputChanged={this.onInputChanged}
              onFormSubmit={this.onFormSubmit}
            />
            <CardTotal
              contract={contract}
              price={car.price}
            />
          </div>
        </div>
      )
    );
  }
}

export default withRouter(CheckoutCar);
