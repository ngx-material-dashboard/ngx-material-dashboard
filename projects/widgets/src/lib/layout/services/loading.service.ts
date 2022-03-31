import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * The LoadingService handles tracking active requests so any subscribers can
 * manage when things like a loading spinner should be displayed. The service
 * uses a map to track requests to different URLs to ensure loading is not set
 * to false before all requests have completed. When requests start they are
 * added to the map of requests (by the {@link LoadingInterceptor}), and when
 * they complete they are removed from the map. The loading state is true if
 * there are any URLs in the map, and false if the map is empty. This code was
 * taken directly from below blog.
 * https://medium.com/swlh/angular-loading-spinner-using-http-interceptor-63c1bb76517b
 */
@Injectable({
    providedIn: 'root'
})
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
