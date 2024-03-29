/* tslint:disable:variable-name */
import type { Book } from './book.model';
import {
    Attribute,
    JsonApiModelConfig
} from '@ngx-material-dashboard/base-json';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
import { BelongsTo } from '@ngx-material-dashboard/json-api/src/lib/decorators/belongs-to.decorator';
import type { Section } from './section.model';

@JsonApiModelConfig({
    type: 'e-chapters'
})
export class EChapter extends JsonApiModel {
    @Attribute()
    title?: string;

    @Attribute()
    ordering?: number;

    @Attribute()
    created_at?: Date;

    @Attribute()
    updated_at?: Date;

    @BelongsTo()
    book?: Book;

    @BelongsTo()
    firstSection?: Section;
}
