/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

/* tslint:disable:variable-name */
import {
    Attribute,
    JsonApiModelConfig,
    PropertyConverter
} from '@ngx-material-dashboard/base-json';
import { JsonModel } from './json.model';
import { PageMetaData } from './page-meta-data';

export const TASK_API_VERSION = 'v3';
export const TASK_MODEL_ENDPOINT_URL = 'custom-task';

class CustomConverter implements PropertyConverter {
    mask(value: any): string {
        return 'I am a custom value';
    }

    unmask(value: string | null): string | null {
        if (value === null) {
            return null;
        }
        return value;
    }
}

@JsonApiModelConfig({
    apiVersion: TASK_API_VERSION,
    modelEndpointUrl: TASK_MODEL_ENDPOINT_URL,
    type: 'tasks',
    meta: PageMetaData
})
export class CustomTask extends JsonModel {
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
    @Attribute({ converter: new CustomConverter() })
    customConverterProperty?: string;
}
