import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../services/loading.service';

/**
 * A wrapper component for `MatProgressSpinner` that only displays the spinner
 * when HTTP requests are in progress. This component is automatically included
 * in the `DefaultLayout`, so there is no need to include this yourself if you
 * are using that.
 *
 * You may use this component if you are not using the `DefaultLayout`. The
 * `LoadingService` must be conigured for this component to work correctly. See
 * the [LoadingService](/widgets/services/loading) documentation for more info.
 *
 *  @usageNotes
 * #### Basic Usage Example
 * ```html
 * <ngx-material-dashboard-loading></ngx-material-dashboard-default-loading>
 * <!-- any additional tags -->
 * ```
 * ```typescript
 * import {Component} from '@angular/core';
 *
 * @Component({
 *     selector: 'basic-usage-example',
 *     templateUrl: './basic-usage-example.html'
 * })
 * export class BasicUsageExample {}
 * ```
 */
@Component({
    selector: 'ngx-material-dashboard-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
    /** Boolean indicating whether or not to display loading spinner. */
    loading: boolean;
    /** The subscriptions for the component. */
    sub: Subscription;

    constructor(private loadingService: LoadingService) {
        this.loading = false;
        this.sub = new Subscription();
    }

    ngOnInit() {
        const sub = this.loadingService.loadingSub.subscribe((loadingState) => {
            this.loading = loadingState;
        });
        sub.add(sub);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
