import validateUniqueId from './uuid-validation';

describe('isDateValid should', () => {
    it('return false if the second date is bigger than the first date', () => {
        expect(validateUniqueId('123')).toBe(false);
    });

    it('return false if the second date is equal to the first date', () => {
        expect(validateUniqueId('a34e5a6d-6e7c-401a-bc93-93c97a32aa67')).toBe(true);
    });
});