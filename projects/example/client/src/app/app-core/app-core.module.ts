import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    AlertModule,
    LayoutModule,
    ToolbarModule
} from '@ngx-material-dashboard/widgets';

import { JsonApiService } from '../shared/services/json-api.service';
import { interceptorProviders } from './interceptors/interceptor.provider';

@NgModule({
    imports: [
        // 3rd party imports
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        FontAwesomeModule,
        AlertModule,
        LayoutModule,
        ToolbarModule
    ],
    exports: [
        // 3rd party exports
        CommonModule,
        FontAwesomeModule,
        AlertModule,
        LayoutModule,
        ToolbarModule
    ]
})
export class AppCoreModule {
    constructor(@Optional() @SkipSelf() parentModule: AppCoreModule) {
        if (parentModule) {
            throw new Error(
                'AppCoreModule is already loaded. Import only in AppModule'
            );
        }
    }

    static forRoot(): ModuleWithProviders<AppCoreModule> {
        return {
            ngModule: AppCoreModule,
            providers: [interceptorProviders, JsonApiService]
        };
    }
}
