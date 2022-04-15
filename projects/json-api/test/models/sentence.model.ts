import { JsonApiModelConfig } from '@ngx-material-dashboard/json-api/src/lib/decorators/json-api-model-config.decorator';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
import { Attribute } from '@ngx-material-dashboard/json-api/src/lib/decorators/attribute.decorator';
import { BelongsTo } from '@ngx-material-dashboard/json-api/src/lib/decorators/belongs-to.decorator';
import { Paragraph } from './paragraph.model';

@JsonApiModelConfig({
    type: 'sentences'
})
export class Sentence extends JsonApiModel {
    @Attribute()
    content?: string;

    @BelongsTo()
    paragraph?: Paragraph;
}