/* tslint:disable:variable-name */
import { Book } from './book.model';
import {
    Attribute,
    JsonApiModelConfig
} from '@ngx-material-dashboard/base-json';
import { JsonModel } from '@ngx-material-dashboard/json/src/lib/models/json.model';

@JsonApiModelConfig({
    type: 'categories'
})
export class Category extends JsonModel {
    @Attribute()
    name?: string;

    @Attribute()
    created_at?: Date;

    @Attribute()
    updated_at?: Date;

    // @HasMany()
    // books?: Book[];
}
