/* tslint:disable:variable-name */
import { Book } from './book.model';
import { JsonApiModelConfig } from '@ngx-material-dashboard/json-api/src/lib/decorators/json-api-model-config.decorator';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
import { Attribute } from '@ngx-material-dashboard/json-api/src/lib/decorators/attribute.decorator';
import { HasMany } from '@ngx-material-dashboard/json-api/src/lib/decorators/has-many.decorator';
import { PageMetaData } from './page-meta-data';

export const AUTHOR_API_VERSION = 'v3';
export const AUTHOR_MODEL_ENDPOINT_URL = 'custom-author';

@JsonApiModelConfig({
  apiVersion: AUTHOR_API_VERSION,
  modelEndpointUrl: AUTHOR_MODEL_ENDPOINT_URL,
  type: 'authors',
  meta: PageMetaData
})
export class CustomAuthor extends JsonApiModel {
  @Attribute()
  name?: string;

  @Attribute()
  date_of_birth?: Date;

  @Attribute()
  date_of_death?: Date;

  @Attribute()
  created_at?: Date;

  @Attribute()
  updated_at?: Date;

  @HasMany()
  books?: Book[];
}
