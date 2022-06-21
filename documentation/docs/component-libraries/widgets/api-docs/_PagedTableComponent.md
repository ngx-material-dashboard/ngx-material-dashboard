## PagedTableComponent

The PagedTableComponent represents a table with paged data. This component
defines most of the HTML required for a MatTable that includes a select
checkbox in the first column and a column for action buttons. Any additional
columns defined in the HTML where this selector is used are automatically
detected and included with the table. Columns should follow the same format
as a MatTable. You should include a column definition for when no table is
empty.

### Properties

| Name | Description |
| :------: | :------: |
| buttons: Property | The buttons to render in each row of the table. |
| columnDefs: Property | A reference to the columns defined; allows user to define columns inside selector for this component. |
| dataSource$: Property |  |
| displayedColumns: Property | Columns to display in the table. |
| initiallySelectedValues: Property | Any values that should be selected when table initially renders. |
| multiple$: Property |  |
| pageSize: Property | The default page size (number of rows to show in the table). |
| paginator: Property | A reference to the paginator in the template. |
| selection: Property | The model to track items selected in the table. |
| sort$: Property | A reference to the sort defined in parent template. |
| sub: Property |  |
| table: Property | A reference to the table in the template. |
| tableButtonClick: Property | The event emitted when a button in one of the rows is clicked. |
