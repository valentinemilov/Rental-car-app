// import 'babel-polyfill';

// import createContract from './create-contract';
// import carService from './car-service';

// describe('createContract should', () => {
//   it('return false if', async () => {
//     const mockContract = {
//       firstName: 'test',
//       lastName: 'tests',
//       age: '20',
//       date: '2020-03-09T07:00:00.000Z',
//     };

//     const mockErrors = {
//       firstNameError: '',
//       lastNameError: '',
//       ageError: '',
//       dateError: '',
//     };

//     const id = '791c0d7e-0dda-4f72-b47c-1a4b9b66df87';

//     const carMock = {
//       id: '791c0d7e-0dda-4f72-b47c-1a4b9b66df87',
//       model: 'Veyron',
//       brand: 'Bugatti',
//       class: 'A',
//       price: 200,
//       picture: 'string.jpg',
//     };

//     const spyOnContract = jest.spyOn(carService, 'createContract')
//       .mockImplementation(async () => Promise.resolve(carMock));

//     await expect(createContract(mockContract, mockErrors, id)).toBe(false);

//     spyOnContract.mockClear();
//   });
// });
