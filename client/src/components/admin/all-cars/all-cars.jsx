import React from 'react';

import './all-cars.css';
import carService from '../../../services/car-service';
import Table from '../table/table';
import SearchCar from '../../shared/search-car/search-car';
import Filters from '../../shared/filters/filters';
import {
  filterByBrandAndModel,
  filterByGivenProp,
  createArrayOfUniqueStrings,
} from '../../../services/filter-functions';

class AllCars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allCars: [],
      filter: '',
      byClass: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
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

  handleSelectChange(key, value) {
    const options = value !== 'All Cars' ? value : '';
    this.setState({ [key]: options });
  }

  render() {
    const { allCars, filter, byClass } = this.state;
    const filteredCars = allCars
      .filter(filterByBrandAndModel(filter))
      .filter(filterByGivenProp(byClass, 'class'));

    const filterByClass = createArrayOfUniqueStrings(filteredCars, 'class', 'All Cars');

    return (
      <div className="all-cars-container">
        <div className="all-cars-search">
          <SearchCar onHandleChange={this.handleSearchChange} />
          <Filters mappedArray={filterByClass} onSelectChange={this.handleSelectChange} dataFilter="byClass" label="Filter by class" />
        </div>
        <Table cars={filteredCars} />
      </div>
    );
  }
}

export default AllCars;
