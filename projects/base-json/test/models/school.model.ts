import { JsonAttribute, JsonApiNestedModel } from '../../src/lib';

export class School extends JsonApiNestedModel {
    @JsonAttribute()
    public name?: string;

    @JsonAttribute()
    public students?: number;

    @JsonAttribute()
    public foundation?: Date;
}
