/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import 'babel-polyfill';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Cars from './cars';
import carService from '../../../services/car-service';

configure({ adapter: new Adapter() });

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

it('should render correctly Cars component', () => {
  act(() => {
    render(<Cars />, container);
  });

  expect(container).toMatchSnapshot();
});

it('should render cars data if available', async () => {
  const carMock = {
    id: '791c0d7e-0dda-4f72-b47c-1a4b9b66df87',
    model: 'Veyron',
    brand: 'Bugatti',
    class: 'A',
    price: 200,
    picture: 'string.jpg',
  };

  jest.spyOn(carService, 'getAllFreeCars')
    .mockImplementation(async () => Promise.resolve([carMock]));

  const component = shallow(<Cars />);

  // return new Promise((resolve) => setImmediate(resolve)).then(() => {
  //   const display = component.find('.car-container');

  //   expect(display.exists()).toBe(true);
  // });

  const instance = component.instance();
  await instance.componentDidMount();

  const output = component.find('.car-container');
  expect(output.exists()).toBe(true);
});

it('should render message if cars array is empty', async () => {
  jest.spyOn(carService, 'getAllFreeCars')
    .mockImplementation(async () => Promise.resolve([]));

  const component = shallow(<Cars />);

  await expect(component.find('div').hasClass('car-not-found')).toBe(true);
});
