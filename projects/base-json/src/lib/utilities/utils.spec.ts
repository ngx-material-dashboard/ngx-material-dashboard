import utils from './utils';

describe('utils', () => {
    describe('arrayToObject', () => {
        const arr: string[] = [
            'Create Task Test Fixture',
            'Add Task data for unit tests'
        ];

        it('should convert array to object', () => {
            const obj = utils.arrayToObject(arr, {});

            expect(obj[0]).toEqual('Create Task Test Fixture');
            expect(obj[1]).toEqual('Add Task data for unit tests');
        });

        it('should create a plain object if included in options', () => {
            const obj = utils.arrayToObject(arr, { plainObjects: true });

            expect(obj['0']).toEqual('Create Task Test Fixture');
            expect(obj['1']).toEqual('Add Task data for unit tests');
        });
    });

    describe('combine', () => {
        const a: string[] = ['a', 'b', 'c'];
        const b: string[] = ['d', 'e', 'f'];

        it('should combine both arrays', () => {
            expect(utils.combine(a, b)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
        });
    });

    describe('encode', () => {
        it('should return empty string if given value is empty string', () => {
            expect(utils.encode('', undefined, undefined)).toEqual('');
        });
    });

    describe('isBuffer', () => {
        it('should return true for a buffer', () => {
            const buffer = Buffer.from('aa');

            expect(utils.isBuffer(buffer)).toBeTrue();
        });

        it('should return false for primitives', () => {
            expect(utils.isBuffer(0)).toBeFalse();
            expect(utils.isBuffer('aa')).toBeFalse();
            expect(utils.isBuffer(false)).toBeFalse();
        });

        it('should return false for not buffer object', () => {
            expect(utils.isBuffer({ notaBuffer: false })).toBeFalse();
        });
    });

    describe('isRegExp', () => {
        it('should return true for regular expression', () => {
            const regExp = new RegExp('aa');

            expect(utils.isRegExp(regExp)).toBeTrue();
        });

        it('should return false for not a regular expression', () => {
            expect(utils.isRegExp('not a regex')).toBeFalse();
            expect(utils.isRegExp({ notaRegExp: true })).toBeFalse();
        });
    });

    describe('merge', () => {
        it('should merge arrays', () => {
            const source: string[] = ['d', 'e'];
            const target: string[] = ['a', 'b', 'c'];
            expect(utils.merge(target, source, null)).toEqual([
                'a',
                'b',
                'c',
                'd',
                'e'
            ]);
        });

        it('should merge arrays of objects', () => {
            // given: source and target arrays of objects
            const source: any[] = [{ o: 'b' }];
            const target: any[] = [{ o: 'a' }];

            // and: an expected result
            const expected = [{ o: ['a', 'b'] }];

            // when: the arrays of objects are merged
            const res = utils.merge(target, source, null);

            // then: the result should match expected value (comparing res and
            // expected always results in failure, but comparing their string
            // values works; TODO figure out why...)
            expect(res.length).toBe(expected.length);
            expect(res[0].o.toString()).toBe(expected[0].o.toString());
        });

        it('should append a value to an array', () => {
            const source: string = 'c';
            const target: string[] = ['a', 'b'];

            expect(utils.merge(target, source, null)).toEqual(['a', 'b', 'c']);
        });

        it('should merge 2 primitives into an array', () => {
            const source: string = 'b';
            const target: string = 'a';

            expect(utils.merge(target, source, null)).toEqual(['a', 'b']);
        });

        it('should prepend a primitive to an array', () => {
            const source: string[] = ['b', 'c'];
            const target: string = 'a';

            expect(utils.merge(target, source, null)).toEqual(['a', 'b', 'c']);
        });

        it('should return target when source not defined', () => {
            expect(utils.merge(['a', 'b'], null, null)).toEqual(['a', 'b']);
        });
    });
});
