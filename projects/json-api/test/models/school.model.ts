import { JsonApiNestedModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-nested.model';
import { JsonAttribute } from '@ngx-material-dashboard/json-api/src/lib/decorators/json-attribute.decorator';

export class School extends JsonApiNestedModel {

    @JsonAttribute()
    public name?: string;

    @JsonAttribute()
    public students?: number;

    @JsonAttribute()
    public foundation?: Date;
}
