import React from 'react';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import carService from '../../../services/car-service';
import CarImage from '../car-image/car-image';
import TextInput from '../text-input/text-input';
import Filters from '../../shared/filters/filters';
import UploadFileCmp from '../upload-file-input/upload-file-input';
import { createSortedArrayOfStrings } from '../../../services/filter-functions';
import { toastSuccess, toastError } from '../../../services/toastify';
import imageFileFilter from '../shared/tostify-validations';
import { isValidCreateCarForm, errorMsg } from '../../../services/validate-form';
import LoadSpinner from '../../shared/load-spinner/load-spinner';
import './edit-individual-car.css';

class EditIndividualCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editCar: {
        brand: '',
        model: '',
        class: '',
      },
      selectedFile: null,
      image: null,
      carClasses: [],
      isLoading: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.updateSingleCar = this.updateSingleCar.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const { editCar } = this.state;
    try {
      const car = await carService.getIndividulCar(id);
      const carClasses = await carService.getCarClasses();

      editCar.brand = car.brand;
      editCar.model = car.model;
      editCar.class = car.class;
      this.setState({ carClasses, isLoading: false, image: car.picture });
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
    editCar[key] = value;
    this.setState({ editCar });
  }

  async updateSingleCar() {
    const { id } = this.props.match.params;
    const { editCar } = this.state;
    try {
      if (isValidCreateCarForm(editCar)) {
        this.setState({ isLoading: true });
        const updatedCar = await carService.updateCar(id, editCar);
        const image = updatedCar.picture;
        this.setState({ image, isLoading: false });
        toastSuccess('Successfully updated');
      } else {
        errorMsg(editCar);
      }
    } catch (err) {
      toastError();
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
      if (imageFileFilter(selectedFile)) {
        this.setState({ isLoading: true });
        const updatedImg = await carService.updateCarImage(id, formData);
        const image = updatedImg.picture;
        this.setState({ image, isLoading: false, selectedFile: null });
        toastSuccess('Image successfully updated');
      }
      this.setState({ selectedFile: null });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      editCar, selectedFile, carClasses, isLoading, image,
    } = this.state;
    const allCarClasses = createSortedArrayOfStrings(carClasses, 'class', editCar.class);

    if (isLoading) return <LoadSpinner />;
    return (
      <div className="admin-page-container">
        <CarImage image={image} />
        <div className="admin-form-container">
          <TextInput labelFor="brand" label="Brand" type="text" data="brand" id="brand" placeholder="Brand" value={editCar.brand} handleChange={this.handleChange} />
          <TextInput labelFor="model" label="Model" type="text" data="model" id="model" placeholder="Model" value={editCar.model} handleChange={this.handleChange} />
          <p>Class</p>
          <Filters mappedArray={allCarClasses} onSelectChange={this.handleSelectChange} dataFilter="class" />
          <div className="admin-form-container-btn">
            <FontAwesomeIcon className={isLoading ? 'success-btn-disabled' : ''} onClick={this.updateSingleCar} type="submit" icon={faCheckCircle} />
            <Link to="/admin/cars"><FontAwesomeIcon icon={faTimesCircle} /></Link>
          </div>
          <UploadFileCmp type="file" fileChangedHandler={this.fileChangedHandler} selectedFile={selectedFile} fileUploadHandler={this.fileUploadHandler} />
        </div>
      </div>
    );
  }
}

export default EditIndividualCar;
