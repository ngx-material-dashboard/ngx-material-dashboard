import { Thing } from './thing';
import { HasMany } from '@ngx-material-dashboard/json-api/src/lib/decorators/has-many.decorator';
import { JsonModel } from '@ngx-material-dashboard/json/src/lib/models/json.model';
import { JsonApiModelConfig } from '@ngx-material-dashboard/base-json';

@JsonApiModelConfig({
    type: 'thing_category'
})
export class ThingCategory extends JsonModel {
    @HasMany()
    members!: Thing[];
}
