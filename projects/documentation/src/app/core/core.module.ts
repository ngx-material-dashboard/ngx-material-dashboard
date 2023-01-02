import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { interceptorProviders } from './interceptors/interceptor.provider';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        FontAwesomeModule,
        MarkdownModule.forRoot({
            loader: HttpClient,
            markedOptions: {
                provide: MarkedOptions,
                useValue: {
                    gfm: true,
                    breaks: false,
                    pedantic: false,
                    smartLists: true,
                    smartypants: false
                }
            }
        })
    ],
    exports: [
        // 3rd party exports
        CommonModule
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import only in AppModule'
            );
        }
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [interceptorProviders]
        };
    }
}
