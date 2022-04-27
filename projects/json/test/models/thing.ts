import { ThingCategory } from './thingCategory';
import { Attribute, JsonApiModelConfig } from '@ngx-material-dashboard/base-json';
import { JsonModel } from '@ngx-material-dashboard/json/src/lib/models/json.model';
import { HasMany } from '@ngx-material-dashboard/json-api/src/lib/decorators/has-many.decorator';

@JsonApiModelConfig({
  type: 'thing'
})
export class Thing extends JsonModel {
  @Attribute()
  name!: string;

//   @HasMany()
//   categories!: ThingCategory[];
}
