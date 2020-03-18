import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import carService from './services/car-service';
import CheckoutCard from './checkout-card';
import CardTotal from './card-total';
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
        pickupDate: moment().format('YYYY-MM-DDTHH:mm'),
        estimatedReturnDate: moment().format('YYYY-MM-DDTHH:mm'),
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
    contract[key] = value;
    contract.age = +contract.age;
    this.setState({ contract });
  }

  async onFormSubmit() {
    const { contract } = this.state;
    event.preventDefault();
    const { id } = this.state.car;
    try {
      await carService.createContract(id, contract);
      await this.props.history.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { car } = this.state;
    const { contract } = this.state;
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
              firstName={this.state.contract.firstName}
              lastName={this.state.contract.lastName}
              age={this.state.contract.age}
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
