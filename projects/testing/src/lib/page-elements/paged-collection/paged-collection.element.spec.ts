import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getTaskData } from '../../fixtures/task.fixture';
import { Task } from '../../models/task.model';
import { PagedCollectionElement } from './paged-collection.element';

@Component({
    template: `
        <div class="marker-paged-collection">
            <div class="marker-list">
                <div
                    fxLayout="row"
                    fxLayoutAlign="center center"
                    fxLayoutGap="10px"
                >
                    <mat-checkbox
                        class="marker-checkbox-select-all"
                        (change)="masterToggle()"
                    >
                    </mat-checkbox>
                    <div fxFlex></div>
                </div>
                <div fxLayout="column" fxLayoutGap="5px">
                    <div *ngFor="let model of models">
                        <div
                            class="marker-list-item"
                            fxLayout="row"
                            fxLayoutAlign="center center"
                            fxLayoutGap="10px"
                        >
                            <mat-checkbox
                                class="marker-checkbox-item-select"
                                (click)="$event.stopPropagation()"
                                (change)="onRowSelected(model)"
                            >
                            </mat-checkbox>
                            <div fxFlex>
                                <ng-container
                                    *ngTemplateOutlet="
                                        template;
                                        context: { model: model }
                                    "
                                >
                                </ng-container>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <mat-paginator
                [length]="models.length"
                pageSize="15"
                [pageSizeOptions]="[15, 25, 50, 75, 100]"
                #paginator
            >
            </mat-paginator>
        </div>
    `
})
class TestPagedCollectionComponent {
    models: Task[] = getTaskData(20);
}

describe('PagedCollectionElement', () => {
    let fixture: ComponentFixture<TestPagedCollectionComponent>;
    let component: TestPagedCollectionComponent;
    let element: PagedCollectionElement;

    describe('Default constructor parameters', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestPagedCollectionComponent],
                imports: [
                    CommonModule,
                    MatCheckboxModule,
                    MatPaginatorModule,
                    NoopAnimationsModule
                ]
            });

            fixture = TestBed.createComponent(TestPagedCollectionComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            element = new PagedCollectionElement(
                fixture,
                '.marker-paged-collection',
                '.marker-list-item',
                '.marker-checkbox-item-select'
            );
        });

        it('should create a selectable collection by default', () => {
            expect(element.itemCheckboxes.length).toBeGreaterThan(0);
        });
    });
});
