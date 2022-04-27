/* tslint:disable:variable-name */
import { Chapter } from './chapter.model';
import { Author } from './author.model';
import { Category } from './category.model';
import { Attribute, JsonApiModelConfig } from '@ngx-material-dashboard/base-json';
import { JsonModel } from '@ngx-material-dashboard/json/src/lib/models/json.model';
import { HasMany } from '@ngx-material-dashboard/json-api/src/lib/decorators/has-many.decorator';
import { BelongsTo } from '@ngx-material-dashboard/json-api/src/lib/decorators/belongs-to.decorator';

@JsonApiModelConfig({
  type: 'books'
})
export class Book extends JsonModel {

    @Attribute()
    title?: string;

    @Attribute()
    date_published?: Date;

    @Attribute()
    created_at?: Date;

    @Attribute()
    updated_at?: Date;

    // @HasMany()
    // chapters?: Chapter[];

    // @HasMany({key: 'important-chapters'})
    // importantChapters?: Chapter[];

    // @BelongsTo({key: 'first-chapter'})
    // firstChapter?: Chapter;

    // @BelongsTo()
    // author?: Author;

    // @BelongsTo()
    // category?: Category;
}
