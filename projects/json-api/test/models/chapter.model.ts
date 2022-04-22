/* tslint:disable:variable-name */
import { Book } from './book.model';
import { JsonApiModelConfig } from '@ngx-material-dashboard/base-json';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
import { Attribute } from '@ngx-material-dashboard/json-api/src/lib/decorators/attribute.decorator';
import { BelongsTo } from '@ngx-material-dashboard/json-api/src/lib/decorators/belongs-to.decorator';
import { Section } from './section.model';

@JsonApiModelConfig({
  type: 'chapters'
})
export class Chapter extends JsonApiModel {

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
