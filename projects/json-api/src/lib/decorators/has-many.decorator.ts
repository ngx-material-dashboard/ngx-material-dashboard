/**
 * HasMany is a custom property decorator that should be added to any property
 * that is a to-many relationship. Marking a property with this decorator will
 * automatically convert included relationship data associated with the property
 * name into the appropriate model type array and make it available in the
 * datastore.
 *
 * @param config Optional Configuration included in decorator
 * @returns A custom property decorator for to-many JSON relationships.
 *
 * @overviewDetails
 * ## Basic Usage Example
 * ```typescript
 * import {JsonModel} from '@ngx-material-dashboard/base-json';
 * import {HasMany}  from '@ngx-material-dashboard/json-api';
 * import {Task} from './task';
 *
 * class User extends JsonModel {
 *     //...
 *     @HasMany() tasks?: Task[];
 * }
 * ```
 *
 * The `BelongsTo` decorator includes an optional config parameter with the
 * option to define the key to use when converting relationship data, if the
 * key differs from the property name.
 *
 * ## Key Usage Example
 * ```typescript
 * import {JsonModel} from '@ngx-material-dashboard/base-json';
 * import {HasMany}  from '@ngx-material-dashboard/json-api';
 * import {User} from './user';
 *
 * class User extends JsonModel {
 *     //...
 *     @HasMany({key: 'sys_tasks'}) tasks?: Task[];
 * }
 * ```
 */
export function HasMany(config: any = {}): PropertyDecorator {
    return (target: any, propertyName: string | symbol) => {
        const annotations = Reflect.getMetadata('HasMany', target) || [];

        annotations.push({
            propertyName,
            relationship: config.key || propertyName
        });

        Reflect.defineMetadata('HasMany', annotations, target);
    };
}
