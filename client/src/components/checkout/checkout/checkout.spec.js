/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import 'babel-polyfill';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MemoryRouter } from 'react-router';

import Checkout from './checkout';
import carService from '../../../services/car-service';
// import { validateNameOnSubmit, validateAgeOnSubmit, validateDate } from '../../../services/form-validations';
// import { isValidForm, isValidContract } from '../../../services/validate-form';

// jest.mock('../../../services/validate-form');
// jest.mock('../../../services/form-validations');

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

// it('should call carService.createContract() if form and contract are valid', async () => {
//   const carMock = {
//     id: '791c0d7e-0dda-4f72-b47c-1a4b9b66df87',
//     model: 'Veyron',
//     brand: 'Bugatti',
//     class: 'A',
//     price: 200,
//     picture: 'string.jpg',
//   };

//   const contractMock = {
//     firstName: 'Test',
//     lastName: 'Testov',
//     age: 20,
//     estimatedReturnDate: '2020-05-12T09:00:00.624Z',
//   };

//   jest.spyOn(carService, 'getIndividulCar')
//     .mockImplementation(async () => Promise.resolve(carMock));

//   jest.spyOn(carService, 'createContract')
//     .mockImplementation(async () => Promise.resolve({}));

//   const spyOnForm = isValidForm.mockImplementation(() => true);
//   const spyOnContract = isValidContract.mockImplementation(() => true);

//   await act(async () => {
//     render(<MemoryRouter><Checkout /></MemoryRouter>, container);
//   });

//   const button = document.querySelector('.fa-check-circle');

//   act(() => {
//     button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
//   });

//   expect(carService.createContract).toHaveBeenCalledTimes(1);
//   //   expect(carService.createContract).toHaveBeenCalledWith(carMock.id, contractMock);

//   spyOnForm.mockClear();
//   spyOnContract.mockClear();
// });


// it('should return messages if form is not valid', async () => {
//   const carMock = {
//     id: '791c0d7e-0dda-4f72-b47c-1a4b9b66df87',
//     model: 'Veyron',
//     brand: 'Bugatti',
//     class: 'A',
//     price: 200,
//     picture: 'string.jpg',
//   };

//   jest.spyOn(carService, 'getIndividulCar')
//     .mockImplementation(async () => Promise.resolve(carMock));

//   jest.spyOn(carService, 'createContract')
//     .mockImplementation(async () => Promise.resolve({}));

//   const spyOnForm = isValidForm.mockImplementation(() => false);
//   const spyOnContract = isValidContract.mockImplementation(() => false);
//   const spyOnName = validateNameOnSubmit.mockImplementation(() => 'Cannot be empty');
//   const spyOnAge = validateAgeOnSubmit.mockImplementation(() => 'Age must be over 18');
//   const spyOnDate = validateDate.mockImplementation(() => '');

//   await act(async () => {
//     render(<MemoryRouter><Checkout /></MemoryRouter>, container);
//   });

//   const button = document.querySelector('.fa-check-circle');

//   act(() => {
//     button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
//   });

//   expect(validateNameOnSubmit).toHaveBeenCalledTimes(2);
//   expect(validateNameOnSubmit).toHaveReturnedWith(('Cannot be empty'));

//   expect(validateAgeOnSubmit).toHaveBeenCalledTimes(1);
//   expect(validateAgeOnSubmit).toHaveReturnedWith(('Age must be over 18'));

//   expect(validateDate).toHaveBeenCalledTimes(1);
//   expect(validateDate).toHaveReturnedWith((''));

//   spyOnName.mockClear();
//   spyOnAge.mockClear();
//   spyOnDate.mockClear();
//   spyOnForm.mockClear();
//   spyOnContract.mockClear();
// });
