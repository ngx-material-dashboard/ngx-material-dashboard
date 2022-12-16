import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { getTaskData } from '../../fixtures/task.fixture';
import { Task } from '../../models/task.model';
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
                        <span>{{model.name}}</span>
                        <span>{{model.description}}</span>
                        <div class="marker-list-item-buttons" fxLayout="row" fxLayoutGap="5px">
                        <button class="marker-button-edit"
                            (click)="onClick()">
                            <span>Edit</span>
                            <div class="mat-button-focus-overlay"></div>
                            <div class="mat-button-ripple mat-ripple"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}) class TestSelectableCollectionComponent {
    models: Task[] = getTaskData(20);

    onClick(): void {}
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
    models: Task[] = getTaskData(20);
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

        it('should click button in given row', () => {
            // given: a spy on the components onClick method
            const spy = spyOn(component, 'onClick');

            // when: a button in row is clicked
            element.clickItemButton('edit', 0);

            // then: the spy should have been called
            expect(spy).toHaveBeenCalled();
        });

        it('should click button in given row if itemSelector defined without "."', () => {
            // given: an itemSelector with a "." to designate CSS class
            element.itemSelector = 'marker-list-item';

            // and:a spy on the components onClick method
            const spy = spyOn(component, 'onClick');

            // when: a button in row is clicked
            element.clickItemButton('edit', 0);

            // then: the spy should have been called
            expect(spy).toHaveBeenCalled();
        });

        it('should throw an error if buttons are not found', () => {
            // given: non existant item selector
            element.itemSelector = 'nonExistantItem';

            try {
                element.clickItemButton('edit', 0);
            } catch(error: any) {
                expect(error.message).toEqual('Expected HTMLButtonElement with CSS selector ".marker-button-edit" in collection item buttons')
            }
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