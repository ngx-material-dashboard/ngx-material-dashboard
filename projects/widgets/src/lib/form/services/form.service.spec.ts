import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormService } from './form.service';

describe('FormService', () => {
    let service: FormService;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule
            ],
            providers: [
                { provide: FormBuilder, useValue: formBuilder }
            ]
        });
        service = TestBed.inject(FormService);
    });

    describe('Simple form', () => {
        let form: FormGroup;

        beforeEach(() => {
            form = formBuilder.group({
                control1: [null],
                control2: [null]
            });
        });

        it('should mark all basic controls as touched when markAsTouched is called', () => {
            // when: the form is marked as touched
            service.markAsTouched(form);

            // then: all controls should be marked as touched
            expect(form.get('control1')?.touched).toEqual(true);
            expect(form.get('control2')?.touched).toEqual(true);
        });
    });

    describe('Advanced form', () => {
        let form: FormGroup;

        beforeEach(() => {
            form = formBuilder.group({
                form1: formBuilder.group({
                    control1: [null]
                })
            });
        });

        it('should mark all groups and respective controls touched when markAsTouched is called', () => {
            // when: markAsTouched is called
            service.markAsTouched(form);

            // then: the inner form and it's respective controls should be touched
            expect(form.get('form1')?.touched).toEqual(true);
            expect(form.get('form1')?.get('control1')?.touched).toEqual(true);
        });
    });
});
