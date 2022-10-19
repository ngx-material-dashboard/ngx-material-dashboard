import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore, DummyObject } from '@ngx-material-dashboard/testing';
import { RemoteDataSourceMock } from '../../../../../test/mocks/remote-data-source.service';
import { ListComponent } from '../../../list/components/list/list.component';
import { CompactPagedToolbarComponent } from '../../../toolbar/pages/compact-paged-toolbar/compact-paged-toolbar.component';

import { CompactPagedCollectionComponent } from './compact-paged-collection.component';

@Component({
    template: `
    <ngx-material-dashboard-compact-paged-toolbar>
    </ngx-material-dashboard-compact-paged-toolbar>
    <ngx-material-dashboard-list collection [dataSource]="dataSource$">
        <ng-template #model let-model="model">
            <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px">
                <mat-checkbox class="marker-checkbox-row-select"
                    (click)="$event.stopPropagation()"
                    (change)="onRowSelected(model)"
                    [checked]="selection.isSelected(model)">
                </mat-checkbox>
                <div fxFlex>
                    <ng-container 
                        *ngTemplateOutlet="template; context: { model: model }">
                    </ng-container>
                </div>
                <div fxLayout="row" fxLayoutGap="5px">
                    <button *ngFor="let button of collectionButtons"
                        class="button-marker-{{button.click}}"
                        (click)="onActionButtonClick(button.click, model)"
                        mat-icon-button>
                        <fa-icon [icon]="button.icon"></fa-icon>
                        <div class="mat-button-focus-overlay"></div>
                        <div class="mat-button-ripple mat-ripple"></div>
                    </button>
                </div>
            </div>
        </ng-template>
    </ngx-material-dashboard-list>`
}) class TestCompactPagedCollectionComponent
    extends CompactPagedCollectionComponent<DummyObject> {}

describe('CompactPagedCollectionComponent', () => {
    let component: TestCompactPagedCollectionComponent;
    let fixture: ComponentFixture<TestCompactPagedCollectionComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestCompactPagedCollectionComponent,
                CompactPagedCollectionComponent,
                CompactPagedToolbarComponent,
                ListComponent
            ],
            imports: [
                HttpClientTestingModule,
                MatPaginatorModule,
                MatSortModule,
                NoopAnimationsModule
            ],
            providers: [
                { provide: Datastore, deps: [HttpClient] },
                { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCompactPagedCollectionComponent);
        const datastore = TestBed.inject(JsonDatastore);
        component = fixture.componentInstance;
        component.dataSource = new RemoteDataSourceMock(DummyObject, datastore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
