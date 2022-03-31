/* tslint:disable:variable-name */
import { Book } from './book.model';
import { JsonApiModelConfig } from '@ngx-material-dashboard/json-api/src/lib/decorators/json-api-model-config.decorator';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
import { Attribute } from '@ngx-material-dashboard/json-api/src/lib/decorators/attribute.decorator';
import { HasMany } from '@ngx-material-dashboard/json-api/src/lib/decorators/has-many.decorator';

@JsonApiModelConfig({
  type: 'categories'
})
export class Category extends JsonApiModel {

    @Attribute()
    name?: string;

    @Attribute()
    created_at?: Date;

    @Attribute()
    updated_at?: Date;

    @HasMany()
    books?: Book[];
}
