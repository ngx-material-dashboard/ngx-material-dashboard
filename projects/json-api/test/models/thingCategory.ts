import { Thing } from './thing';
import { HasMany } from '@ngx-material-dashboard/json-api/src/lib/decorators/has-many.decorator';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
import { JsonApiModelConfig } from '@ngx-material-dashboard/json-api/src/lib/decorators/json-api-model-config.decorator';

@JsonApiModelConfig({
  type: 'thing_category'
})
export class ThingCategory extends JsonApiModel {
  @HasMany()
  members!: Thing[];
}
