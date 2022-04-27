import { Attribute, JsonApiModelConfig } from '@ngx-material-dashboard/base-json';
import { JsonModel } from '@ngx-material-dashboard/json/src/lib/models/json.model';
import { BelongsTo } from '@ngx-material-dashboard/json-api/src/lib/decorators/belongs-to.decorator';
import { Paragraph } from './paragraph.model';

@JsonApiModelConfig({
    type: 'sentences'
})
export class Sentence extends JsonModel {
    @Attribute()
    content?: string;

    // @BelongsTo()
    // paragraph?: Paragraph;
}
