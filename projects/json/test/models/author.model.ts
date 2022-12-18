import {
    Attribute,
    JsonApiModelConfig,
    JsonModelConverter,
    NestedAttribute
} from '@ngx-material-dashboard/base-json';
import { JsonModel } from '@ngx-material-dashboard/json/src/lib/models/json.model';

import { PageMetaData } from './page-meta-data';
import { School } from './school.model';

@JsonApiModelConfig({
    type: 'authors',
    meta: PageMetaData
})
export class Author extends JsonModel {
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

    // @HasMany()
    // books?: Book[];

    @NestedAttribute({ converter: new JsonModelConverter<any>(School) })
    school?: School;
}
