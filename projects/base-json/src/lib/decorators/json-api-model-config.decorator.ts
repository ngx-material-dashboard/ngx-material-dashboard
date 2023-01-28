import 'reflect-metadata';
import { ModelConfig } from '../interfaces/model-config.interface';
import { JsonApiMetaModel } from '../models/json-api-meta.model';

/**
 * The JsonApiModelConfig decorator defines a custom class decorator that
 * should be included for each of your client side data models. You must include
 * a `ModelConfig` with the decorator, with a "type" value at the very least.
 * When this is the only option included in the `ModelConfig` the datastore uses
 * this value when generating the URL for creating HTTP requests for CRUD
 * operations.
 *
 * See [ModelConfig](/base-json/interfaces/model-config) for more details on
 * the options available for the decorator. You can also see below for usage
 * examples with options available.
 *
 * @param config Custom options included in decorator.
 * @returns Custom class decorator for JSON models.
 *
 * @overviewDetails
 * ### Basic Usage Example
 * ```typescript
 * import {JsonApiModelConfig} from "@ngx-material-dashboard/base-json";
 * import {JsonModel} from "@ngx-material-dashboard/json";
 *
 * @JsonApiModelConfig({
 *     type: 'tasks'
 * })
 * export class Task extends JsonModel {}
 * ```
 *
 * @overviewDetails
 * ### Additional Options Example
 * ```typescript
 * import {JsonApiModelConfig} from "@ngx-material-dashboard/base-json";
 * import {JsonModel} from "@ngx-material-dashboard/json";
 *
 * @JsonApiModelConfig({
 *     apiVersion: '2',
 *     baseUrl: 'http://some-other-domain/',
 *     type: 'tasks',
 *     modelEndpointUrl: 'task'
 * })
 * export class Task extends JsonModel {}
 * ```
 *
 * > NOTE: The above example shows how to configure a specific model with
 * > additional options to override values set for `JsonApiDatastore` in the
 * > `JsonApiDatastoreConfig` decorator. These settings will generate the
 * > URL `http://some-other-domain/2/task` in the `JsonApiDatastore` when making
 * > API calls for `Tasks`.
 *
 * > NOTE: I cannot think of a reason why you would want to have a different
 * > `type` value from the `modelEndpointUrl`, but both options were included
 * > in the [angular2-jsonapi](https://github.com/ghidoz/angular2-jsonapi), and
 * > I kept the options the same.
 */
export function JsonApiModelConfig(config: ModelConfig): ClassDecorator {
    return (target: any) => {
        if (typeof config.meta === 'undefined' || config.meta == null) {
            config.meta = JsonApiMetaModel;
        }

        Reflect.defineMetadata('JsonApiModelConfig', config, target);
    };
}
