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

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/"><Cars /></Route>
          <Route path="/dashboard"><Contracts /></Route>
          <Route path="/cars/:id" component={Checkout} />
        </Switch>
        {/* <SearchCar /> */}
        {/* <Cars /> */}
        {/* <Contracts /> */}
      </div>
    </Router>
  );
}

export default App;
