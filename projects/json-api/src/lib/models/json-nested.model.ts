import { ModelConfig } from '@ngx-material-dashboard/base-json';
import { JsonApiModel } from './json-api.model';

export class JsonApiNestedModel {
    [key: string]: any;

    public nestedDataSerialization = false;

    constructor(data?: any) {
        if (data) {
            Object.assign(this, data);
        }
    }

    get modelConfig(): ModelConfig {
        return Reflect.getMetadata('JsonApiModelConfig', this.constructor);
    }

    public fill(data: any) {
        Object.assign(this, data);
    }

    public serialize(): any {
        return this.transformSerializedNamesToPropertyNames();
    }

    protected transformSerializedNamesToPropertyNames<T extends JsonApiModel>() {
        const serializedNameToPropertyName = this.getModelPropertyNames();
        const properties: any = {};
        Object.keys(serializedNameToPropertyName).forEach((serializedName) => {
            if (this && this[serializedName] !== null &&
                this[serializedName] !== undefined && serializedName !== 'nestedDataSerialization') {
                properties[serializedNameToPropertyName[serializedName]] = this[serializedName];
            }
        });

        return properties;
    }

    protected getModelPropertyNames() {
        return Reflect.getMetadata('AttributeMapping', this) || [];
    }
}
