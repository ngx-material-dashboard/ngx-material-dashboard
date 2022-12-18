import {
    Attribute,
    JsonModel as BaseJsonModel
} from '@ngx-material-dashboard/base-json';

import { JsonDatastore } from '../services/json-datastore.service';

/**
 * The `JsonModel` defines how to initialize all your client side data models.
 * All of your client side data models should extend this class.
 *
 * ## Basic Usage Example
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
}
