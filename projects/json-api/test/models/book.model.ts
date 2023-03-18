/* tslint:disable:variable-name */
import type { Chapter } from './chapter.model';
import type { Author } from './author.model';
import type { Category } from './category.model';
import {
    Attribute,
    JsonApiModelConfig
} from '@ngx-material-dashboard/base-json';
import { JsonApiModel } from '@ngx-material-dashboard/json-api/src/lib/models/json-api.model';
import { HasMany } from '@ngx-material-dashboard/json-api/src/lib/decorators/has-many.decorator';
import { BelongsTo } from '@ngx-material-dashboard/json-api/src/lib/decorators/belongs-to.decorator';
import { EChapter } from './e-chapter.model';

@JsonApiModelConfig({
    type: 'books'
})
export class Book extends JsonApiModel {
    @Attribute()
    title?: string;

    @Attribute()
    date_published?: Date;

    @Attribute()
    created_at?: Date;

    @Attribute()
    updated_at?: Date;

    @HasMany()
    chapters?: Chapter[];

    @HasMany({ key: 'important-chapters' })
    importantChapters?: Chapter[];

    @BelongsTo({ key: 'first-chapter' })
    firstChapter?: Chapter;

    @BelongsTo({ key: 'first-e-chapter' })
    firstEChapter?: EChapter;

    @BelongsTo()
    author?: Author;

    @BelongsTo()
    category?: Category;
}
