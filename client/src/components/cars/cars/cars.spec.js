/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import 'babel-polyfill';
import Cars from './cars';
import carService from '../../../services/car-service';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('should render cars data', async () => {
  const carMock = {
    id: '791c0d7e-0dda-4f72-b47c-1a4b9b66df87',
    model: 'Veyron',
    brand: 'Bugatti',
    class: 'A',
    price: 200,
    picture: 'string.jpg',
  };

  jest.spyOn(carService, 'getAllCars')
    .mockImplementation(async () => Promise.resolve([carMock]));

  await act(async () => {
    render(<Cars />, container);
  });

  expect(container.querySelector('div').className).toEqual('car-container');
});

it('should render no data', async () => {
  const carMock = {
    id: '791c0d7e-0dda-4f72-b47c-1a4b9b66df87',
    model: 'Veyron',
    brand: 'Bugatti',
    class: 'A',
    price: 200,
    picture: 'string.jpg',
  };

  jest.spyOn(carService, 'getAllCars')
    .mockImplementation(async () => Promise.resolve({
      json: () => Promise.resolve(null),
    }));

  await act(async () => {
    render(<Cars />, container);
  });

  expect(container.textContent).toBe('Loading...');
});
