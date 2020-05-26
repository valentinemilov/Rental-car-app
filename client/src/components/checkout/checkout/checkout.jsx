import React from 'react';
import { withRouter } from 'react-router-dom';

import carService from '../../../services/car-service';
import CardCheckout from '../card-checkout/card-checkout';
import CardTotal from '../card-total/card-total';
import InputForm from '../form/form';
import createContract from '../../../services/create-contract';
import {
  validateNameOnChange,
  validateAgeOnChange,
  validateDate,
} from '../../../services/form-validations';
import { now, addOneDay } from '../../../services/date-formatter';
import './checkout.css';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: null,
      contract: {
        firstName: '',
        lastName: '',
        age: '',
        estimatedReturnDate: addOneDay(now()).toISOString(),
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

  handleInputChanged(key, value) {
    const { contract } = this.state;
    const { errors } = this.state;
    contract[key] = value;

    errors.firstNameError = validateNameOnChange(contract.firstName);
    errors.lastNameError = validateNameOnChange(contract.lastName);
    errors.ageError = validateAgeOnChange(contract.age);
    errors.dateError = validateDate(contract.estimatedReturnDate);

    this.setState({ contract, errors });
  }

  async handleFormSubmit() {
    const { contract } = this.state;
    const { errors } = this.state;
    const { id } = this.state.car;

    const createdContract = await createContract(contract, errors, id);
    if (createdContract) {
      this.setState({ contract: createdContract.contract, errors: createdContract.errors });
    } else {
      await this.props.history.push('/dashboard');
    }
  }

  render() {
    const { car } = this.state;
    const { contract } = this.state;
    const { errors } = this.state;

    return (
      car && (
        <div className="checkout-container">
          <div className="card-container">
            <CardCheckout car={car} />
            <InputForm
              contract={contract}
              errors={errors}
              onInputChanged={this.handleInputChanged}
            />
          </div>
          <CardTotal
            contract={contract}
            price={car.price}
            onFormSubmit={this.handleFormSubmit}
          />
        </div>
      )
    );
  }
}

export default withRouter(Checkout);
