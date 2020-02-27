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
  }

  componentDidMount() {
    carService
      .getAllContracts()
      .then((contracts) => {
        this.setState({ contracts });
      })
    // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
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
                  <td>...</td>
                  <td>{`${x.firstName} ${x.lastName}`}</td>
                  <td>{x.pickupDate}</td>
                  <td>{x.estimatedReturnDate}</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td><Button variant="outline-info" size="sm">return car</Button></td>
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
