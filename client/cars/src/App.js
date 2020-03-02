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

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/"><Cars /></Route>
          <Route exact path="/dashboard"><Contracts /></Route>
        </Switch>
        {/* <SearchCar /> */}
        {/* <Cars /> */}
        {/* <Contracts /> */}
      </div>
    </Router>
  );
}

export default App;
