import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import carService from '../../services/car-service';
import CheckoutCard from './checkout-card';
import CardTotal from './card-total';
import InputForm from './form';
import validateForm from '../../services/validate-form';
import { validateName, validateAge, validateDate } from '../../services/form-validations';
import './style.css';

class CheckoutCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: null,
      contract: {
        firstName: '',
        lastName: '',
        age: 18,
        // pickupDate: moment().format('YYYY-MM-DDTHH:mm'),
        estimatedReturnDate: moment().format('YYYY-MM-DDTHH:mm'),
      },
      errors: {
        firstNameError: '',
        lastNameError: '',
        ageError: '',
        dateError: '',
      },
    };

    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.functionOne = this.functionOne.bind(this);
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

  functionOne(contract) {
    let isValid = true;
    Object.values(contract)
      .forEach(
        (x) => {
          if (x.length === 0) {
            isValid = false;
          }
        },
      );

    return isValid;
  }

  handleInputChanged(key, value) {
    const { contract } = this.state;
    const { errors } = this.state;
    contract[key] = value;
    contract.age = +contract.age;

    errors.firstNameError = validateName(contract.firstName);
    errors.lastNameError = validateName(contract.lastName);
    errors.ageError = validateAge(contract.age);
    errors.dateError = validateDate(contract.estimatedReturnDate);

    this.setState({ contract, errors });
    // console.log(contract)
  }

  async handleFormSubmit(event) {
    const { contract } = this.state;
    const { errors } = this.state;
    const { id } = this.state.car;
    event.preventDefault();

    try {
      if (validateForm(errors) && this.functionOne(contract)) {
        await carService.createContract(id, contract);
        await this.props.history.push('/dashboard');
      } else {
        errors.firstNameError = validateName(contract.firstName);
        errors.lastNameError = validateName(contract.lastName);
        errors.ageError = validateAge(contract.age);
        errors.dateError = validateDate(contract.estimatedReturnDate);

        this.setState({ contract, errors });
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
              onInputChanged={this.handleInputChanged}
              onFormSubmit={this.handleFormSubmit}
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
