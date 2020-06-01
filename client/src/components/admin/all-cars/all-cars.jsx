import React from 'react';

import './all-cars.css';
import carService from '../../../services/car-service';
import Table from '../table/table';
import SearchCar from '../../shared/search-car/search-car';
import Filters from '../../filters/filters';
import { filterByBrandAndModel } from '../../../services/filter-functions';

class AllCars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allCars: [],
      filter: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  async componentDidMount() {
    try {
      const allCars = await carService.getAllCars();
      this.setState({ allCars });
    } catch (err) {
      console.error(err);
    }
  }

  handleSearchChange(value) {
    this.setState({ filter: value });
  }

  render() {
    const { allCars, filter } = this.state;
    const filteredCars = allCars.filter(filterByBrandAndModel(filter));

    return (
      <div className="all-cars-container">
        <SearchCar onHandleChange={this.handleSearchChange} />
        {/* <Filters mappedArray={allCars} /> */}
        <Table cars={filteredCars} />
      </div>
    );
  }
}

export default AllCars;
