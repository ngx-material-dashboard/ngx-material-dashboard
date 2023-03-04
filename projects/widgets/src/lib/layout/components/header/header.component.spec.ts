import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuElement } from '@ngx-material-dashboard/testing';
import { MockComponent } from 'ng-mocks';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { HeaderUserLoginComponent } from '../header-user-login/header-user-login.component';

import { HeaderComponent } from './header.component';

@Component({
    template: `
        <ngx-mat-header
            [logo]="logo"
            (clickSearchFilter)="onSearchFilter($event)"
            (toggleSidenav)="toggleSidenav()"
        >
            <ngx-mat-filter-drop-down>
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
        </ngx-mat-header>
    `
})
class TestHeaderComponent implements OnInit {
    @ViewChild(HeaderComponent) header!: HeaderComponent;
    formGroup!: UntypedFormGroup;
    logo: string = 'My App';

    constructor(private formBuilder: UntypedFormBuilder) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            name: null
        });
    }
}

describe('HeaderComponent', () => {
    let component: TestHeaderComponent;
    let fixture: ComponentFixture<TestHeaderComponent>;
    let filterDropDown: MenuElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent,
                TestHeaderComponent,
                MockComponent(HeaderUserLoginComponent)
            ],
            imports: [
                RouterTestingModule,
                FlexLayoutModule,
                FormsModule,
                MatButtonModule,
                MatDividerModule,
                MatFormFieldModule,
                MatInputModule,
                MatMenuModule,
                MatToolbarModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                FontAwesomeModule,
                ToolbarModule
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        filterDropDown = new MenuElement(fixture);
    });

    it('should render "My App" in the toolbar by default', () => {
        // given: the native element at the root of the component
        const compiled = fixture.nativeElement;

        // expect: the text "My App" should be rendered
        expect(
            compiled.querySelector('.marker-home-button').textContent
        ).toContain('My App');
    });

    it('should emit true when bars button is clicked in top bar', () => {
        // setup: a spy on the toggleSidenav EventEmitter
        spyOn(component.header.toggleSidenav, 'emit');

        // and: the native element at the root of the component
        const compiled = fixture.nativeElement;

        // and: the bars button
        const button = compiled.querySelector('.marker-bars-button');

        // when: the button is clicked
        button.click();
        fixture.detectChanges();

        // expect: the toggleSidenav EventEmitter should have been called with true
        expect(component.header.toggleSidenav.emit).toHaveBeenCalledWith(true);
    });

    it('should emit true when search button clicked in filter', () => {
        filterDropDown.initButtons();
        const spy = spyOn(component.header.searchFilterClick, 'emit');
        filterDropDown.clickButton('.marker-button-search');

        expect(spy).toHaveBeenCalled();
    });
});
