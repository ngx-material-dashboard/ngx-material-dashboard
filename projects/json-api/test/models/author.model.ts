import { JsonApiModelConfig } from '@ngx-material-dashboard/json-api/src/lib/decorators/json-api-model-config.decorator';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
import { Attribute } from '@ngx-material-dashboard/json-api/src/lib/decorators/attribute.decorator';
import { HasMany } from '@ngx-material-dashboard/json-api/src/lib/decorators/has-many.decorator';
import { NestedAttribute } from '@ngx-material-dashboard/json-api/src/lib/decorators/nested-attribute.decorator';
import { JsonModelConverter } from '@ngx-material-dashboard/json-api/src/lib/converters/json-model/json-model.converter';

import { Book } from './book.model';
import { PageMetaData } from './page-meta-data';
import { School } from './school.model';

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

    @HasMany()
    books?: Book[];

    @NestedAttribute({converter: new JsonModelConverter<any>(School)})
    school?: School;
}
