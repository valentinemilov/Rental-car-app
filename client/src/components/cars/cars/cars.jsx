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
      selectedValue: '',
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

  handleSelectChange(value) {
    this.setState({ selectedValue: value });
  }

  render() {
    const { cars, filter, selectedValue } = this.state;
    const filteredCars = cars.filter(filterByBrandAndModel(filter));
    const array = [...new Set(filteredCars.map((x) => x.class))];
    // console.log(array)
    const c = filteredCars.filter((x) => x.class === selectedValue);

    return (
      cars.length ? (
        <div className="car-container">
          <SearchCar onHandleChange={this.handleSearchChange} />
          <Filters arr={array} onSelectChange={this.handleSelectChange} />
          <div className="row">
            {c
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
