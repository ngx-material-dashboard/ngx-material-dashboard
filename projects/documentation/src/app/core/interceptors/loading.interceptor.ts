/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { LoadingService } from '@ngx-material-dashboard/widgets';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Interceptor for updating state of HTTP requests in LoadingService to manage
 * when to show or hide loading spinner. The typical flow of a request is to
 * show the loading spinner at the start of the request and then hide the
 * spinner when the request completes (whether it completes successfully or
 * not). Since multiple requests can be made at any given time the typical flow
 * is slightly more complicated. See {@link LoadingService} for more details on
 * how this is handled.
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loadingService: LoadingService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // mark the requests URL as loading
        this.loadingService.setLoading(true, request.url);
        return next
            .handle(request)
            .pipe(
                catchError((err) => {
                    //
                    this.loadingService.setLoading(false, request.url);
                    // throw error so HttpErrorInterceptor can handle accordingly
                    return throwError(() => err);
                })
            )
            .pipe(
                map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
                    if (evt instanceof HttpResponse) {
                        this.loadingService.setLoading(false, request.url);
                    }
                    return evt;
                })
            );
    }
}
