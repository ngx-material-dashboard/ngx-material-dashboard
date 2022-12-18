import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
    let loading: boolean;
    let service: LoadingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoadingService]
        });
        service = TestBed.inject(LoadingService);

        // subscribe to loading behavioursubject so it is available for tests
        service.loadingSub.subscribe((res: boolean) => {
            loading = res;
        });
    });

    describe('Existing active requests', () => {
        const activeRequests: string[] = ['', 'requests'];

        beforeEach(() => {
            setLoading(service, true, activeRequests);
        });

        for (let i = 0; i < activeRequests.length; i++) {
            it(`should emit as still loading when only ${activeRequests[i]} completes`, () => {
                // when: the request completes
                service.setLoading(false, activeRequests[i]);

                // then: the loading observable should emit as true
                expect(loading).toEqual(true);
            });
        }

        it('should emit as not loading when all active requests complete', () => {
            // when: all requests complete
            setLoading(service, false, activeRequests);

            // then: the loading observable should emit as false
            expect(loading).toEqual(false);
        });
    });

    describe('No active requests', () => {
        it('should emit as loading when new request is made', () => {
            // when: a new request is made
            service.setLoading(true, '');

            // then: the loading observable should emit as true
            expect(loading).toEqual(true);
        });

        it('should emit as not loading when new request completes (and no other requests made)', () => {
            // given: a new request
            service.setLoading(true, '');

            // expect: the loading observable should emit as true
            expect(loading).toEqual(true);

            // when: the request completes
            service.setLoading(false, '');

            // then: the loading observable should emit as false
            expect(loading).toEqual(false);
        });

        it('should emit as not loading when request completes but was not initiated in loadingMap', () => {
            // when: the request completes
            service.setLoading(false, '');

            // then: the loading observable should emit as false
            expect(loading).toEqual(false);
        });
    });
});

function setLoading(
    service: LoadingService,
    loading: boolean,
    requestUrls: string[]
) {
    for (let i = 0; i < requestUrls.length; i++) {
        service.setLoading(loading, requestUrls[i]);
    }
}
