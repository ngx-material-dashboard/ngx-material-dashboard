import { ThingCategory } from './thingCategory';
import { JsonApiModelConfig } from '@ngx-material-dashboard/base-json';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
import { Attribute } from '@ngx-material-dashboard/json-api/src/lib/decorators/attribute.decorator';
import { HasMany } from '@ngx-material-dashboard/json-api/src/lib/decorators/has-many.decorator';

@JsonApiModelConfig({
  type: 'thing'
})
export class Thing extends JsonApiModel {
  @Attribute()
  name!: string;

  @HasMany()
  categories!: ThingCategory[];
}
