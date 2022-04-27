import { Attribute, JsonApiModelConfig } from '@ngx-material-dashboard/base-json';
import { JsonModel } from '@ngx-material-dashboard/json/src/lib/models/json.model';
import { BelongsTo } from '@ngx-material-dashboard/json-api/src/lib/decorators/belongs-to.decorator';
import { Sentence } from './sentence.model';
import { Section } from './section.model';

@JsonApiModelConfig({
    type: 'paragraphs'
})
export class Paragraph extends JsonModel {
    @Attribute()
    content?: string;

    // @BelongsTo()
    // section?: Section;

    // @BelongsTo()
    // firstSentence?: Sentence;
}
