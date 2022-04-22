import { JsonApiModelConfig } from '@ngx-material-dashboard/base-json';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
import { Attribute } from '@ngx-material-dashboard/json-api/src/lib/decorators/attribute.decorator';
import { BelongsTo } from '@ngx-material-dashboard/json-api/src/lib/decorators/belongs-to.decorator';
import { Sentence } from './sentence.model';
import { Section } from './section.model';

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
