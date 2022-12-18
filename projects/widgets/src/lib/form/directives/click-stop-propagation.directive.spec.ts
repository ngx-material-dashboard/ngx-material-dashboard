import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    FormGroup,
    FormBuilder,
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuElement } from '@ngx-material-dashboard/testing';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';

@Component({
    template: `
        <div [matMenuTriggerFor]="filterMenu">
            <span class="marker-menu-trigger">Drop Down</span>
        </div>
        <mat-menu #filterMenu="matMenu">
            <form
                ngxMaterialDashboardClickStopPropagation
                [formGroup]="formGroup"
                #form
            >
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
        </mat-menu>
    `
})
class ClickStopPropagationDirectiveTest implements OnInit {
    @ViewChild('form') form: any;
    formGroup!: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            name: null
        });
    }
}

describe('ClickStopPropagationDirective', () => {
    let component: ClickStopPropagationDirectiveTest;
    let fixture: ComponentFixture<ClickStopPropagationDirectiveTest>;
    let menu: MenuElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ClickStopPropagationDirective,
                ClickStopPropagationDirectiveTest
            ],
            imports: [
                MatMenuModule,
                FormsModule,
                MatInputModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                FontAwesomeModule
            ]
        });

        fixture = TestBed.createComponent(ClickStopPropagationDirectiveTest);
        component = fixture.componentInstance;
        fixture.detectChanges();

        menu = new MenuElement(fixture);
    });

    it('should stop propagation of click event when clicking in form', () => {
        // given: an open drop down menu
        menu.open();

        // when: the user clicks in the form
        component.form.nativeElement.click();
        fixture.detectChanges();

        // then: the drop down menu should still be open; TODO probably a better
        // way to do this
        expect(
            menu.containerElement.children[0].classList.contains(
                'cdk-overlay-backdrop-showing'
            )
        ).toBeDefined();
    });
});
