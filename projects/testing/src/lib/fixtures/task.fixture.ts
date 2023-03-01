/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

export const TASK_NAME = 'Create Task Test Fixture';
export const TASK_DESCRIPTION = 'Add Task data for unit tests';
export const TASK_DUE_DATE = '2022-05-04';
export const TASK_DATE_COMPLETED = null;
export const TASK_IS_COMPLETE = false;

/**
 * Returns an array of Tasks that can be used for tests. The number of Tasks in
 * the array is configurable with the total parameter, and defaults to 1.
 *
 * @param total The number of Tasks to add to the results.
 * @returns An array of Tasks.
 */
export function getTaskData(total: number = 1): any[] {
    const response: any[] = [];

    for (let i = 0; i < total; i++) {
        response.push({
            id: i,
            name: TASK_NAME,
            description: TASK_DESCRIPTION,
            dueDate: new Date(TASK_DUE_DATE),
            dateCompleted: TASK_DATE_COMPLETED,
            isComplete: TASK_IS_COMPLETE
        });
    }

    return response;
}
