import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import {
    CheckboxElement,
    CollectionElement,
    Datastore,
    Task,
    getTaskData
} from '@ngx-material-dashboard/testing';

import { ListComponent } from '../../../list/components/list/list.component';
import { DELETE_BUTTON, EDIT_BUTTON } from '../../shared/buttons';
import { Button } from '../../interfaces/button.interface';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';
import { CollectionComponent } from './collection.component';

/** Component to test with. */
@Component({
    template: `
        <ngx-mat-list
            [collectionButtons]="collectionButtons"
            [dataSource]="data"
            [fields]="fields"
            [multiple]="multiple"
        >
            <ng-template #model let-model="model">
                <h2>Dummy Model</h2>
                <span>{{ model.id }}</span>
            </ng-template>
        </ngx-mat-list>
    `
})
class TestCollectionComponent {
    @ViewChild(ListComponent) collection!: ListComponent<Task>;
    collectionButtons: Button[] = [{ ...EDIT_BUTTON }, { ...DELETE_BUTTON }];
    data: Task[] = [];
    fields: string[] = ['id'];
    multiple: boolean = true;
}

@Component({
    template: `
        <ngx-mat-list
            [collectionButtons]="collectionButtons1"
            [dataSource]="data1"
            [fields]="fields"
            [multiple]="multiple"
        >
            <ng-template #model let-model="model">
                <h2>Dummy Model</h2>
                <span>{{ model.id }}</span>
            </ng-template>
        </ngx-mat-list>
        <ngx-mat-list
            [collectionButtons]="collectionButtons2"
            [dataSource]="data2"
            [fields]="fields"
            [multiple]="multiple"
        >
            <ng-template #model let-model="model">
                <h2>Dummy Model</h2>
                <span>{{ model.id }}</span>
            </ng-template>
        </ngx-mat-list>
    `
})
class TestMultipleCollectionComponent {
    @ViewChildren(ListComponent) collections!: QueryList<ListComponent<Task>>;
    collectionButtons1: Button[] = [{ ...EDIT_BUTTON }, { ...DELETE_BUTTON }];
    collectionButtons2: Button[] = [{ ...EDIT_BUTTON }, { ...DELETE_BUTTON }];
    data1: Task[] = [];
    data2: Task[] = [];
    fields: string[] = ['id'];
    multiple: boolean = true;
}

// this seems to be running slowly; see if anything can be done to speed up
describe('CollectionComponent', () => {
    describe('Component with multiple children CollectionComponents', () => {
        let component: TestMultipleCollectionComponent;
        let fixture: ComponentFixture<TestMultipleCollectionComponent>;
        let collection1: CollectionElement;
        let collection2: CollectionElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    CollectionComponent,
                    ListComponent,
                    SorterComponent,
                    TestMultipleCollectionComponent
                ],
                imports: [
                    HttpClientTestingModule,
                    MatButtonModule,
                    MatCheckboxModule,
                    MatPaginatorModule,
                    MatSelectModule,
                    MatSortModule,
                    MatTableModule,
                    NoopAnimationsModule,
                    FlexLayoutModule,
                    FontAwesomeModule
                ],
                providers: [{ provide: JsonDatastore, useClass: Datastore }],
                teardown: { destroyAfterEach: false }
            });

            fixture = TestBed.createComponent(TestMultipleCollectionComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        beforeEach(() => {
            // initialize the component with dummy data and allow multi-select
            const collections = initMultipleCollection(
                getTaskData(),
                getTaskData()
            );
            collection1 = collections[0];
            collection2 = collections[1];
        });

        it('should select all rows in collection1 but not collection2 when checkbox in collection1 header checked', () => {
            // when: the select all checkbox is checked
            collection1.selectAll();

            // then: the component should return true for isAllSelected()
            expect(collection1.component.isAllSelected()).toEqual(true);

            // and: all rows in collection1 should have their checkboxes checked
            const checkBoxes: CheckboxElement[] = collection1.itemCheckboxes;
            checkBoxes.forEach((checkbox: CheckboxElement) => {
                expect(checkbox.checked).toBeTrue();
            });

            // and: none of rows in collection2 should have their checkboxes checked
            expect(collection2.component.selection.selected.length).toEqual(0);
            expect(collection2.component.isAllSelected()).toEqual(false);
        });
    });

    describe('Component with single child CollectionComponent', () => {
        let component: TestCollectionComponent;
        let fixture: ComponentFixture<TestCollectionComponent>;
        let page: CollectionElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    CollectionComponent,
                    ListComponent,
                    SorterComponent,
                    TestCollectionComponent
                ],
                imports: [
                    HttpClientTestingModule,
                    MatButtonModule,
                    MatCheckboxModule,
                    MatPaginatorModule,
                    MatSelectModule,
                    MatSortModule,
                    MatTableModule,
                    NoopAnimationsModule,
                    FlexLayoutModule,
                    FontAwesomeModule
                ],
                providers: [{ provide: JsonDatastore, useClass: Datastore }]
            });

            fixture = TestBed.createComponent(TestCollectionComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        describe('No Collection Data', () => {
            beforeEach(() => {
                // initialize component without any data
                page = init();
            });

            it('should not have any rows selected by default', () => {
                expect(
                    page.component.collection.selection.selected.length
                ).toEqual(0);
                expect(page.component.collection.isAllSelected()).toEqual(
                    false
                );
            });

            it('should initialize dataSource by default', () => {
                expect(page.component.collection.dataSource$).toBeDefined();
            });

            it('should re-initialize dataSource', () => {
                // given: a spy on the collection component initDataSource method
                const spy = spyOn(component.collection, 'initDataSource');

                // when: the data is updated
                component.data = [...getTaskData()];
                fixture.detectChanges();

                // then: initDataSource should have been called
                expect(spy).toHaveBeenCalled();

                // and: dataSource should be initialized/defined
                expect(page.component.collection.dataSource$).toBeDefined();
            });
        });

        describe('With Collection Data', () => {
            // tests where it doesn't matter whether multi-select is allowed
            describe('Mulit-select Independent', () => {
                beforeEach(() => {
                    // initialize the component with dummy data and allow multi-select
                    page = init(getTaskData());
                });

                it('should emit buttonClick event when action button clicked in row', () => {
                    // given: a spy on the tableButtonClick
                    const spy = spyOn(
                        page.component.collection.buttonClick,
                        'emit'
                    );

                    // when: a button is clicked in one of the rows
                    page.clickItemButton('edit', 0);

                    // then: the tableButtonClick emit method should have been called
                    expect(spy).toHaveBeenCalledWith({
                        click: 'edit',
                        row: getTaskData()[0]
                    });
                });

                // it('should not display no data row', () => {
                //     // given: the no data row and it's parent
                //     const noDataRow = page.noDataRow;
                //     const noDataRowParent = noDataRow.parentElement;

                //     // expect: the parent should have "hide" class to hide row
                //     expect(noDataRowParent?.className).toContain('hide');
                // });
            });

            describe('Multi-select Enabled', () => {
                beforeEach(() => {
                    // initialize the component with dummy data and allow multi-select
                    page = init(getTaskData());
                });

                describe('No rows selected initially', () => {
                    it('should not have any rows selected by default', () => {
                        expect(
                            page.component.collection.selection.selected.length
                        ).toEqual(0);
                        expect(
                            page.component.collection.isAllSelected()
                        ).toEqual(false);
                    });

                    it('should select all rows when checkbox in header checked', () => {
                        // when: the select all checkbox is checked
                        page.selectAll();

                        // then: the component should return true for isAllSelected()
                        expect(
                            page.component.collection.isAllSelected()
                        ).toEqual(true);

                        // and: all rows should have their checkboxes checked
                        const checkBoxes: CheckboxElement[] =
                            page.itemCheckboxes;
                        checkBoxes.forEach((checkbox: CheckboxElement) => {
                            expect(checkbox.checked).toBeTrue();
                        });
                    });

                    it('should clear selection from all rows when checkbox in header checked if all rows selected', () => {
                        // setup: select all rows
                        page.selectAll();

                        // when: the select all rows button is clicked again
                        page.selectAll();

                        // then: no rows should have their checkboxes checked
                        const checkBoxes: CheckboxElement[] =
                            page.itemCheckboxes;
                        checkBoxes.forEach((checkbox: CheckboxElement) => {
                            expect(checkbox.checked).toBeFalse();
                        });
                    });
                });
            });

            describe('Multi-select Disabled', () => {
                beforeEach(() => {
                    // initialize the component with dummy data and disable multi-select
                    page = init(getTaskData(20), false);
                });

                it('should allow row to be selected and deselected', () => {
                    // when: the checkbox is checked in first row
                    page.selectItem(0);

                    // then: the checkbox should be checked
                    expect(page.isItemSelected(0)).toBeTrue();

                    // when: the checkbox is unchecked
                    page.selectItem(0);

                    // then: checkbox should be unchecked
                    expect(page.isItemSelected(0)).toBeFalse();
                });

                it('should only select one row at a time', () => {
                    // when: the first checkbox is checked
                    page.selectItem(0); //.clickCheckbox(checkbox1InputElement);

                    // and: the second checkbox is checked
                    page.selectItem(1); //age.clickCheckbox(checkbox2InputElement);

                    // then: the second checkbox should be the only checkbox checked
                    expect(page.isItemSelected(0)).toBeFalse();
                    expect(page.isItemSelected(1)).toBeTrue();
                });
            });
        });
    });
});

/**
 * Helper function to setup the Component for tests using local data.
 *
 * @param data The data to load in the table.
 * @param multiple Boolean value to set whether table allows multiple selection.
 * @return A page helper to aid in tests.
 */
function init(data: Task[] = [], multiple = true): CollectionElement {
    const fixture: ComponentFixture<TestCollectionComponent> =
        TestBed.createComponent(TestCollectionComponent);
    const component = fixture.componentInstance;
    component.data = data;
    component.multiple = multiple;
    fixture.detectChanges();

    return new CollectionElement(
        fixture,
        '.marker-list',
        '.marker-list-item',
        '.marker-checkbox-item-select'
    );
}

function initMultipleCollection(
    data1: Task[] = [],
    data2: Task[] = [],
    multiple = true
): CollectionElement[] {
    const fixture: ComponentFixture<TestMultipleCollectionComponent> =
        TestBed.createComponent(TestMultipleCollectionComponent);
    const component = fixture.componentInstance;
    component.data1 = data1;
    component.data2 = data2;
    component.multiple = multiple;
    fixture.detectChanges();

    return [
        new CollectionElement(
            fixture,
            '.marker-list',
            '.marker-list-item',
            '.marker-checkbox-item-select',
            true,
            true,
            component.collections.get(0)
        ),
        new CollectionElement(
            fixture,
            '.marker-list',
            '.marker-list-item',
            '.marker-checkbox-item-select',
            true,
            true,
            component.collections.get(1)
        )
    ];
}
