import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { parseISO } from 'date-fns';

import { Datastore } from '@ngx-material-dashboard/json/test/datastore.service';
import { Author } from '@ngx-material-dashboard/json/test/models/author.model';

describe('JsonModel', () => {

    let datastore: Datastore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                {
                    provide: Datastore,
                    deps: [HttpClient]
                }
            ]
        });

        datastore = TestBed.inject(Datastore);
    });

    describe('constructor', () => {

        it('should be instantiated with attributes', () => {
            const DATA = {
                id: '1',
                name: 'Daniele',
                surname: 'Ghidoli',
                date_of_birth: new Date(1987, 4, 25),
                // school: {name: 'Massachusetts Institute of Technology', students: 11319, foundation: new Date(1861, 9, 4)}
            };
            const author: Author = new Author(datastore, DATA);
            expect(author).toBeDefined();
            expect(author.id).toBe('1');
            expect(author.name).toBe('Daniele');
            if (author.date_of_birth ) {
                expect(author.date_of_birth.getTime()).toBe(parseISO('1987-05-25').getTime());
            }
            // if (author.school && author.school.foundation) {
            //     expect(author.school.name).toBe('Massachusetts Institute of Technology');
            //     expect(author.school.students).toBe(11319);
            //     expect(author.school.foundation.getTime()).toBe(parseISO('1861-10-04').getTime());
            // }
        });

        it('should be instantiated without attributes', () => {
            const author: Author = new Author(datastore);
            expect(author).toBeDefined();
            expect(author.id).toBeUndefined();
            expect(author.date_of_birth).toBeUndefined();
        });

    });
});
