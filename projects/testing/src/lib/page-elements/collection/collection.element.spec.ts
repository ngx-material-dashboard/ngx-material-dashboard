import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TEST_DATA } from '../../fixtures/dummy-object.fixture';
import { DummyObject } from '../../mocks/dummy-object.mock';
import { CollectionElement } from './collection.element';

@Component({
    template: `
    <div class="marker-collection">
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
    `
}) class TestSelectableCollectionComponent {
    models: DummyObject[] = TEST_DATA;
}

@Component({
    template: `
    <div class="marker-collection">
        <div fxLayout="column" fxLayoutGap="5px">
            <div *ngFor="let model of models">
                <div class="marker-list-item" fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px">
                    <ng-container 
                        *ngTemplateOutlet="template; context: { model: model }">
                    </ng-container>
                </div>
            </div>
        </div>
    </div>
    `
}) class TestNotSelectableCollectionComponent {
    models: DummyObject[] = TEST_DATA;
}

describe('CollectionElement', () => {

    let element: CollectionElement;

    describe('Default constructor parameters', () => {

        let fixture: ComponentFixture<TestSelectableCollectionComponent>;
        let component: TestSelectableCollectionComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    TestSelectableCollectionComponent
                ],
                imports: [
                    MatCheckboxModule
                ]
            });

            fixture = TestBed.createComponent(TestSelectableCollectionComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            element = new CollectionElement(
                fixture,
                '.marker-collection',
                '.marker-list-item'
            );
        });

        it('should create a selectable collection by default', () => {
            expect(element.itemCheckboxes.length).toBeGreaterThan(0);
        });
    });

    describe('Not Selectable Collection', () => {

        let fixture: ComponentFixture<TestNotSelectableCollectionComponent>;
        let component: TestNotSelectableCollectionComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    TestNotSelectableCollectionComponent
                ]
            });

            fixture = TestBed.createComponent(TestNotSelectableCollectionComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            element = new CollectionElement(
                fixture,
                '.marker-collection',
                '.marker-list-item',
                undefined,
                false
            );
        });

        it('should throw error when isAllSelected method called', () => {
            try {
                element.isAllSelected();
            } catch(error: any) {
                expect(error.message).toEqual('Collection is not selectable');
            }
        });

        it('should throw error when isItemSelected method called', () => {
            try {
                element.isItemSelected(0);
            } catch(error: any) {
                expect(error.message).toEqual('Collection is not selectable');
            }
        });

        it('should throw error when selectAll method called', async() => {
            try {
                await element.selectAll();
            } catch(error: any) {
                expect(error.message).toEqual('Collection is not selectable');
            }
        });

        it('should throw error when selectItem method called', async() => {
            try {
                await element.selectItem(0);
            } catch(error: any) {
                expect(error.message).toEqual('Collection is not selectable');
            }
        });
    });
});