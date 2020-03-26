import React from 'react';

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

    this.HandleSearchChange = this.HandleSearchChange.bind(this);
  }

  async componentDidMount() {
    try {
      const cars = await carService.getAllCars();
      this.setState({ cars });
    } catch (err) {
      console.error(err);
    }
  }

  HandleSearchChange(value) {
    this.setState({ filter: value });
  }

  render() {
    const { cars, filter } = this.state;
    return (
      cars ? (
        <div className="container">
          <SearchCar
            onHandleChange={this.HandleSearchChange}
          />
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
