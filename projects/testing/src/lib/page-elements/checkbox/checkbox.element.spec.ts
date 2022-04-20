import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CheckboxElement } from "./checkbox.element";

@Component({
    template: `
        <div>
            <mat-checkbox class="marker-checkbox"
                (change)="onChange();">
            </mat-checkbox>
        </div>
    `
}) class CheckboxComponent {
    onChange(): void {}
}

describe('CheckboxElement', () => {

    let checkboxClickSpy: jasmine.Spy;
    let checkboxElement: CheckboxElement;

    beforeEach(() => {
        checkboxElement = init(CheckboxComponent);
        checkboxClickSpy = spyOn(checkboxElement.fixture.componentInstance, 'onChange');
    });

    it('should click the Checkbox when click method called', async() => {
        // when: the CheckboxElement click Checkbox is called
        await checkboxElement.click();

        // then: the CheckboxClickSpy should have been called
        expect(checkboxClickSpy).toHaveBeenCalled();

        // and: the checkbox should be checked
        expect(checkboxElement.checked).toBeTrue();
    });

    it('should not have checked input when click method called on checked checkbox', async() => {
        // when: the checkboxElement is clicked 2 times
        await checkboxElement.click(); // checks the checkbox 
        await checkboxElement.click(); // removes check

        // then: the checkbox should not be checked
        expect(checkboxElement.checked).toBeFalse();
    });
});

function init(component: any, querySelector = 'div') {
    TestBed.configureTestingModule({
        declarations: [component],
        imports: [
            MatCheckboxModule
        ]
    });

    const fixture = TestBed.createComponent(component);
    const element = fixture.nativeElement.querySelector(querySelector);
    return new CheckboxElement(fixture, element);  
}
