import React from 'react';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import carService from '../../../services/car-service';
import TextInput from '../text-input/text-input';
import Filters from '../../shared/filters/filters';
import UploadFileCmp from '../upload-file-input/upload-file-input';
import { createArrayOfUniqueStrings } from '../../../services/filter-functions';
import { isValidCreateCarForm, clearInputFields } from '../../../services/validate-form';
import CarImage from '../car-image/car-image';
import './create-car.css';

class CreateCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createCar: {
        brand: '',
        model: '',
        class: '',
        picture: '',
      },
      selectedFile: null,
      image: null,
      carClasses: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.createNewCar = this.createNewCar.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  async componentDidMount() {
    try {
      const carClasses = await carService.getCarClasses();
      this.setState({ carClasses });
    } catch (err) {
      console.error(err);
    }
  }

  handleChange(event) {
    const key = event.target.getAttribute('data-name');
    const { value } = event.target;
    const { createCar } = this.state;
    createCar[key] = value;
    this.setState({ createCar });
  }

  handleSelectChange(key, value) {
    const { createCar } = this.state;
    const options = value !== 'Select class' ? value : '';
    createCar[key] = options;
    this.setState({ createCar });
  }

  fileChangedHandler(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  async fileUploadHandler() {
    const { selectedFile, createCar } = this.state;
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);
    try {
      const image = await carService.uploadCarImage(formData);
      createCar.picture = image.name;
      this.setState({ image, createCar, selectedFile: null });
    } catch (err) {
      console.error(err);
    }
  }

  async createNewCar() {
    const { createCar } = this.state;
    try {
      await carService.createNewCar(createCar);
      const clearedInput = clearInputFields(createCar);
      this.setState({ createCar: clearedInput, image: null });
      console.log(clearedInput);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      createCar, selectedFile, image, carClasses,
    } = this.state;
    const allCarClasses = createArrayOfUniqueStrings(carClasses, 'class', 'Select class');
    const isValidCar = isValidCreateCarForm(createCar);

    return (
      <div className="admin-page-container">
        <CarImage image={image} />
        <div className="admin-form-container">
          <TextInput labelFor="brand" label="Brand" type="text" data="brand" id="brand" placeholder="Brand" value={createCar.brand} handleChange={this.handleChange} />
          <TextInput labelFor="model" label="Model" type="text" data="model" id="model" placeholder="Model" value={createCar.model} handleChange={this.handleChange} />
          <p>Class</p>
          <Filters mappedArray={allCarClasses} onSelectChange={this.handleSelectChange} dataFilter="class" />
          <div className="admin-form-container-btn">
            <FontAwesomeIcon className={isValidCar ? '' : 'success-btn-disabled'} onClick={this.createNewCar} type="submit" icon={faCheckCircle} />
            <Link to="/admin/cars"><FontAwesomeIcon icon={faTimesCircle} /></Link>
          </div>
          <UploadFileCmp type="file" fileChangedHandler={this.fileChangedHandler} selectedFile={selectedFile} fileUploadHandler={this.fileUploadHandler} />
        </div>
      </div>
    );
  }
}

export default CreateCar;
