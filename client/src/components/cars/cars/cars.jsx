import React from 'react';

import carService from '../../../services/car-service';
import SearchCar from '../search-car/search-car';
import CarCard from '../car-card/car-card';
import Filters from '../../filters/filters';
import './cars.css';

const filterByBrandAndModel = (word) => (car) => (
  car.brand
    .toLowerCase()
    .includes(word.toLowerCase())
  || car.model
    .toLowerCase()
    .includes(word.toLowerCase())
);

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
      const cars = await carService.getAllCars();
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

    let filteredCars = cars.filter(filterByBrandAndModel(filter));
    filteredCars = filteredCars
      // .sort((a, b) => a.class.localeCompare(b.class) || a.brand.localeCompare(b.brand))
      .filter((x, _, arr) => {
        if (byBrand !== '') {
          return x.brand === byBrand;
        }

        return arr;
      }).filter((x, _, arr) => {
        if (byClass !== '') {
          return x.class === byClass;
        }

        return arr;
      });

    const array = ['All Cars', ...new Set(filteredCars.map((x) => x.class))];
    const array1 = ['All Cars', ...new Set(filteredCars.map((x) => x.brand))];

    return (
      cars.length ? (
        <div className="car-container">
          <SearchCar onHandleChange={this.handleSearchChange} />
          <Filters mappedArray={array} onSelectChange={this.handleSelectChange} dataFilter="byClass" label="class" />
          <Filters mappedArray={array1} onSelectChange={this.handleSelectChange} dataFilter="byBrand" label="brand" />
          <div className="row">
            {filteredCars
              // .filter(filterByBrandAndModel(filter))
              .sort((a, b) => a.class.localeCompare(b.class) || a.brand.localeCompare(b.brand))
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
