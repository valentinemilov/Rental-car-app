import React from 'react';
import { withRouter } from 'react-router-dom';

import carService from '../../../services/car-service';
import CardCheckout from '../card-checkout/card-checkout';
import CardTotal from '../card-total/card-total';
import InputForm from '../form/form';
import { isValidForm, isValidContract } from '../../../services/validate-form';
import { validateName, validateAge, validateDate } from '../../../services/form-validations';
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
    contract.age = +contract.age;

    errors.firstNameError = validateName(contract.firstName);
    errors.lastNameError = validateName(contract.lastName);
    errors.ageError = validateAge(contract.age);
    errors.dateError = validateDate(contract.estimatedReturnDate);

    this.setState({ contract, errors });
  }

  async handleFormSubmit() {
    const { contract } = this.state;
    const { errors } = this.state;
    const { id } = this.state.car;
    contract.estimatedReturnDate = new Date(contract.estimatedReturnDate).toISOString();

    try {
      if (isValidForm(errors) && isValidContract(contract)) {
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
