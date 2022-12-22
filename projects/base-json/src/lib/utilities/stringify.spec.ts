import stringify from './stringify';

describe('stringify', () => {
    describe('normalizeStringifyOptions', () => {
        it('should throw an error if encoder option is not a function', () => {
            expect(() =>
                stringify({ id: '1' }, { encoder: 'not a function' })
            ).toThrowError('Encoder has to be a function.');
        });

        it('should throw an error when charset not utf-8, iso-8859-1, or undefined', () => {
            expect(() =>
                stringify({ id: '1' }, { charset: 'not-valid' })
            ).toThrowError(
                'The charset option must be either utf-8, iso-8859-1, or undefined'
            );
        });
    });
});
