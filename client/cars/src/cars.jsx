import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import carService from './services/car-service';

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
    };
  }

  componentDidMount() {
    carService
      .getAllCars()
      .then((cars) => {
        this.setState({ cars });
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  }

  render() {
    const { cars } = this.state;
    // console.log(cars);
    return (
      cars ? (
        <div className="container">
          <div className="row">
            {cars
              .sort((a, b) => a.class - b.class || a.model.localeCompare(b.model))
              .map((x) => (
                <Card key={x.model} className="col-md-4">
                  <Card.Img variant="top" src={x.picture} />
                  <Card.Body>
                    <Card.Text>
                      Model:
                      {' '}
                      {x.model}
                    </Card.Text>
                    <Card.Text>
                      Class:
                      {' '}
                      {x.class}
                    </Card.Text>
                    <Card.Text>
                      Price:
                      {' '}
                      {x.price}
                    </Card.Text>
                    <Button variant="outline-success">checkout</Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </div>
      ) : <div>Loading...</div>
    );
  }
}

export default Cars;
