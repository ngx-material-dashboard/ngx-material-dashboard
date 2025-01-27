/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

/**
 * An object of the defined type T that can be instantiated.
 *
 * @overviewDetails
 * #### Basic Usage Example
 * ```typescript
 * import {JsonDatastore as BaseJsonDatastore, ModelType} from '@ngx-material-dashboard/base-json';
 * import {JsonModel} from './json.model';
 *
 * export class JsonDatastore extends BaseJsonDatastore {
 *     public createRecord<T extends JsonModel>(modelType: ModelType<T>, data: Partial<T>): T {
 *         return new modelType(this, data);
 *     }
 * }
 * ```
 */
export type ModelType<T> = new (...args: any[]) => T;
