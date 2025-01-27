/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

/**
 * BelongsTo is a custom property decorator that should be added to any property
 * that is a to-one relationship. Marking a property with this decorator will
 * automatically convert included relationship data associated with the property
 * name into the appropriate model type and make it available in the datastore.
 *
 * @param config Configuration included in decorator.
 * @returns A custom property decorator for to-one JSON relationships.
 *
 * @overviewDetails
 * #### Basic Usage Example
 * ```typescript
 * import {JsonModel} from "@ngx-material-dashboard/base-json";
 * import {User} from './user';
 *
 * class Task extends JsonModel {
 *     //...
 *     @BelongsTo() user?: User;
 * }
 * ```
 *
 * The `BelongsTo` decorator includes an optional config parameter with the
 * option to define the key to use when converting relationship data, if the
 * key differs from the property name.
 *
 * #### Key Usage Example
 * ```typescript
 * import {JsonModel} from "@ngx-material-dashboard/base-json";
 * import {User} from './user';
 *
 * class Task extends JsonModel {
 *     //...
 *     @BelongsTo({key: 'sys_user'}) user?: User;
 * }
 * ```
 */
export function BelongsTo(config: any = {}): PropertyDecorator {
    return (target: any, propertyName: string | symbol) => {
        const annotations = Reflect.getMetadata('BelongsTo', target) || [];

        annotations.push({
            propertyName,
            relationship: config.key || propertyName
        });

        Reflect.defineMetadata('BelongsTo', annotations, target);
    };
}
