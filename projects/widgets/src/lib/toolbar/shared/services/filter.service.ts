import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * A shareable service for managing state changes in filter for paged content.
 */
@Injectable({
    providedIn: 'root'
})
export class FilterService {

    readonly filter: Observable<any>;
    filterSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor() {
        this.filter = this.filterSub.asObservable();
    }

    search(filter: any) {
        this.filterSub.next(filter);
    }
}
