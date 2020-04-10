import React from 'react';
import Table from 'react-bootstrap/Table';

import carService from '../../services/car-service';
import ContractsTable from './contracts-table';
import './style.css';

class Contracts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
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
      const cotractToClose = await carService.closeContract(id);
      const contracts = await carService.getAllContracts();
      this.setState({ contracts });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { contracts } = this.state;

    return (
      contracts ? (
        <div className="contaner">
          <Table className="dashboard-table" striped bordered hover responsive="md">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Customer</th>
                <th>From</th>
                <th>Estimated Return Date</th>
                <th>Estimated Days Rented</th>
                <th>Estimated Price per Day</th>
                <th>Current Days Rented</th>
                <th>Current Price per Day</th>
                <th>Current Total Price</th>
                <th>*</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((x) => (
                <ContractsTable
                  key={x.id}
                  brand={x.brand}
                  model={x.model}
                  name={`${x.firstName} ${x.lastName}`}
                  contract={x}
                  onClickToClose={this.closeContract}
                />
              ))}
            </tbody>
          </Table>
        </div>
      ) : <div>Loading...</div>
    );
  }
}

export default Contracts;
