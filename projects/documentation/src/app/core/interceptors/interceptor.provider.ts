import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { LoadingInterceptor } from './loading.interceptor';

/** Http interceptor providers in outside-in order */
export const interceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true
    },
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: HttpTokenInterceptor,
    //     multi: true
    // },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true
    }
];
