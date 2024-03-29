import {
    Attribute,
    JsonApiModelConfig
} from '@ngx-material-dashboard/base-json';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
import { BelongsTo } from '@ngx-material-dashboard/json-api/src/lib/decorators/belongs-to.decorator';
import type { Chapter } from './chapter.model';
import type { Paragraph } from './paragraph.model';

@JsonApiModelConfig({
    type: 'sections'
})
export class Section extends JsonApiModel {
    @Attribute()
    content?: string;

    @BelongsTo()
    firstParagraph?: Paragraph;

    @BelongsTo()
    chapter?: Chapter;
}
