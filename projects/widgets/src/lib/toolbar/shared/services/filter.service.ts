import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * A shareable service for managing state changes in filter for paged content.
 */
@Injectable({
    providedIn: 'root'
})
export class FilterService {

    /** An observable of the filter map. */
    readonly filter: Observable<any>;
    /** The behavior subject that tracks the latest filter map. */
    filterSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor() {
        this.filter = this.filterSub.asObservable();
    }

    /**
     * Updates the filter subject with the next filter value.
     */
    search(filter: any) {
        this.filterSub.next(filter);
    }
}
