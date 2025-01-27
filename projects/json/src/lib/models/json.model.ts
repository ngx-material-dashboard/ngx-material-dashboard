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
    JsonModel as BaseJsonModel
} from '@ngx-material-dashboard/base-json';

import { JsonDatastore } from '../services/json-datastore.service';

/**
 * The `JsonModel` defines how to initialize all your client side data models.
 * All of your client side data models should extend this class.
 *
 * #### Basic Usage Example
 * ```typescript
 * import {Attribute, JsonApiModelConfig} from "@ngx-material-dashboard/base-json";
 * import {JsonModel} from "@ngx-material-dashboard/json";
 *
 * @JsonApiModelConfig({
 *   type: 'tasks'
 * })
 * export class Task extends JsonModel {
 *
 *     @Attribute() name?: string;
 *     @Attribute() dueDate?: string;
 * }
 * ```
 */
export class JsonModel extends BaseJsonModel {
    /**
     * The primary key id attribute for the model. The @Attribute decorator
     * must be added here to ensure this is included with (de)serialized
     * data since the id should be included with the rest of the attributes,
     * unlike json:api spec where attributes defined separately.
     */
    @Attribute() override id?: string;

    constructor(internalDatastore: JsonDatastore, data?: any) {
        super(internalDatastore);

        if (data) {
            this.modelInitialization = true;
            this.id = data.id;
            Object.assign(this, data);
            this.modelInitialization = false;
        }
    }

    /**
     * Returns the serialized representation for the model that can be used as
     * JSON in HTTP request body. Without this everything from the object would
     * be included in JSON resulting in `TypeError: cyclic object value` if you
     * try to define an @Attribute with type that extends JsonModel. Should
     * only be used by JsonNestedModelConverter, and shouldn't really be called
     * directly.
     *
     * @returns Serialized representation for the model.
     */
    serialize(): any {
        const serializedNameToPropertyName =
            Reflect.getMetadata('AttributeMapping', this) || [];
        const properties: any = {};
        Object.keys(serializedNameToPropertyName).forEach((serializedName) => {
            if (
                this &&
                this[serializedName] !== null &&
                this[serializedName] !== undefined &&
                serializedName !== 'nestedDataSerialization'
            ) {
                properties[serializedNameToPropertyName[serializedName]] =
                    this[serializedName];
            }
        });
        return properties;
    }
}
