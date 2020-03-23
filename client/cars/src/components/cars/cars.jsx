import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import carService from '../../services/car-service';
import SearchCar from './search-car';
import CarCard from './car-card';

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      filter: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      const cars = await carService.getAllCars();
      this.setState({ cars });
    } catch (err) {
      console.error(err);
    }
  }

  handleSubmit(event, value) {
    this.setState({ filter: value });
    event.preventDefault();
    console.log(this.state.filter);
  }

  render() {
    const { cars, filter } = this.state;
    return (
      cars ? (
        <div className="container">
          <SearchCar handleSubmit={this.handleSubmit} />
          <div className="row">
            {cars
              .filter((x) => x.model.toLowerCase().includes(filter.toLowerCase()))
              .sort((a, b) => a.class - b.class || a.model.localeCompare(b.model))
              .map((x) => (
                <CarCard
                  key={x.model}
                  picture={x.picture}
                  carClass={x.class}
                  model={x.model}
                  price={x.price}
                  id={x.id}
                />
              ))}
          </div>
        </div>
      ) : <div>Loading...</div>
    );
  }
}

export default Cars;
