import utils from './utils';

describe('utils', () => {
    
    describe('arrayToObject', () => {

        const arr: string[] = ['Create Task Test Fixture', 'Add Task data for unit tests'];

        it('should convert array to object', () => {
            const obj = utils.arrayToObject(arr, {});

            expect(obj[0]).toEqual('Create Task Test Fixture');
            expect(obj[1]).toEqual('Add Task data for unit tests');
        });
    });

    describe('combine', () => {

        const a: string[] = ['a', 'b', 'c'];
        const b: string[] = ['d', 'e', 'f'];

        it('should combine both arrays', () => {
            expect(utils.combine(a, b)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
        });
    });

    describe('merge', () => {

        it('should merge arrays', () => {
            const source: string[] = ['d', 'e'];
            const target: string[] = ['a', 'b', 'c'];
            expect(utils.merge(target, source, null)).toEqual(['a', 'b', 'c', 'd', 'e']);
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
