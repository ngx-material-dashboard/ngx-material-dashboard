import { Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SelectElement } from './select.element';

@Component({
    template: `
        <mat-form-field>
            <mat-label>DC Character</mat-label>
            <mat-select>
                <mat-option *ngFor="let char of dcChars" [value]="char.value">
                    {{ char.viewValue }}
                </mat-option>
            </mat-select>
        </mat-form-field>
    `
})
class SelectComponent {
    dcChars: { value: string; viewValue: string }[] = [
        {
            value: '1',
            viewValue: 'Batman'
        },
        {
            value: '2',
            viewValue: 'Superman'
        },
        {
            value: '3',
            viewValue: 'Wonder Woman'
        }
    ];
}

describe('SelectElement', () => {
    let selectElement: SelectElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SelectComponent],
            imports: [MatFormFieldModule, MatSelectModule, NoopAnimationsModule]
        });

        const fixture = TestBed.createComponent(SelectComponent);
        const parent = fixture.nativeElement.querySelector('mat-form-field');
        selectElement = new SelectElement(fixture, parent);
    });

    beforeEach(fakeAsync(() => {
        selectElement.initOptions();
    }));

    it('should select option by index', fakeAsync(() => {
        // when: an option is selected
        selectElement.select(0);

        // then: the select value should match expected value
        expect(selectElement.value).toEqual('Batman');
    }));

    it('should select option by HTMLElement', fakeAsync(() => {
        // given: HTMLElement for option
        const option = selectElement.options[0];

        // when: selectOption called with given option
        selectElement.selectOption(option);

        // then: the select value should match expected value
        expect(selectElement.value).toEqual('Batman');
    }));

    it('should select option by text', fakeAsync(() => {
        // when: selectOptionByKey called
        selectElement.selectOptionByKey('Batman');

        // then: the select value should match expected value
        expect(selectElement.value).toEqual('Batman');
    }));
});
