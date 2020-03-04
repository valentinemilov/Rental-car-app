/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';
import Cars from './cars';
import Contracts from './contracts';
import Navigation from './navbar/navbar';
import CheckoutCar from './checkout-car';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/"><Cars /></Route>
          <Route path="/dashboard"><Contracts /></Route>
          <Route path="/cars/:id" component={CheckoutCar} />
        </Switch>
        {/* <SearchCar /> */}
        {/* <Cars /> */}
        {/* <Contracts /> */}
      </div>
    </Router>
  );
}

export default App;
