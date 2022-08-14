import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule as DashboardLayoutModule } from '@ngx-material-dashboard/widgets';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ LayoutComponent ],
            imports: [
                NoopAnimationsModule,
                RouterTestingModule,
                MatSidenavModule,
                DashboardLayoutModule
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
