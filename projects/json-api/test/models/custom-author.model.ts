/* tslint:disable:variable-name */
import type { Book } from './book.model';
import {
    Attribute,
    JsonApiModelConfig
} from '@ngx-material-dashboard/base-json';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
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
