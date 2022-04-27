import { HttpClient } from '@angular/common/http';
import { DatastoreConfig, JsonApiDatastoreConfig } from '@ngx-material-dashboard/base-json';

import { JsonDatastore } from '@ngx-material-dashboard/json/src/lib/services/json-datastore.service';
import { Author } from './models/author.model';
import { Book } from './models/book.model';
import { Chapter } from './models/chapter.model';
import { Section } from './models/section.model';
import { Paragraph } from './models/paragraph.model';
import { Sentence } from './models/sentence.model';

const BASE_URL = 'http://localhost:8080';
const API_VERSION = 'v1';

export const BASE_URL_FROM_CONFIG = 'http://localhost:8888';
export const API_VERSION_FROM_CONFIG = 'v2';

@JsonApiDatastoreConfig({
    baseUrl: BASE_URL,
    apiVersion: API_VERSION,
    models: {
        authors: Author,
        books: Book,
        chapters: Chapter,
        paragraphs: Paragraph,
        sections: Section,
        sentences: Sentence
    }
})
export class DatastoreWithConfig extends JsonDatastore {
    protected override config: DatastoreConfig = {
        baseUrl: BASE_URL_FROM_CONFIG,
        apiVersion: API_VERSION_FROM_CONFIG
    };

    constructor(http: HttpClient) {
        super(http);
    }
}
