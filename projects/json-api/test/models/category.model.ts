/* tslint:disable:variable-name */
import type { Book } from './book.model';
import {
    Attribute,
    JsonApiModelConfig
} from '@ngx-material-dashboard/base-json';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
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
