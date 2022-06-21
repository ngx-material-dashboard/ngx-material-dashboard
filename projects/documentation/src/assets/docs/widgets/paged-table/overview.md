The `PagedTableComponent` defines all of the HTML and code needed to render and
use a `MatTable` and corresponding `Paginator` with both local and remote data
sources. To use this component you only need to define a few basic configuration
options in your Typescript and the columns for your table in your template (as
you would if you were creating a MatTable). Below is an example that shows you
how to use the `PagedTableComponent`.

```typescript
@Component({
    template: `
    <ngx-material-dashboard-paged-table matSort [buttons]="buttons" [data]="data" [displayedColumns]="displayedColumns" class="marker-paged-table">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
            <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="noData">
            <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                No data found
            </mat-footer-cell>
        </ng-container>
    </ngx-material-dashboard-paged-table>
    `
}) class TestPagedTableComponent {
    @ViewChild(PagedTableComponent) table!: PagedTableComponent<DummyObject>;
    buttons: TableButton[] = [EDIT_BUTTON, DELETE_BUTTON];
    data: JsonModel[] = [];
    displayedColumns: string[] = ['select', 'id', 'name', 'actions'];
}
```

The component above defines `buttons` to display in the `actions` column for each
row in the table, the `data` to use in the table (for local table data), and the
`displayedColumns` to show when the table is rendered. The `EDIT_BUTTON` and
`DELETE_BUTTON` are pre-built buttons I have included to help edit and delete
objects in the table. You may create your own buttons and include them here, as
long as they implement the `TableButton` interface defined in the module.