import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule } from 'ng-mocks';
import { PaginatorElement } from './paginator.element';

@Component({
    template: `
        <div>
            <mat-paginator
                [length]="length"
                [pageSize]="pageSize"
                [pageSizeOptions]="[15, 25, 50, 75, 100]"
                (page)="page()"
            >
            </mat-paginator>
        </div>
    `
})
class PaginatorComponent {
    length = 200;
    pageSize = 25;

    page(): void {}
}

/**
 * This represents a component with "undefined" paginator. The mat-paginator
 * tag is still present so the PaginatorElement can be created, but the
 * PaginatorModule is mocked in "undefined" tests below to prevent full
 * component from being rendered.
 */
@Component({
    template: `
        <div>
            <mat-paginator></mat-paginator>
        </div>
    `
})
class PaginatorUndefinedComponent {}

describe('PaginatorElement', () => {
    let pageClickSpy: jasmine.Spy;
    let paginatorElement: PaginatorElement;

    describe('PaginatorElement defined', () => {
        beforeEach(() => {
            paginatorElement = init(PaginatorComponent);
            pageClickSpy = spyOn(
                paginatorElement.fixture.componentInstance,
                'page'
            );
        });

        it('should return "1 – 25 of 200" for paginator range when length=200 and pageSize=25', () => {
            expect(paginatorElement.pagingatorRange.innerText).toEqual(
                '1 – 25 of 200'
            );
        });

        it('should emit page event when next button clicked', () => {
            // when: next button clicked
            paginatorElement.clickNextButton();

            // expect: the pageClickSpy should have been called
            expect(pageClickSpy).toHaveBeenCalled();
        });

        it('should not emit page event when previous button clicked by default', () => {
            // when: previous button clicked
            paginatorElement.clickPreviousButton();

            // expect: pageClickSpy to not have been called (since it should be disabled when on 1st page)
            expect(pageClickSpy).not.toHaveBeenCalled();
        });

        it('should emit page event when previous button clicked', () => {
            // when: next button clicked (needs to be clicked to enable previous button)
            paginatorElement.clickNextButton();

            // and: previous button clicked
            paginatorElement.clickPreviousButton();

            // expect: the pageClickSpy should have been called twice
            expect(pageClickSpy).toHaveBeenCalledTimes(2);
        });
    });

    describe('PaginatorElement undefined', () => {
        beforeEach(() => {
            paginatorElement = init(PaginatorUndefinedComponent, 'div', [
                MockModule(MatPaginatorModule)
            ]);
        });

        it('should throw an error when calling paginatorRange property', () => {
            expect(() => {
                paginatorElement.pagingatorRange;
            }).toThrowError('Paginator range label not found');
        });

        it('should throw an error when calling clickNextButton', async () => {
            try {
                await paginatorElement.clickNextButton();
            } catch (error: any) {
                expect(error.message).toEqual(
                    'Error mat-paginator-navigation-next not found when trying to click next button'
                );
            }
        });

        it('should throw an error when calling clickPreviousButton', async () => {
            try {
                await paginatorElement.clickPreviousButton();
            } catch (error: any) {
                expect(error.message).toEqual(
                    'Error mat-paginator-navigation-previous not found when trying to click previous button'
                );
            }
        });
    });
});

function init(
    component: any,
    querySelector = 'div',
    imports: any[] = [MatButtonModule, MatPaginatorModule, NoopAnimationsModule]
) {
    TestBed.configureTestingModule({
        declarations: [component],
        imports: imports
    });

    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector(querySelector);
    return new PaginatorElement(fixture, element);
}
