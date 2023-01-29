import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * The LoadingService handles tracking active requests so any subscribers can
 * manage when things like a loading spinner should be displayed. The service
 * uses a map to track requests to different URLs to ensure loading is not set
 * to false before all requests have completed.
 *
 * The `Loading` component utilizes this service to determine when to render a
 * spinner. If you are using the `DefaultLayout`, the `Loading` component is
 * included there, so you should not need to worry about subscribing to load
 * changes. As long as you configure the service (preferably using an
 * interceptor), you should see a spinner whenever HTTP requests are made (as
 * long as the request takes a sufficient amount of time; if the request is
 * quick you likely will not see the spinner).
 *
 * @overviewDetails
 * #### Configure the Service
 *
 * To configure the service you must have a way to determine when HTTP requests
 * are initiated and when they complete. The best way to handle that is with an
 * interceptor (although you could use a service that acts as a wrapper for
 * `HttpClient` I suppose). Below is an example of how to configure the service
 * to handle requests using an interceptor.
 *
 * ```typescript
 * import {Injectable} from '@angular/core';
 * import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
 * import {LoadingService} from '@ngx-material-dashboard/widgets';
 * import {Observable, throwError} from 'rxjs';
 * import {catchError, map} from 'rxjs/operators';
 *
 * @Injectable()
 * export class LoadingInterceptor implements HttpInterceptor {
 *
 *    constructor(private loadingService: LoadingService) {}
 *
 *    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 *         // mark the requests URL as loading
 *         this.loadingService.setLoading(true, request.url);
 *         return next.handle(request).pipe(catchError((err) => {
 *             // handle when error occurs (still need to mark requests URL to
 *             // not loading; otherwise you end up with never-ending spinner
 *             // when errors occur)
 *             this.loadingService.setLoading(false, request.url);
 *            // throw error so your app can handle accordingly
 *            return throwError(() => err);
 *         })).pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
 *             if (evt instanceof HttpResponse) {
 *                 // handle success response; mark requests URL not loading
 *                 this.loadingService.setLoading(false, request.url);
 *             }
 *             return evt;
 *         }));
 *     }
 * }
 * ```
 *
 * When requests start they are added to the map of requests used by the
 * `LoadingService`, and when they complete they are removed from the map. The
 * loading state is true if there are any URLs in the map, and false if the map
 * is empty. This code was taken directly from below blog.
 * https://medium.com/swlh/angular-loading-spinner-using-http-interceptor-63c1bb76517b
 *
 * #### Loading State
 *
 * If you want to render your own spinner component when data is loading you
 * need to subscribe to the `loadingSub` `Observable`. This will return `true`
 * if there is anything loading, otherwise it will return `false`.
 *
 * @usageNotes
 * #### Basic Usage Example
 * ```html
 * <div *ngIf="loading">
 *     <!-- some sort of spinner or gif -->
 * </div>
 * ```
 * ```typescript
 * import {Component, OnDestroy, OnInit} from '@angular/core';
 * import {LoadingService} from '@ngx-material-dashboard/widgets';
 * import {Subscription} from 'rxjs';
 *
 * @Component({
 *     selector: 'loading-service-usage-example',
 *     templateUrl: './loading-service-usage-example.html'
 * })
 * export class LoadingServiceUsageExample implements OnDestroy, OnInit {
 *     loading: boolean;
 *     sub: Subscription;
 *
 *     constructor(private loadingService: LoadingService) {
 *         this.loading = false;
 *         this.sub = new Subscription();
 *     }
 *
 *     ngOnInit() {
 *         const sub = this.loadingService.loadingSub.subscribe(loadingState => {
 *            this.loading = loadingState;
 *         });
 *         sub.add(sub);
 *     }
 *
 *     ngOnDestroy() {
 *         this.sub.unsubscribe();
 *     }
 * }
 * ```
 *
 */
@Injectable()
export class LoadingService {
    /**
     * Observable for emitting whether there is an active request. When true
     * there is at least one active request, when false there are no active
     * requests. Defaults to false (i.e. no active requests).
     */
    loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Contains in-progress loading requests. */
    loadingMap: Map<string, boolean> = new Map<string, boolean>();

    /**
     * Sets the loadingSub property value based on the following:
     * - If loading is true, add the provided url to the loadingMap with a true
     * value, set loadingSub value to true
     * - If loading is false, remove the loadingMap entry and only when the map
     * is empty will we set loadingSub to false
     *
     * This pattern ensures if there are multiple requests awaiting completion,
     * we don't set loading to false before other requests have completed. At
     * the moment, this function is only called from the @link{HttpRequestInterceptor}.
     *
     * @param loading Boolean value to set loadingSub to.
     * @param url The URL that is loading.
     */
    setLoading(loading: boolean, url: string): void {
        // update map and loadingSub according to given parameters
        if (loading === true) {
            // add URL to map of URLs
            this.loadingMap.set(url, loading);
            // emit true so subscribers can display loading spinners
            this.loadingSub.next(true);
        } else if (loading === false && this.loadingMap.has(url)) {
            // remove URL from map of loading URLs
            this.loadingMap.delete(url);
        }

        if (this.loadingMap.size === 0) {
            // emit false so subscribers can hide loading spinners if there are
            // no URLs in the map of loading URLs
            this.loadingSub.next(false);
        }
    }
}
