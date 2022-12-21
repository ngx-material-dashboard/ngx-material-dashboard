import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IconButtonsWithPaginatorBarElement } from './icon-buttons-with-paginator-bar.element';

@Component({
    template: ` <div fxLayout="row" class="marker-collection-toolbar">
        <div fxLayoutAlign="center center">
            <mat-checkbox
                class="marker-checkbox-select-all"
                (change)="onCheckboxChange()"
            >
            </mat-checkbox>
        </div>
        <div fxFlex></div>
        <button
            class="mat-button marker-button-click-me"
            (click)="onButtonClick()"
        >
            Click Me
        </button>
        <mat-paginator
            [length]="length"
            [pageSize]="pageSize"
            [pageSizeOptions]="[15, 25, 50, 75, 100]"
            #paginator
        >
        </mat-paginator>
    </div>`
})
class Bar {
    onButtonClick(): void {}

    onCheckboxChange(): void {}
}

@Component({
    template: ` <div fxLayout="row">
        <button
            class="mat-button marker-button-click-me"
            (click)="onButtonClick()"
        >
            Click Me
        </button>
        <mat-paginator
            [length]="length"
            [pageSize]="pageSize"
            [pageSizeOptions]="[15, 25, 50, 75, 100]"
            #paginator
        >
        </mat-paginator>
    </div>`
})
class BarWithoutCheckbox {
    onButtonClick(): void {}

    onCheckboxChange(): void {}
}

describe('IconButtonsWithPaginatorBarElement', () => {
    let fixture: ComponentFixture<Bar>;
    let component: Bar;
    let bar: IconButtonsWithPaginatorBarElement;

    describe('Bar with checkbox', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [Bar],
                imports: [
                    MatCheckboxModule,
                    MatPaginatorModule,
                    NoopAnimationsModule
                ]
            });

            fixture = TestBed.createComponent(Bar);
            component = fixture.componentInstance;
            fixture.detectChanges();

            bar = new IconButtonsWithPaginatorBarElement(fixture, [
                '.marker-button-click-me'
            ]);
        });

        it('should return select all checkbox', () => {
            expect(bar.selectAllCheckbox).toBeDefined();
        });

        it('should return true when select all checkbox is checked', async () => {
            // when: the selectAllCheckbox is clicked
            await bar.selectAllCheckbox?.click();

            // then: the isAllSelected method should return true
            expect(bar.isAllSelected()).toBeTrue();
        });
    });

    describe('Bar without checkbox', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [BarWithoutCheckbox],
                imports: [
                    MatCheckboxModule,
                    MatPaginatorModule,
                    NoopAnimationsModule
                ]
            });

            fixture = TestBed.createComponent(Bar);
            component = fixture.componentInstance;
            fixture.detectChanges();

            bar = new IconButtonsWithPaginatorBarElement(fixture, [
                '.marker-button-click-me'
            ]);
        });

        it('should return undefined for select all checkbox', () => {
            expect(bar.selectAllCheckbox).toBeUndefined();
        });

        it('should throw an error when isAllSelected method called', () => {
            try {
                bar.isAllSelected();
            } catch (error: any) {
                expect(error.message).toEqual('Select all checkbox undefined');
            }
        });
    });
});
