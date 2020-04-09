import guard from './guard';

describe('*exists* should', () => {
    it('throw an exception if null or undefined value is passed ', () => {
        expect(
            () => guard.exists(null),
        ).toThrow();
        expect(
            () => guard.exists(undefined),
        ).toThrow();
    });

    it('not throw an exception if object is passed ', () => {
        expect(
            () => guard.exists({}),
        ).not.toThrow();
    });
});

describe('*should* should', () => {
    it('throw an exception if falsy value is passed ', () => {
        expect(
            () => guard.should(false),
        ).toThrow();
    });

    it('not throw an exception if truthy value is passed ', () => {
        expect(
            () => guard.should(true),
        ).not.toThrow();
    });
});
