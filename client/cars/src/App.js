/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import './App.css';
import Cars from './cars';
import Contracts from './contracts';
import SearchCar from './search-car';

function App() {
  return (
    <div>
      {/* <SearchCar /> */}
      <Cars />
      <Contracts />
    </div>
  );
}

export default App;
