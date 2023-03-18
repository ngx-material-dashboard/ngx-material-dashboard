import {
    Attribute,
    JsonApiModelConfig
} from '@ngx-material-dashboard/base-json';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
import { BelongsTo } from '@ngx-material-dashboard/json-api/src/lib/decorators/belongs-to.decorator';
import type { Sentence } from './sentence.model';
import type { Section } from './section.model';

@JsonApiModelConfig({
    type: 'paragraphs'
})
export class Paragraph extends JsonApiModel {
    @Attribute()
    content?: string;

    @BelongsTo()
    section?: Section;

    @BelongsTo()
    firstSentence?: Sentence;
}
