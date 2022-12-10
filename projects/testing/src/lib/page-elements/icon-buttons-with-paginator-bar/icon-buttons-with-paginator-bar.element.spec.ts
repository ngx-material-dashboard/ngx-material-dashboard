import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IconButtonsWithPaginatorBarElement } from './icon-buttons-with-paginator-bar.element';

@Component({
    template: `
    <div fxLayout="row">
        <div fxLayoutAlign="center center">
            <mat-checkbox
                class="marker-checkbox-select-all"
                (change)="onCheckboxChange()">
            </mat-checkbox>
        </div>
        <div fxFlex></div>
        <button class="mat-button marker-button-click-me"
            (click)="onButtonClick()">
            Click Me
        </button>
        <mat-paginator [length]="length"
            [pageSize]="pageSize"
            [pageSizeOptions]="[15, 25, 50, 75, 100]"
            #paginator>
        </mat-paginator>
    </div>`
}) class Bar {
    onButtonClick(): void {}

    onCheckboxChange(): void {}
}

describe('IconButtonsWithPaginatorBarElement', () => {

    let fixture: ComponentFixture<Bar>;
    let component: Bar;
    let bar: IconButtonsWithPaginatorBarElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                Bar
            ],
            imports: [
                MatCheckboxModule,
                MatPaginatorModule,
                NoopAnimationsModule
            ]
        });

        fixture = TestBed.createComponent(Bar);
        component = fixture.componentInstance;
        fixture.detectChanges();

        bar = new IconButtonsWithPaginatorBarElement(fixture, ['.marker-button-click-me']);
    });

    it('should return select all checkbox', () => {
        expect(bar.selectAllCheckbox).toBeDefined();
    });
});
