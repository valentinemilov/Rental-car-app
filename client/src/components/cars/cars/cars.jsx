import React from 'react';

import carService from '../../../services/car-service';
import SearchCar from '../../shared/search-car/search-car';
import CarCard from '../car-card/car-card';
import Filters from '../../filters/filters';
import {
  createArrayOfUniqueStrings,
  filterByGivenProp,
  filterByBrandAndModel,
} from '../../../services/filter-functions';
import './cars.css';

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      filter: '',
      byBrand: '',
      byClass: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  async componentDidMount() {
    try {
      const cars = await carService.getAllFreeCars();
      this.setState({ cars });
    } catch (err) {
      console.error(err);
    }
  }

  handleSearchChange(value) {
    this.setState({ filter: value });
  }

  handleSelectChange(key, value) {
    const options = value !== 'All Cars' ? value : '';
    this.setState({ [key]: options });
  }

  render() {
    const {
      cars, filter, byBrand, byClass,
    } = this.state;

    const filteredCars = cars
      .filter(filterByBrandAndModel(filter))
      .filter(filterByGivenProp(byClass, 'class'))
      .filter(filterByGivenProp(byBrand, 'brand'));

    const filterByClass = createArrayOfUniqueStrings(filteredCars, 'class', 'All Cars');
    const filterByBrand = createArrayOfUniqueStrings(filteredCars, 'brand', 'All Cars');

    return (
      cars ? (
        <div className="car-container">
          <div className="car-search">
            <SearchCar onHandleChange={this.handleSearchChange} />
            <div className="car-search-filters">
              <Filters mappedArray={filterByClass} onSelectChange={this.handleSelectChange} dataFilter="byClass" label="class" />
              <Filters mappedArray={filterByBrand} onSelectChange={this.handleSelectChange} dataFilter="byBrand" label="brand" />
            </div>
          </div>
          <div className="row">
            {filteredCars
              .sort(
                (a, b) => a.class.localeCompare(b.class)
              || a.brand.localeCompare(b.brand)
              || a.model.localeCompare(b.model),
              )
              .map((x) => (
                <CarCard key={x.id} car={x} />
              ))}
          </div>
        </div>
      ) : <div className="car-not-found">No cars found</div>
    );
  }
}

export default Cars;
