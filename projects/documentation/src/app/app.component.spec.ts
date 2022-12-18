import { TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutModule as DashboardLayoutModule } from '@ngx-material-dashboard/widgets';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AnchorModule } from './shared/anchor/anchor.module';
import { LayoutModule } from './widgets/layout/layout.module';
import { TabbedDocumentModule } from './widgets/tabbed-document/tabbed-document.module';

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                FlexLayoutModule,
                MatButtonModule,
                MatDividerModule,
                MatMenuModule,
                MatToolbarModule,
                MatTooltipModule,
                AnchorModule,
                LayoutModule,
                TabbedDocumentModule,
                DashboardLayoutModule,
                AppRoutingModule,
                FontAwesomeModule,
                MarkdownModule.forChild(),
                CoreModule.forRoot()
            ],
            declarations: [AppComponent]
        });
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
