import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

import carService from './services/car-service';
import ContractsTable from './contracts-table';

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
      const dateToReturn = moment().format('YYYY-MM-DDTHH:mm');
      const cotractToClose = await carService.closeContract(id, dateToReturn);
      const contracts = await carService.getAllContracts();
      this.setState({ contracts });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { contracts } = this.state;
    // console.log(contracts);
    return (
      contracts ? (
        <div className="container">
          <Table striped bordered hover responsive="md">
            <thead>
              <tr>
                <th>Car</th>
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
                  model={x.__car__.model}
                  name={`${x.firstName} ${x.lastName}`}
                  startDay={x.pickupDate}
                  estimatedReturnDate={x.estimatedReturnDate}
                  estimatedDaysRented={x}
                  estimatedDailyPrice={x}
                  currentDaysRented={x}
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
