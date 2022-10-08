/**
 * A basic interface that includes the name of the field to sort on and the
 * order (ascending or descending) in which to sort the field. This is the
 * type that is emitted from the `Sorter` when a user selects a field or
 * changes the order.
 */
export interface SortOrder {
    /** The name of the field to sort on. */
    sort: string;
    /** The direction of sort (asc or desc). */
    order: string;
}
