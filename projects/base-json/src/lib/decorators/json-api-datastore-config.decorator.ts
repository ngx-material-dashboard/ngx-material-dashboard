import 'reflect-metadata';

/**
 * The JsonApiDatastoreConfig decorator defines a custom class decorator that
 * should be included with the datastore service implementation included in
 * your application.
 *
 * @param config Custom options included in decorator. 
 * @returns Custom class decorator for JSON datastore service.
 */
export function JsonApiDatastoreConfig(config: any = {}) {
    return (target: any) => {
        Reflect.defineMetadata('JsonApiDatastoreConfig', config, target);
    };
}
