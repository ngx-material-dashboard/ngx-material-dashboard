## Overview Content

The `PagedTableComponent` defines all of the HTML and code needed to render and
use a `MatTable` and corresponding `Paginator` with both local and remote data
sources. To use this component you only need to define a few basic configuration
options in your Typescript and the columns for your table in your template (as
you would if you were creating a MatTable).

The minimum input values you must define for the `PagedTableComponent` are the `buttons`, `data`, and `displayedColumns`. The `buttons` input is an array of buttons to display in the `actions` column for each row in the table. The `data` to use in the table (for local table data), and the `displayedColumns` to show when the table is rendered. The `EDIT_BUTTON` and `DELETE_BUTTON` are pre-built buttons I have included to help edit and delete objects in the table. You may create your own buttons and include them here, as long as they implement the `TableButton` interface defined in the module.
