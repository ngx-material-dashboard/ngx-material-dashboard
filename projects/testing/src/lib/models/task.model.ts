/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import {
    Attribute,
    JsonApiModelConfig
} from '@ngx-material-dashboard/base-json';
import { JsonModel } from './json.model';

/**
 * The `Task` model is a simple object that can be used for testing.
 */
@JsonApiModelConfig({
    type: 'tasks'
})
export class Task extends JsonModel {
    /** The name of the Task. */
    @Attribute() name?: string;
    /** The description of the Task.*/
    @Attribute() description?: string;
    /** The date the Task is due. */
    @Attribute() dueDate?: Date;
    /** The date the Task is completed. */
    @Attribute() dateCompleted?: Date;
    /** Set to true if the Task is complete, false if it is pending. */
    @Attribute() isComplete: boolean = false;
}
