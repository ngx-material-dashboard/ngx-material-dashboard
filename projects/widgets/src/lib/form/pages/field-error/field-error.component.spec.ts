import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ValidationMessage } from '../../interfaces/validation-message.interface';
import { Page } from '../../../../../test/helpers/page.helper';
import { FieldErrorComponent } from './field-error.component';

describe('FieldErrorComponent', () => {
    let page: FieldErrorPage;

    describe('Field With Errors', () => {
        beforeEach(() => {
            page = init();
        });

        it('should display error message by default', () => {
            expect(page.errorMessage).toBeDefined();
        });
    });

    describe('Field Without Errors', () => {
        beforeEach(() => {
            // initialize the component and set a value on a field on the form
            // so it is valid
            page = init();
            page.field = 'value';
        });

        it('should not display any error messages', () => {
            expect(page.errorMessage).toBeNull();
        });
    });

    describe('Field Undefined', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [ FieldErrorComponent ],
                imports: [ FormsModule, ReactiveFormsModule, MatFormFieldModule ]
            });
        
            // define a form and field with Validators to use for the component
            const formBuilder = new FormBuilder();
            const form = formBuilder.group({});
            const validationMessages: ValidationMessage[] = [
                { type: 'required', message: 'Field is required' }
            ];
        
            // create the FieldErrorComponent and set input properties on the component
            const fixture = TestBed.createComponent(FieldErrorComponent);
            const component = fixture.componentInstance;
            component.field = 'field';
            component.form = form;
            component.validationMessages = validationMessages;
            fixture.detectChanges();
        
            // return an instance of the FieldErrorPage class to help with tests
            page = new FieldErrorPage(fixture, component, 'field');
        });

        it('should not display any error messages', () => {
            expect(page.errorMessage).toBeNull();
        });
    });
});

/**
 * Initializes the test bed and creates and returns a FieldErrorPage.
 *
 * @returns An instance of a FieldErrorPage object.
 */
function init(): FieldErrorPage {
    TestBed.configureTestingModule({
        declarations: [ FieldErrorComponent ],
        imports: [ FormsModule, ReactiveFormsModule, MatFormFieldModule ]
    });

    // define a form and field with Validators to use for the component
    const formBuilder = new FormBuilder();
    const form = formBuilder.group({
        field: [null, Validators.required]
    });
    const validationMessages: ValidationMessage[] = [
        { type: 'required', message: 'Field is required' }
    ];

    // create the FieldErrorComponent and set input properties on the component
    const fixture = TestBed.createComponent(FieldErrorComponent);
    const component = fixture.componentInstance;
    component.field = 'field';
    component.form = form;
    component.validationMessages = validationMessages;
    fixture.detectChanges();

    // return an instance of the FieldErrorPage class to help with tests
    return new FieldErrorPage(fixture, component, 'field');
}

/**
 * A class that provides helper methods for the elements in the
 * FieldErrorComponent for use in the above spec.
 */
class FieldErrorPage extends Page<FieldErrorComponent> {

    /** The component this page represents. */
    private component: FieldErrorComponent;
    /** The name of the field on the form for the component. */
    private fieldName: string;

    constructor(fixture: ComponentFixture<FieldErrorComponent>, component: FieldErrorComponent, field: string) {
        super(fixture);
        this.component = component;
        this.fieldName = field;
    }

    /**
     * Returns the first HTMLElement that has the 'error-message' CSS class.
     */
    get errorMessage(): HTMLElement {
        return this.query('.error-message');
    }

    /**
     * Sets the value for the field on the form for the component.
     */
    set field(val: string) {
        this.component.form.get(this.fieldName)?.setValue(val);
        this.fixture.detectChanges();
    }
}
