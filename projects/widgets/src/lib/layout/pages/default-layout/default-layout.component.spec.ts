import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DefaultLayoutPage } from '@ngx-material-dashboard/testing';
import { MockComponents, MockModule } from 'ng-mocks';

import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { HeaderUserLoginComponent } from '../../components/header-user-login/header-user-login.component';
import { HeaderUserMenuComponent } from '../../components/header-user-menu/header-user-menu.component';
import { DefaultLayoutComponent } from './default-layout.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Component, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { FilterDropDownComponent } from '../../../toolbar/components/filter-drop-down/filter-drop-down.component';

@Component({
    template: `
        <ngx-mat-default-layout>
            <ngx-mat-filter-drop-down filter>
                <form [formGroup]="formGroup">
                    <mat-form-field>
                        <mat-label>Task Name</mat-label>
                        <input
                            matInput
                            formControlName="name"
                            placeholder="Search task by name..."
                            class="marker-input-name"
                        />
                    </mat-form-field>
                </form>
            </ngx-mat-filter-drop-down>
        </ngx-mat-default-layout>
    `
})
class LayoutWithFilterTest {
    @ViewChild(DefaultLayoutComponent) layout!: DefaultLayoutComponent;
    @ViewChild(FilterDropDownComponent) filter!: FilterDropDownComponent;
    formGroup!: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            name: null
        });
    }
}

describe('DefaultLayoutComponent', () => {
    let page: DefaultLayoutPage;

    describe('Default settings', () => {
        let component: DefaultLayoutComponent;
        let fixture: ComponentFixture<DefaultLayoutComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    DefaultLayoutComponent,
                    HeaderComponent,
                    MockComponents(
                        FooterComponent,
                        HeaderUserLoginComponent,
                        HeaderUserMenuComponent,
                        LoadingComponent,
                        SidenavComponent
                    )
                ],
                imports: [
                    RouterTestingModule,
                    MockModule(MatSidenavModule),
                    MockModule(MatToolbarModule),
                    MockModule(FontAwesomeModule)
                ]
            });
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(DefaultLayoutComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            page = new DefaultLayoutPage(fixture);
        });

        it('should render ngx-material-dashboard-header', () => {
            expect(page.query('ngx-mat-header')).toBeDefined();
        });

        it('should render "My App" logo by default', () => {
            expect(page.header.logo).toEqual('My App');
        });

        it('should render ngx-material-dashboard-footer', () => {
            expect(page.query('ngx-mat-footer')).toBeDefined();
        });

        it('should render ngx-material-dashboard-sidenav', () => {
            expect(page.query('ngx-mat-sidenav')).toBeDefined();
        });

        it('should not render any sidenav items by default', () => {
            expect(page.sidenav.listItemsLength).toEqual(0);
        });

        it('should toggle the sidenav when the bars button is clicked', async () => {
            // given: a spy on the sidenav toggle method
            const spy = spyOn(component.sidenav, 'toggle');

            // and: current opened state
            const opened = component.opened;

            // when: the bars button is clicked in the header
            await page.header.clickButton('.marker-bars-button');

            // then: the sidenav toggle function should have been called
            expect(spy).toHaveBeenCalled();

            // and: the opened getter should return true
            expect(component.opened).toBe(!opened);
        });
    });

    describe('With Filter', () => {
        let component: LayoutWithFilterTest;
        let fixture: ComponentFixture<LayoutWithFilterTest>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    DefaultLayoutComponent,
                    HeaderComponent,
                    LayoutWithFilterTest,
                    MockComponents(
                        FooterComponent,
                        HeaderUserLoginComponent,
                        HeaderUserMenuComponent,
                        LoadingComponent,
                        SidenavComponent
                    )
                ],
                imports: [
                    RouterTestingModule,
                    FormsModule,
                    MatButtonModule,
                    MatDividerModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatMenuModule,
                    MatSidenavModule,
                    MatToolbarModule,
                    NoopAnimationsModule,
                    ReactiveFormsModule,
                    FontAwesomeModule,
                    ToolbarModule
                ]
            });
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(LayoutWithFilterTest);
            component = fixture.componentInstance;
            fixture.detectChanges();

            // filter undefined in header for some reason, so define it with
            // filter in test component and re-run aftercontentinit to ensure
            // search click subscription setup
            component.layout.header.filter = component.filter;
            component.layout.header.ngAfterContentInit();
            fixture.detectChanges();

            page = new DefaultLayoutPage(
                fixture,
                [],
                [],
                ['.marker-button-search']
            );
        });

        it('should emit true when search button clicked in filter', () => {
            page.header.filterDropDown?.initButtons();
            const spy = spyOn(component.layout.clickSearch, 'emit');

            page.header.filterDropDown?.clickButton('.marker-button-search');

            expect(spy).toHaveBeenCalled();
        });
    });
});
