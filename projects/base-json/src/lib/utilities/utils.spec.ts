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
});
