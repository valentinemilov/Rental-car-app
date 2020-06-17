import React from 'react';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import carService from '../../../services/car-service';
import CardCheckout from '../../checkout/card-checkout/card-checkout';
import TextInput from '../text-input/text-input';
import Filters from '../../shared/filters/filters';
import { createTruthyPropsObject, isValidEditCarForm } from '../../../services/validate-form';
import UploadFileCmp from '../upload-file-input/upload-file-input';
import { createArrayOfUniqueStrings } from '../../../services/filter-functions';
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
      carClasses: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.updateSingleCar = this.updateSingleCar.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const car = await carService.getIndividulCar(id);
      const carClasses = await carService.getCarClasses();
      this.setState({ car, carClasses });
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
  }

  async updateSingleCar() {
    const { id } = this.props.match.params;
    const { editCar } = this.state;
    const carToUpdate = createTruthyPropsObject(editCar);
    try {
      await carService.updateCar(id, carToUpdate);
      const car = await carService.getIndividulCar(id);
      this.setState({ car });
    } catch (err) {
      console.error(err);
    }
  }

  fileChangedHandler(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  async fileUploadHandler() {
    const { id } = this.props.match.params;
    const { selectedFile } = this.state;
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);
    try {
      await carService.updateCarImage(id, formData);
      const car = await carService.getIndividulCar(id);
      this.setState({ car, selectedFile: null });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      car, editCar, selectedFile, carClasses,
    } = this.state;
    const allCarClasses = createArrayOfUniqueStrings(carClasses, 'class', 'Select class');
    const isValidCar = isValidEditCarForm(editCar);

    return (
      car && (
        <div className="admin-page-container">
          <CardCheckout car={car} />
          <div className="admin-form-container">
            <TextInput labelFor="brand" label="Brand" type="text" data="brand" id="brand" placeholder="Brand" value={editCar.brand} handleChange={this.handleChange} />
            <TextInput labelFor="model" label="Model" type="text" data="model" id="model" placeholder="Model" value={editCar.model} handleChange={this.handleChange} />
            <p>Class</p>
            <Filters mappedArray={allCarClasses} onSelectChange={this.handleSelectChange} dataFilter="class" />
            <div className="admin-form-container-btn">
              <FontAwesomeIcon className={isValidCar ? '' : 'success-btn-disabled'} onClick={this.updateSingleCar} type="submit" icon={faCheckCircle} />
              <Link to="/admin/cars"><FontAwesomeIcon icon={faTimesCircle} /></Link>
            </div>
            <UploadFileCmp type="file" fileChangedHandler={this.fileChangedHandler} selectedFile={selectedFile} fileUploadHandler={this.fileUploadHandler} />
          </div>
        </div>
      )
    );
  }
}

export default EditIndividualCar;
