import React from 'react';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

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
      selectedFile: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.editSingleCar = this.editSingleCar.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
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
    const options = value !== 'Select class' ? value : '';
    editCar[key] = options;
    this.setState({ editCar });
    // console.log(editCar);
  }

  editSingleCar() {
    const { editCar } = this.state;
    console.log(createTruthyPropsObject(editCar));
  }

  fileChangedHandler(event) {
    this.setState({
      selectedFile: event.target.files[0],
    });
  }

  async fileUploadHandler() {
    const { id } = this.props.match.params;
    const { selectedFile } = this.state;
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);
    // console.log(formData);
    const updatedCarPicture = await carService.uploadCarImage(id, formData);
  }

  render() {
    const { car, editCar } = this.state;
    const hardcodedFilters = ['Select class', 'A', 'B', 'C', 'D', 'E'];
    return (
      car && (
        <div className="admin-page-container">
          <CardCheckout car={car} />
          <div className="admin-form-container">
            <TextInput labelFor="brand" label="Brand" type="text" data="brand" id="brand" placeholder="Brand" value={editCar.brand} handleChange={this.handleChange} />
            <TextInput labelFor="model" label="Model" type="text" data="model" id="model" placeholder="Model" value={editCar.model} handleChange={this.handleChange} />
            <p>Class</p>
            <Filters mappedArray={hardcodedFilters} onSelectChange={this.handleSelectChange} dataFilter="class" />
            <div className="admin-form-container-btn">
              <FontAwesomeIcon onClick={this.editSingleCar} type="submit" icon={faCheckCircle} />
              <Link to="/admin/cars"><FontAwesomeIcon icon={faTimesCircle} /></Link>
            </div>
          </div>
          <input
            style={{ display: 'none' }}
            type="file"
            onChange={this.fileChangedHandler}
            ref={(fileInput) => this.fileInput = fileInput}
          />
          <button type="submit" onClick={() => this.fileInput.click()}>Select File</button>
          <button type="submit" onClick={this.fileUploadHandler}>Upload</button>
        </div>
      )
    );
  }
}

export default EditIndividualCar;
