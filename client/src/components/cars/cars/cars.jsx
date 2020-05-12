import React from 'react';

import carService from '../../../services/car-service';
import SearchCar from '../search-car/search-car';
import CarCard from '../car-card/car-card';
import './cars.css';

const filterByBrandAndModel = (word) => (car) => (
  car.brand
    .toLowerCase()
    .startsWith(word.toLowerCase())
  || car.model
    .toLowerCase()
    .startsWith(word.toLowerCase())
);

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      filter: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
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

  render() {
    const { cars, filter } = this.state;
    return (
      cars.length ? (
        <div className="car-container">
          <SearchCar onHandleChange={this.handleSearchChange} />
          <div className="row">
            {cars
              .filter(filterByBrandAndModel(filter))
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
