import isDateValid from './date-validation';

describe('isDateValid should', () => {
    it('return false if the second date is bigger than the first date', () => {
        const firstDate: Date = new Date('2020-03-09T07:52:00.000Z');
        const seondDate: Date = new Date('2020-03-09T07:55:00.000Z');

        expect(isDateValid(firstDate, seondDate)).toBe(false);
    });

    it('return false if the second date is equal to the first date', () => {
        const firstDate: Date = new Date('2020-03-09T07:55:00.000Z');
        const seondDate: Date = new Date('2020-03-09T07:55:00.000Z');

        expect(isDateValid(firstDate, seondDate)).toBe(false);
    });

    it('return true if the first date is bigger than the second date', () => {
        const firstDate: Date = new Date('2020-03-10T07:55:00.000Z');
        const seondDate: Date = new Date('2020-03-09T07:55:00.000Z');

        expect(isDateValid(firstDate, seondDate)).toBe(true);
    });
});
