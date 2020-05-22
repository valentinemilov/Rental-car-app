import React from 'react';
import Table from 'react-bootstrap/Table';

import carService from '../../../services/car-service';
import ContractsTable from '../contracts-table/contracts-table';
import './contracts.css';

class Contracts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
      isActive: false,
    };

    this.closeContract = this.closeContract.bind(this);
  }

  async componentDidMount() {
    try {
      const contracts = await carService.getAllContracts();
      this.setState({ contracts });
    } catch (err) {
      console.error(err);
    }
  }

  async closeContract(id) {
    try {
      await carService.closeContract(id);
      const contracts = await carService.getAllContracts();

      this.setState({ contracts, isActive: true });
      setTimeout(() => this.setState({ isActive: false }), 800);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { contracts } = this.state;
    const { isActive } = this.state;
    return (
      contracts ? (
        <Table className={`dashboard-table ${isActive ? 'fade' : ''} fade-onload`} striped bordered hover responsive="md">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Customer</th>
              <th>Pickup Date</th>
              <th>Date to Return</th>
              <th>Estimated Days</th>
              <th>Estimated Price a Day</th>
              <th>Days Rented</th>
              <th>Price a Day</th>
              <th>Total Price</th>
              <th>*</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((x) => (
              <ContractsTable
                key={x.id}
                contract={x}
                onClickToClose={this.closeContract}
              />
            ))}
          </tbody>
        </Table>
      ) : <div className="not-found">No contracts found</div>
    );
  }
}

export default Contracts;
