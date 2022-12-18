/* tslint:disable:variable-name */
import { Book } from './book.model';
import {
    Attribute,
    JsonApiModelConfig
} from '@ngx-material-dashboard/base-json';
import { JsonModel } from '@ngx-material-dashboard/json/src/lib/models/json.model';
import { BelongsTo } from '@ngx-material-dashboard/json-api/src/lib/decorators/belongs-to.decorator';
import { Section } from './section.model';

@JsonApiModelConfig({
    type: 'chapters'
})
export class Chapter extends JsonModel {
    @Attribute()
    title?: string;

    @Attribute()
    ordering?: number;

    @Attribute()
    created_at?: Date;

    @Attribute()
    updated_at?: Date;

    //   @BelongsTo()
    //   book?: Book;

    //   @BelongsTo()
    //   firstSection?: Section;
}
