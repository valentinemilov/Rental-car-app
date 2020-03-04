import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import carService from './services/car-service';

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
    // console.log(contracts);
    return (
      // <div>{contracts.map((x) => <div key={x.id}>{x.firstName}</div>)}</div>
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
                <tr key={x.id}>
                  <td>{x.__car__.model}</td>
                  <td>{`${x.firstName} ${x.lastName}`}</td>
                  <td>{x.pickupDate}</td>
                  <td>{x.estimatedReturnDate}</td>
                  <td>..</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td><Button variant="info" size="sm" onClick={() => this.closeContract(x.id)}>return car</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : <div>Loading...</div>
    );
  }
}

export default Contracts;