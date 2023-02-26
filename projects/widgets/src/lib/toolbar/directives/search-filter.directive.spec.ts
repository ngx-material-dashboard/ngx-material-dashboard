import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import {
    Datastore,
    Task,
    MenuElement,
    getTaskData
} from '@ngx-material-dashboard/testing';
import { RemoteDataSourceMock } from '@ngx-material-dashboard/widgets/test/mocks/remote-data-source.service';
import { CollectionComponent } from '../../collection/components/collection/collection.component';
import { RemoteDataSource } from '../../collection/services/remote-data-source.service';
import { ListComponent } from '../../list/components/list/list.component';
import { PagedListWithRaisedButtonsBarComponent } from '../../list/pages/paged-list-with-raised-buttons-bar/paged-list-with-raised-buttons-bar.component';
import { PagedListComponent } from '../../list/pages/paged-list/paged-list.component';
import { FilterDropDownComponent } from '../components/filter-drop-down/filter-drop-down.component';
import { SearchFilterMap } from '../interfaces/search-filter-map.interface';
import { ToolbarModule } from '../toolbar.module';
import { SearchFilterDirective } from './search-filter.directive';

@Component({
    template: `
        <ngx-mat-paged-list-with-raised-buttons-bar
            ngxMaterialDashboardSearchFilter
            [collection]="collectionCmp"
            [filter]="filterCmp"
            [form]="parentForm"
            (searchClick)="onSearchClick($event)"
            #pagedCollectionWithToolbar
        >
            <ngx-mat-filter-drop-down filter>
                <form [formGroup]="formGroup">
                    <mat-form-field>
                        <mat-label>Task Name</mat-label>
                        <input
                            matInput
                            formControlName="name"
                            placeholder="Search task by name..."
                            class="marker-input-name"
                        />
                    </mat-form-field>
                </form>
            </ngx-mat-filter-drop-down>
            <ngx-mat-paged-list
                [dataSource]="data"
                collection
                #collection
            >
                <ng-template #model let-model="model">
                    <span>{{ model.id }} Title</span>
                    <span>Content for dummy object {{ model.id }}</span>
                </ng-template>
            </ngx-mat-paged-list>
        </ngx-mat-paged-list-with-raised-buttons-bar>
    `
})
class SearchFilterDirectiveTestComponent implements OnInit {
    @ViewChild('pagedCollectionWithToolbar')
    pagedCollection!: PagedListWithRaisedButtonsBarComponent<Task>;
    @ViewChild(SearchFilterDirective)
    directive!: SearchFilterDirective<Task>;
    filterCmp!: FilterDropDownComponent;
    collectionCmp!: PagedListComponent<Task> | CollectionComponent<Task>;
    data: Task[] | RemoteDataSource<Task> = [];
    fields: string[] = ['id'];
    formGroup!: FormGroup;
    parentForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            name: null
        });

        this.parentForm = this.formBuilder.group({});
        this.parentForm.addControl('searchFilter', this.formGroup);
    }

    onSearchClick(filter: SearchFilterMap): void {}
}

describe('SearchFilterDirective', () => {
    let component: SearchFilterDirectiveTestComponent;
    let filterDropDown: MenuElement;
    let fixture: ComponentFixture<SearchFilterDirectiveTestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ListComponent,
                PagedListComponent,
                PagedListWithRaisedButtonsBarComponent,
                SearchFilterDirective,
                SearchFilterDirectiveTestComponent
            ],
            imports: [
                HttpClientTestingModule,
                FormsModule,
                MatButtonModule,
                MatCheckboxModule,
                MatDividerModule,
                MatFormFieldModule,
                MatInputModule,
                MatMenuModule,
                MatPaginatorModule,
                MatSelectModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                FontAwesomeModule,
                ToolbarModule
            ],
            providers: [
                {
                    provide: RemoteDataSource,
                    userClass: RemoteDataSourceMock,
                    deps: [Datastore]
                },
                { provide: Datastore, deps: [HttpClient] },
                {
                    provide: JsonDatastore,
                    useClass: Datastore,
                    deps: [HttpClient]
                }
            ]
        });

        fixture = TestBed.createComponent(SearchFilterDirectiveTestComponent);
        const jsonDatastore = TestBed.inject(JsonDatastore);
        component = fixture.componentInstance;
        component.data = new RemoteDataSourceMock<Task>(Task, jsonDatastore);
        fixture.detectChanges();

        component.filterCmp = component.pagedCollection.filter;
        component.collectionCmp = component.pagedCollection.collectionCmp;
        fixture.detectChanges();

        filterDropDown = new MenuElement(fixture);
    });

    beforeEach(() => {
        filterDropDown.initButtons();
    });

    it('should emit event when search button clicked in filter component', () => {
        const spy = spyOn(component, 'onSearchClick').and.callThrough();
        filterDropDown.clickButton('.marker-button-search');

        expect(spy).toHaveBeenCalled();
    });

    it('should throw an error when data is local data', () => {
        // given: a spy on the throwError method in the directive
        const spy = spyOn(component.directive, 'throwError').and.callThrough();

        // and: some component data
        component.data = getTaskData(20);
        fixture.detectChanges();

        // when: the search button is clicked
        filterDropDown.clickButton('.marker-button-search');
        fixture.detectChanges();

        // then: the throwError method should have been called
        expect(spy).toHaveBeenCalled();
    });
});
