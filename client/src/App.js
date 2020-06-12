/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';
import Cars from './components/cars/cars/cars';
import Contracts from './components/contracts/contracts/contracts';
import Navigation from './components/navigation/navigation';
import Checkout from './components/checkout/checkout/checkout';
import AllCars from './components/admin/all-cars/all-cars';
import EditIndividualCar from './components/admin/edit-individual-car/edit-individual-car';
import CreateCar from './components/admin/create-car/create-car';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/"><Cars /></Route>
          <Route path="/dashboard"><Contracts /></Route>
          <Route path="/cars/:id" component={Checkout} />
          <Route path="/admin/cars" component={AllCars} />
          <Route path="/admin/car/create" component={CreateCar} />
          <Route path="/admin/car/:id" component={EditIndividualCar} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
