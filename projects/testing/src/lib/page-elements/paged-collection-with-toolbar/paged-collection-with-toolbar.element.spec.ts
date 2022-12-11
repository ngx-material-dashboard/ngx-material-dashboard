import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TEST_DATA } from '../../fixtures/dummy-object.fixture';
import { DummyObject } from '../../mocks/dummy-object.mock';
import { IconButtonsWithPaginatorBarElement } from '../icon-buttons-with-paginator-bar/icon-buttons-with-paginator-bar.element';
import { PagedCollectionElement } from '../paged-collection/paged-collection.element';
import { ToolbarElement } from '../toolbar/toolbar.element';
import { PagedCollectionWithToolbarElement } from './paged-collection-with-toolbar.element';

@Component({
    template: `
    <div class="marker-paged-collection">
        <div>
            <mat-paginator [length]="length"
                [pageSize]="pageSize"
                [pageSizeOptions]="[15, 25, 50, 75, 100]"
                #paginator>
            </mat-paginator>
        </div>
        <div class="marker-list">
            <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px">
                <mat-checkbox class="marker-checkbox-select-all"
                    (change)="masterToggle()">
                </mat-checkbox>
                <div fxFlex></div>
            </div>
            <div fxLayout="column" fxLayoutGap="5px">
                <div *ngFor="let model of models">
                    <div class="marker-list-item" fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px">
                        <mat-checkbox class="marker-checkbox-item-select"
                            (click)="$event.stopPropagation()"
                            (change)="onRowSelected(model);">
                        </mat-checkbox>
                        <div fxFlex>
                            <ng-container 
                                *ngTemplateOutlet="template; context: { model: model }">
                            </ng-container>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}) class TestPagedCollectionWithIconToolbarComponent {
    models: DummyObject[] = TEST_DATA;

    onButtonClick() {}
}

@Component({
    template: `
    <div class="marker-paged-collection">
        <div class="marker-toolbar"></div>
        <div class="marker-list">
            <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px">
                <mat-checkbox class="marker-checkbox-select-all"
                    (change)="masterToggle()">
                </mat-checkbox>
                <div fxFlex></div>
            </div>
            <div fxLayout="column" fxLayoutGap="5px">
                <div *ngFor="let model of models">
                    <div class="marker-list-item" fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px">
                        <mat-checkbox class="marker-checkbox-item-select"
                            (click)="$event.stopPropagation()"
                            (change)="onRowSelected(model);">
                        </mat-checkbox>
                        <div fxFlex>
                            <ng-container 
                                *ngTemplateOutlet="template; context: { model: model }">
                            </ng-container>
                        </div>
                    </div>
                </div>
            </div>
            <mat-paginator [length]="length"
                [pageSize]="pageSize"
                [pageSizeOptions]="[15, 25, 50, 75, 100]"
                #paginator>
            </mat-paginator>
        </div>
    </div>
    `
}) class TestPagedCollectionWithRaisedButtonsBarComponent {
    models: DummyObject[] = TEST_DATA;
}

describe('PagedCollectionWithToolbarElement', () => {

    let element: PagedCollectionWithToolbarElement;

    describe('Icon Toolbar with Paginator', () => {

        let fixture: ComponentFixture<TestPagedCollectionWithIconToolbarComponent>;
        let component: TestPagedCollectionWithIconToolbarComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    TestPagedCollectionWithIconToolbarComponent
                ],
                imports: [
                    CommonModule,
                    MatCheckboxModule,
                    MatPaginatorModule,
                    NoopAnimationsModule
                ]
            });
    
            fixture = TestBed.createComponent(TestPagedCollectionWithIconToolbarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            element = new PagedCollectionWithToolbarElement(
                fixture,
                '.marker-paged-collection',
                '.marker-list-item',
                '.marker-checkbox-item-select',
                [],
                true,
                'icon-buttons-toolbar'
            )
        });
        
        it('should create an IconButtonsWithPaginatorButtonsBar by default', () => {
            expect(element.toolbar).toBeInstanceOf(IconButtonsWithPaginatorBarElement);
        });
    });

    describe('Rasied Button Toolbar', () => {

        let fixture: ComponentFixture<TestPagedCollectionWithRaisedButtonsBarComponent>;
        let component: TestPagedCollectionWithRaisedButtonsBarComponent;

        describe('Default constructor properties', () => {

            beforeEach(() => {
                TestBed.configureTestingModule({
                    declarations: [
                        TestPagedCollectionWithRaisedButtonsBarComponent
                    ],
                    imports: [
                        CommonModule,
                        MatCheckboxModule,
                        MatPaginatorModule,
                        NoopAnimationsModule
                    ]
                });
        
                fixture = TestBed.createComponent(TestPagedCollectionWithRaisedButtonsBarComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();

                element = new PagedCollectionWithToolbarElement(
                    fixture,
                    '.marker-paged-collection',
                    '.marker-list-item',
                    '.marker-checkbox-item-select',
                    []
                )
            });

            it('should initialize collection as selectable by default', () => {
                expect(element.collection.itemCheckboxes.length).toBeGreaterThan(0);
            });

            it('should create a ToolbarElement for toolbar by default', () => {
                expect(element.toolbar).toBeInstanceOf(ToolbarElement);
            });
        });

        describe('Non-Selectable Collection', () => {
            beforeEach(() => {
                TestBed.configureTestingModule({
                    declarations: [
                        TestPagedCollectionWithRaisedButtonsBarComponent
                    ],
                    imports: [
                        CommonModule,
                        MatCheckboxModule,
                        MatPaginatorModule,
                        NoopAnimationsModule
                    ]
                });

                fixture = TestBed.createComponent(TestPagedCollectionWithRaisedButtonsBarComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();

                element = new PagedCollectionWithToolbarElement(
                    fixture,
                    '.marker-paged-collection',
                    '.marker-list-item',
                    '.marker-checkbox-item-select',
                    [],
                    false
                )
            });

            it('should create collection that is not selectable by default', () => {
                expect(element.collection.itemCheckboxes.length).toBe(0);
            });
        });
    });
});
