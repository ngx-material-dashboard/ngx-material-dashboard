import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore, getTaskData, Task } from '@ngx-material-dashboard/testing';
import { sandboxOf } from 'angular-playground';
import { ListComponent } from './list.component';
import { CollectionModule } from '../../../collection/collection.module';
import { IconModule } from '../../../icon/icon.module';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { DEFAULT_COLLECTION_BUTTONS } from '../../../collection/shared/buttons';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';

class CustomTask extends Task {
    child?: Task;
}

function addNullIdTasks(tasks: any[]) {
    for (let i = 0; i < 5; i++) {
        tasks.push({
            name: '',
            description: '',
            dueDate: new Date(),
            isComplete: false
        });
    }
    return tasks;
}

function addRelations(tasks: CustomTask[]) {
    tasks.forEach((task) => {
        const index = getRandomIntInclusive(0, tasks.length);
        task.child = tasks[index];
    });
    return tasks;
}

const customSortingAccessor = (item: CustomTask, property: string) => {
    if (property === 'child.id') {
        return item.child?.id;
    } else {
        return item[property];
    }
};

function getRandomIntInclusive(min: number, max: number): number {
    // Use Math.ceil and Math.floor to handle potential non-integer inputs gracefully
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    // The formula ensures an even distribution across all integers in the range
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
}

export default sandboxOf(ListComponent, {
    imports: [
        HttpClientTestingModule,
        OverlayModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatGridListModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSortModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        CollectionModule,
        IconModule,
        ToolbarModule
    ],
    providers: [
        { provide: Datastore, deps: [HttpClient] },
        { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
    ]
})
    .add('default', {
        template: `
    <ngx-mat-list
        [collectionButtons]="collectionButtons"
        [dataSource]="data"
        [fields]="fields"
        class="marker-list">
        <ng-template #model let-model="model">
            <mat-card>
                <mat-card-title>
                    {{model.id}} Title
                </mat-card-title>
                <mat-card-content>
                    Content for dummy object {{model.id}}
                </mat-card-content>
            </mat-card>
        </ng-template>
    </ngx-mat-list>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: getTaskData(20),
            fields: ['id']
        }
    })
    .add('map of fields', {
        template: `
    <ngx-mat-list
        [collectionButtons]="collectionButtons"
        [dataSource]="data"
        [fields]="fields"
        class="marker-list">
        <ng-template #model let-model="model">
            <mat-card>
                <mat-card-title>
                    {{model.id}} Title
                </mat-card-title>
                <mat-card-content>
                    Content for dummy object {{model.id}}
                </mat-card-content>
            </mat-card>
        </ng-template>
    </ngx-mat-list>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: getTaskData(20),
            fields: [{ field: 'id', text: 'ID' }]
        }
    })
    .add('custom padding around items', {
        template: `
    <div style="padding: 0 16px">
        <ngx-mat-list
            [collectionButtons]="collectionButtons"
            [dataSource]="data"
            [fields]="fields"
            class="marker-list">
            <ng-template #model let-model="model">
                <div style="padding: 0 16px">
                    <mat-card>
                        <mat-card-title>
                            {{model.id}} Title
                        </mat-card-title>
                        <mat-card-content>
                            Content for dummy object {{model.id}}
                        </mat-card-content>
                    </mat-card>
                </div>
            </ng-template>
        </ngx-mat-list>
    </div>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: getTaskData(20),
            fields: ['id']
        }
    })
    .add('custom sortingDataAccessor', {
        template: `
    <div style="padding: 0 16px">
        <ngx-mat-list
            [collectionButtons]="collectionButtons"
            [dataSource]="data"
            [fields]="fields"
            [sortingDataAccessor]="sortingDataAccessor"
            class="marker-list">
            <ng-template #model let-model="model">
                <div style="padding: 0 16px">
                    <mat-card>
                        <mat-card-title>
                            {{model.id}} Title
                        </mat-card-title>
                        <mat-card-content>
                            Content for dummy object {{model.id}} with child {{model.child?.id}}
                        </mat-card-content>
                    </mat-card>
                </div>
            </ng-template>
        </ngx-mat-list>
    </div>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: addRelations(getTaskData(20)),
            fields: ['id', 'child.id'],
            sortingDataAccessor: (item: CustomTask, property: string) => {
                if (property === 'child.id') {
                    return item.child?.id;
                } else {
                    return item[property];
                }
            }
        }
    })
    .add('custom sortingDataAccessor and sortData', {
        template: `
    <div style="padding: 0 16px">
        <ngx-mat-list
            [collectionButtons]="collectionButtons"
            [dataSource]="data"
            [fields]="fields"
            [sortData]="sortData"
            class="marker-list">
            <ng-template #model let-model="model">
                <div style="padding: 0 16px">
                    <mat-card>
                        <mat-card-title>
                            {{model.id}} Title
                        </mat-card-title>
                        <mat-card-content>
                            Content for dummy object {{model.id}}
                        </mat-card-content>
                    </mat-card>
                </div>
            </ng-template>
        </ngx-mat-list>
    </div>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: addRelations(addNullIdTasks(getTaskData(20))),
            fields: ['id', 'child.id'],
            sortData: (data: CustomTask[], sort: MatSort) => {
                const active = sort.active;
                const direction = sort.direction;

                if (!active || direction === '') {
                    return data;
                }

                return data.sort((a, b) => {
                    // use custom sortingDataAccessor to extract values
                    const valueA = customSortingAccessor(a, active);
                    const valueB = customSortingAccessor(b, active);

                    // always put null/undefined at the end
                    if (valueA === null || valueA === undefined) return 1;
                    if (valueB === null || valueB === undefined) return -1;

                    const comparatorResult =
                        valueA < valueB ? -1 : valueA > valueB ? 1 : 0;

                    return comparatorResult * (direction === 'asc' ? 1 : -1);
                });
            }
        }
    });
