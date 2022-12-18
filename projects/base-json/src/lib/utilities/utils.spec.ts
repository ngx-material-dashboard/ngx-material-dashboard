import utils from './utils';

describe('utils', () => {
    
    describe('arrayToObject', () => {

        let arr: string[] = ['Create Task Test Fixture', 'Add Task data for unit tests'];

        it('should convert array to object', () => {
            const obj = utils.arrayToObject(arr, {});

            expect(obj[0]).toEqual('Create Task Test Fixture');
            expect(obj[1]).toEqual('Add Task data for unit tests');
        });
    });

    describe('combine', () => {

        let a: string[] = ['a', 'b', 'c'];
        let b: string[] = ['d', 'e', 'f'];

        it('should combine both arrays', () => {
            expect(utils.combine(a, b)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
        });
    });

    describe('merge', () => {

        it('should merge arrays', () => {
            let source: string[] = ['d', 'e'];
            let target: string[] = ['a', 'b', 'c'];
            expect(utils.merge(target, source, null)).toEqual(['a', 'b', 'c', 'd', 'e']);
        });

        it('should append a value to an array', () => {
            let source: string = 'c';
            let target: string[] = ['a', 'b'];

            expect(utils.merge(target, source, null)).toEqual(['a', 'b', 'c']);
        });

        it('should merge 2 primitives into an array', () => {
            let source: string = 'b';
            let target: string = 'a';

            expect(utils.merge(target, source, null)).toEqual(['a', 'b']);
        });

        it('should prepend a primitive to an array', () => {
            let source: string[] = ['b', 'c'];
            let target: string = 'a';

            expect(utils.merge(target, source, null)).toEqual(['a', 'b', 'c']);
        });

        it('should return target when source not defined', () => {
            expect(utils.merge(['a', 'b'], null, null)).toEqual(['a', 'b']);
        });
    });
});
