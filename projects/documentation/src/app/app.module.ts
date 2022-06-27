import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule as DashboardLayoutModule } from '@ngx-material-dashboard/widgets';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AnchorModule } from './shared/anchor/anchor.module';
import { LayoutModule } from './widgets/layout/layout.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatToolbarModule,
        AnchorModule,
        LayoutModule,
        DashboardLayoutModule,
        AppRoutingModule,
        MarkdownModule.forChild(),
        CoreModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
