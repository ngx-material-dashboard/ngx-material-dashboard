import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';

describe('FilterService', () => {
    let service: FilterService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FilterService);
    });

    it('should update search value when search method called', () => {
        // given: spy on filterSub service property
        const spy = spyOn(service.filterSub, 'next');
        const filter = { filter: { name: 'Add more unit tests!' }};

        // when: search method called
        service.search(filter);

        // expect: filterSub next method to have been called
        expect(spy).toHaveBeenCalledWith(filter);
    });
});
