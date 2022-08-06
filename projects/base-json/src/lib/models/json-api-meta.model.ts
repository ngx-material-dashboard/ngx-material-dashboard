/**
 * An object of the defined type T that can be instantiated.
 */
export type MetaModelType<T> = new(response: any) => T;

/**
 * Metadata such as links or data for pagination purposes can also be included
 * in the result. For each model a specific MetadataModel can be defined. To do
 * this, the class name needs to be added in the ModelConfig. If no
 * MetadataModel is explicitly defined, the default one will be used, which
 * contains an array of links and meta property.
 * 
 * @overviewDetails
 * ## Basic Usage Example
 * ```typescript
 * @JsonApiModelConfig({
 *     type: 'tasks',
 *     meta: JsonApiMetaModel
 * })
 * export class Task extends JsonModel {
 *     @Attribute() name?: string;
 *     @Attribute() isComplete: boolean = false;
 * }
 * ```
 */
export class JsonApiMetaModel {
    public links: Array<any>;
    public meta: any;

    constructor(response: any) {
        this.links = response.links || [];
        this.meta = response.meta;
    }
}
