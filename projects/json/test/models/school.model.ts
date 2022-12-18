import { JsonApiNestedModel } from '@ngx-material-dashboard/base-json/src/lib/models/json-nested.model';
import { JsonAttribute } from '@ngx-material-dashboard/base-json/src/lib/decorators/json-attribute.decorator';

export class School extends JsonApiNestedModel {
    @JsonAttribute()
    public name?: string;

    @JsonAttribute()
    public students?: number;

    @JsonAttribute()
    public foundation?: Date;
}
