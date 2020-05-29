import React from 'react';

import './all-cars.css';
import carService from '../../../services/car-service';

class AllCars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allCars: [],
    };
    this.createTableRows = this.createTableRows.bind(this);
  }

  async componentDidMount() {
    try {
      const allCars = await carService.getAllCars();
      this.setState({ allCars });
    } catch (err) {
      console.error(err);
    }
  }

  createTableRows() {
    const { allCars } = this.state;
    allCars.map((x) => (
      <tr key={x.id}>
        <td>{x.brand}</td>
        <td>{x.model}</td>
        <td>{x.class}</td>
        <td>{x.price}</td>
        <td>{`${x.isAvailable}`}</td>
        <td><img src={x.picture} alt="car" /></td>
      </tr>
    ));
  }

  render() {
    const { allCars } = this.state;
    // console.log(allCars);
    return (
    //   allCars.map((x) => (
    //     <div key={x.id} className="aaa">
    //       <div>{x.brand}</div>
    //       <div>{x.model}</div>
    //       <div>{x.price}</div>
    //       <div>{x.class}</div>
    //       <div>{`${x.isAvailable}`}</div>
    //       <img src={x.picture} alt="car" />
    //     </div>
    //   ))
      <div className="aaa">
        <table>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Class</th>
              <th>Price</th>
              <th>Status</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
              {this.createTableRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AllCars;
