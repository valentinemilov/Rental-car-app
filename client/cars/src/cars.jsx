import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import carService from './services/car-service';
import SearchCar from './search-car';
import CarCard from './card';

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      filter: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.navigateToCar = this.navigateToCar.bind(this);
  }

  async componentDidMount() {
    try {
      const cars = await carService.getAllCars();
      this.setState({ cars });
    } catch (err) {
      console.error(err);
    }
  }

  handleSubmit(event, value) {
    // console.log(`A name was submitted: ${value}`);
    this.setState({ filter: value });
    event.preventDefault();
    console.log(this.state.filter);
  }

  // async navigateToCar(id) {
  //   try {
  //     const individualCar = await carService.getIndividulCar(id);
  //     console.log(individualCar);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  render() {
    const { cars, filter } = this.state;
    // console.log(cars);
    return (
      cars ? (
        <div className="container">
          <SearchCar handleSubmit={this.handleSubmit} />
          <div className="row">
            {cars
              .filter((x) => x.model.toLowerCase().includes(filter.toLowerCase()))
              .sort((a, b) => a.class - b.class || a.model.localeCompare(b.model))
              .map((x) => (
                <Card key={x.id} className="col-md-4">
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
                    {/* <Button variant="outline-success" onClick={() => this.navigateToCar(x.id)}>checkout</Button> */}
                    <Link to={`/cars/${x.id}`}><Button variant="outline-success">checkout</Button></Link>
                  </Card.Body>
                </Card>
                // <CarCard
                //   key={x.model}
                //   picture={x.picture}
                //   carClass={x.class}
                //   model={x.model}
                //   price={x.price}
                // />
              ))}
          </div>
        </div>
      ) : <div>Loading...</div>
    );
  }
}

export default Cars;
