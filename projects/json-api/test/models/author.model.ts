import {
    Attribute,
    JsonApiModelConfig,
    JsonModelConverter,
    NestedAttribute
} from '@ngx-material-dashboard/base-json';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
import { HasMany } from '@ngx-material-dashboard/json-api/src/lib/decorators/has-many.decorator';

import type { Book } from './book.model';
import { PageMetaData } from './page-meta-data';
import { School } from './school.model';
import { EBook } from './e-book.model';

@JsonApiModelConfig({
    type: 'authors',
    meta: PageMetaData
})
export class Author extends JsonApiModel {
    @Attribute()
    name?: string;

    @Attribute({
        serializedName: 'dob'
    })
    date_of_birth?: Date;

    @Attribute()
    created_at?: Date;

    @Attribute()
    updated_at?: Date;

    @Attribute()
    firstNames?: string[];

    @Attribute()
    surname?: string;

    @HasMany()
    books?: Book[];

    @HasMany()
    ebooks?: EBook[];

    @NestedAttribute({ converter: new JsonModelConverter<any>(School) })
    school?: School;
}
