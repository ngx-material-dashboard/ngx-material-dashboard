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
