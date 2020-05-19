/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import 'babel-polyfill';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MemoryRouter } from 'react-router';

import carService from '../../../services/car-service';
import Checkout from './checkout';

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

it('should render component correctly if the required car is found', async () => {
  const carMock = {
    id: '791c0d7e-0dda-4f72-b47c-1a4b9b66df87',
    model: 'Veyron',
    brand: 'Bugatti',
    class: 'A',
    price: 200,
    picture: 'string.jpg',
  };

  jest.spyOn(carService, 'getIndividulCar')
    .mockImplementation(async () => Promise.resolve(carMock));

  await act(async () => {
    render(<MemoryRouter><Checkout /></MemoryRouter>, container);
  });

  expect(container.querySelector('div').className).toEqual('checkout-container');
});
