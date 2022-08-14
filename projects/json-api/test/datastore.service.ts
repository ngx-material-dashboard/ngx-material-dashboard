import { HttpClient } from '@angular/common/http';
import { JsonApiDatastoreConfig } from '@ngx-material-dashboard/base-json';

import { JsonApiDatastore } from '@ngx-material-dashboard/json-api/src/lib/services/json-api-datastore.service';
import { Author } from './models/author.model';
import { Book } from './models/book.model';
import { Chapter } from './models/chapter.model';
import { Section } from './models/section.model';
import { Paragraph } from './models/paragraph.model';
import { Sentence } from './models/sentence.model';
import { Category } from './models/category.model';
import { Thing } from './models/thing';
import { ThingCategory } from './models/thingCategory';
import { Injectable } from '@angular/core';

export const BASE_URL = 'http://localhost:8080';
export const API_VERSION = 'v1';

@Injectable()
@JsonApiDatastoreConfig({
    baseUrl: BASE_URL,
    apiVersion: API_VERSION,
    contentType: 'application/vnd.api+json',
    models: {
        authors: Author,
        books: Book,
        chapters: Chapter,
        categories: Category,
        paragraphs: Paragraph,
        sections: Section,
        sentences: Sentence,
        thing: Thing,
        thing_category: ThingCategory
    }
})
export class Datastore extends JsonApiDatastore {
    constructor(http: HttpClient) {
        super(http);
    }
}
