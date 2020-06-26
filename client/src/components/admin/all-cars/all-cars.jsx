import React from 'react';
import { Link } from 'react-router-dom';

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
import CreateButton from '../create-button/create-button';
import LoadSpinner from '../../shared/load-spinner/load-spinner';

class AllCars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allCars: [],
      filter: '',
      byClass: '',
      isLoading: true,
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  async componentDidMount() {
    try {
      const allCars = await carService.getAllCars();
      this.setState({ allCars, isLoading: false });
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
      allCars, filter, byClass, isLoading,
    } = this.state;
    const filteredCars = allCars
      .filter(filterByBrandAndModel(filter))
      .filter(filterByGivenProp(byClass, 'class'));

    const filterByClass = createArrayOfUniqueStrings(filteredCars, 'class', 'All Cars');

    if (isLoading) return <LoadSpinner />;
    return (
      <div className="all-cars-container">
        <div className="all-cars-search">
          <SearchCar onHandleChange={this.handleSearchChange} />
          <Filters mappedArray={filterByClass} onSelectChange={this.handleSelectChange} dataFilter="byClass" label="Filter by class" />
          <Link to="/admin/car/create"><CreateButton name="Create Car" /></Link>
        </div>
        <Table cars={filteredCars} />
      </div>
    );
  }
}

export default AllCars;
