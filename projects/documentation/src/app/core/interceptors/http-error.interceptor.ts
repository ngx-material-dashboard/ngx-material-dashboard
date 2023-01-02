import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@ngx-material-dashboard/widgets';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * An interceptor to handle HTTP errors. Based on code from below URL.
 * https://scotch.io/bar-talk/error-handling-with-angular-6-tips-and-best-practices192
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private alertService: AlertService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    // server-side error
                    // if (error.status === 401) {
                    //     if (error.error.error === 'Expired Token') {
                    //         this.authService.checkAuth();
                    //         this.router.navigate(['/']);
                    //         errorMessage = 'Your session has expired. Please log in again.';
                    //     } else {
                    //         errorMessage = 'You are not authorized to make that request, you may be logged out. Try logging in again. Please contact support if the error persists and you believe you should have access to the requested resource.';
                    //     }
                    // } else {
                    // if (error.error.error) {
                    //     errorMessage = error.error.error;
                    // } else {
                    //     errorMessage = error.error.errors[0].detail;
                    // }

                    // }

                    console.log(error);

                    this.alertService.error(errorMessage);
                }
                return throwError(() => new Error(errorMessage));
            })
        );
    }
}
