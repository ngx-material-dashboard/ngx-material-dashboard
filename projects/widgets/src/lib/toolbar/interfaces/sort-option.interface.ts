/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

/**
 * A basic interface that includes the name of the field to sort on and the
 * order (ascending or descending) in which to sort the field. This is the
 * type that is emitted from the `Sorter` when a user selects a field or
 * changes the order.
 */
export interface SortOption {
    field: string;
    text: string;
}
