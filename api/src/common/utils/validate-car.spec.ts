/* eslint-disable @typescript-eslint/explicit-function-return-type */
import validateCarBody from './validate-car';

const getCarMock = (brand = 'test') => ({
    brand,
    model: 'tests',
    class: 'A',
    picture: '491521f3-e3b8-45fe-bb8c-876a30f51ccb.jpg',
});

describe('validateCarBody() should', () => {
    it('throw if an object property has null value', () => {
        const carMock = getCarMock(null);
        expect(() => validateCarBody(carMock)).toThrowError();
    });

    
    it('throw if an object property is ""', () => {
        const carMock = getCarMock('');
        expect(() => validateCarBody(carMock)).toThrowError();
    });
    
    it('throw if an object property is string with spaces only', () => {
        const carMock = getCarMock(' ');
        expect(() => validateCarBody(carMock)).toThrowError();
    });
    
    it('throw if an object property has undefined value', () => {
        const carMock = {
            brand: undefined,
            model: 'tests',
            class: 'A',
            picture: '491521f3-e3b8-45fe-bb8c-876a30f51ccb.jpg',
        };

        expect(() => validateCarBody(carMock)).toThrowError();
    });

    it('throw if all object props are invalid', () => {
        const carMock = {
            brand: '',
            model: '  ',
            class: null,
            picture: undefined,
        };
        expect(() => validateCarBody(carMock)).toThrowError();
    });

    it('not throw if all object props are valid', () => {
        const carMock = getCarMock();
        expect(() => validateCarBody(carMock)).not.toThrow();
    });
});