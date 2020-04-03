import validateUniqueId from './uuid-validation';

describe('uuid-validation.should', () => {
    it('return false if the second date is bigger than the first date', () => {
        expect(validateUniqueId('123')).toBe(false);
    });

    it('return false if the second date is equal to the first date', () => {
        expect(validateUniqueId('a34e5a6d-6e7c-401a-bc93-93c97a32aa67')).toBe(true);
    });

    it('return true is provided valid id a1fd0475-aaaa-4f6b-b2b5-3e95034c96b4', () => {
        expect(validateUniqueId('a1fd0475-aaaa-4f6b-b2b5-3e95034c96b4')).toBe(true);
    });

    it('return true with trailing whitespacing', () => {
        expect(validateUniqueId('a1fd0475-aaaa-4f6b-b2b5-3e95034c96b4 ')).toBe(true);
    });
});