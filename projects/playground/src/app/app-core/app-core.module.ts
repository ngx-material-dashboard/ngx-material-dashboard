import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { LayoutModule } from '@ngx-material-dashboard/widgets';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        FontAwesomeModule,
        ToastrModule.forRoot(),
        LayoutModule
    ],
    exports: [
        // 3rd party exports
        CommonModule,
        FontAwesomeModule,
        LayoutModule
    ]
})
export class AppCoreModule {

    constructor(@Optional() @SkipSelf() parentModule: AppCoreModule) {
        if (parentModule) {
            throw new Error('AppCoreModule is already loaded. Import only in AppModule');
        }
    }

    static forRoot(): ModuleWithProviders<AppCoreModule> {
        return {
            ngModule: AppCoreModule,
            providers: []
        };
    }
}
