import React from 'react';

import carService from '../../../services/car-service';
import CardCheckout from '../../checkout/card-checkout/card-checkout';
import TextInput from '../text-input/text-input';
import Filters from '../../shared/filters/filters';
import { createTruthyPropsObject } from '../../../services/validate-form';
import './edit-individual-car.css';

class EditIndividualCar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      car: null,
      editCar: {
        brand: '',
        model: '',
        class: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.submit = this.submit.bind(this);
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

  handleChange(event) {
    const key = event.target.getAttribute('data-name');
    const { value } = event.target;

    const { editCar } = this.state;
    editCar[key] = value;
    this.setState({ editCar });
  }

  handleSelectChange(key, value) {
    const { editCar } = this.state;
    // const options = value !== 'All Cars' ? value : '';
    editCar[key] = value;
    this.setState({ editCar });
    console.log(editCar);
  }

  submit() {
    const { editCar } = this.state;
    console.log(createTruthyPropsObject(editCar));
  }

  render() {
    const { car, editCar } = this.state;
    const hardcodedFilters = ['A', 'B', 'C', 'D', 'E'];
    return (
      car && (
        <div className="admin-page-container">
          <CardCheckout car={car} />
          <div className="admin-form-container">
            <TextInput labelFor="brand" label="Brand" type="text" data="brand" id="brand" placeholder="Brand" value={editCar.brand} handleChange={this.handleChange} />
            <TextInput labelFor="model" label="Model" type="text" data="model" id="model" placeholder="Model" value={editCar.model} handleChange={this.handleChange} />
            <Filters mappedArray={hardcodedFilters} onSelectChange={this.handleSelectChange} dataFilter="class" label="class" />
            <button type="button" onClick={this.submit}>submit</button>
          </div>
        </div>
      )
    );
  }
}

export default EditIndividualCar;
