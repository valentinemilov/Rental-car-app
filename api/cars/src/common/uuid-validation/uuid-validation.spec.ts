import validateUniqueId from './uuid-validation';

describe('uuid-validation should', () => {
    it('return false if random string is passed', () => {
        expect(validateUniqueId('123aa-asdwfg')).toBe(false);
    });

    it('return true if passed identifier is unique', () => {
        expect(validateUniqueId('a34e5a6d-6e7c-401a-bc93-93c97a32aa67')).toBe(true);
    });

    it('return true with trailing whitespacing', () => {
        expect(validateUniqueId('a1fd0475-aaaa-4f6b-b2b5-3e95034c96b4 ')).toBe(true);
        expect(validateUniqueId(' a1fd0475-aaaa-4f6b-b2b5-3e95034c96b4')).toBe(true);
    });

    it('return false if null is passed', () => {
        expect(validateUniqueId(null)).toBe(false);
    });

    it('return false if undefined is passed', () => {
        expect(validateUniqueId(undefined)).toBe(false);
    });
});
