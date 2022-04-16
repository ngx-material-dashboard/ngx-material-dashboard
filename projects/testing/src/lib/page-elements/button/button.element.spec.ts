import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ButtonElement } from "./button.element";

@Component({
    template: `
        <div>
            <button class="marker-button" (click)="onClick()"></button>
        </div>
    `
}) class ButtonComponent {
    onClick(): void {}
}

@Component({
    template: `
        <div>
            <button disabled class="marker-button" (click)="onClick()"></button>
        </div>
    `
}) class DisabledButtonComponent {
    onClick(): void {}
}

describe('ButtonElement', () => {

    let buttonClickSpy: jasmine.Spy;
    let buttonElement: ButtonElement;

    describe('Enabled Button', () => {

        describe('ButtonElement defined with HTMLElement', () => {

            beforeEach(() => {
                buttonElement = init(ButtonComponent, 'div');
                buttonClickSpy = spyOn(buttonElement.fixture.componentInstance, 'onClick');
            });

            it('should return false for isDisabled', () => {
                expect(buttonElement.isDisabled()).toBeFalse();
            });

            it('should click the button when click method called', async() => {
                // when: the buttonElement click button is called
                await buttonElement.click();
    
                // then: the buttonClickSpy should have been called
                expect(buttonClickSpy).toHaveBeenCalled();
            });
        });

        describe('ButtonElement defined without HTMLElement', () => {

            beforeEach(() => {
                buttonElement = init(ButtonComponent);
                buttonClickSpy = spyOn(buttonElement.fixture.componentInstance, 'onClick');
            });
    
            it('should return false for isDisabled', () => {
                expect(buttonElement.isDisabled()).toBeFalse();
            });
    
            it('should click the button when click method called', async() => {
                // when: the buttonElement click button is called
                await buttonElement.click();
    
                // then: the buttonClickSpy should have been called
                expect(buttonClickSpy).toHaveBeenCalled();
            });
        });
    });

    describe('Disabled Button', () => {

        beforeEach(() => {
            buttonElement = init(DisabledButtonComponent);
            buttonClickSpy = spyOn(buttonElement.fixture.componentInstance, 'onClick');
        });

        it('should return true for isDisabled', () => {
            expect(buttonElement.isDisabled()).toBeTrue();
        });

        it('should not click the button when click method called', async() => {
            // when: the buttonElement click button is called
            await buttonElement.click();

            // then: the buttonClickSpy should have been called
            expect(buttonClickSpy).toHaveBeenCalledTimes(0);
        });
    });
});

function init(component: any, querySelector?: string) {
    TestBed.configureTestingModule({
        declarations: [component]
    });

    const fixture = TestBed.createComponent(component);
    if (querySelector) {
        const element = fixture.nativeElement.querySelector(querySelector);
        return new ButtonElement(fixture, '.marker-button', element);
    } else {
        return new ButtonElement(fixture, '.marker-button');
    }
}
