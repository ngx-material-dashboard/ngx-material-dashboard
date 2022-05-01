import 'reflect-metadata';
import { ModelConfig } from '../interfaces/model-config.interface';
import { JsonApiMetaModel } from '../models/json-api-meta.model';

/**
 * The JsonApiModelConfig decorator defines a custom class decorator that
 * should be included for each of your client side data models. The only
 * required option to include is "type". When this is the only option included
 * the datastore uses this value when generating the URL for creating HTTP
 * requests for CRUD operations.
 *
 * @param config Custom options included in decorator. 
 * @returns Custom class decorator for JSON models.
 */
export function JsonApiModelConfig(config: ModelConfig) {
    return (target: any) => {
        if (typeof config.meta === 'undefined' || config.meta == null) {
            config.meta = JsonApiMetaModel;
        }

        Reflect.defineMetadata('JsonApiModelConfig', config, target);
    };
}
