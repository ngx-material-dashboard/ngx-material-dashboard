import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { parseISO } from 'date-fns';

import { Datastore } from '@ngx-material-dashboard/json-api/test/datastore.service';
import { Author } from '@ngx-material-dashboard/json-api/test/models/author.model';
import { AUTHOR_ID, BOOK_PUBLISHED, BOOK_TITLE, CHAPTER_TITLE, getAuthorData, getIncludedBooks } from '@ngx-material-dashboard/json-api/test/fixtures/author.fixture';
import { Book } from '@ngx-material-dashboard/json-api/test/models/book.model';
import { Chapter } from '@ngx-material-dashboard/json-api/test/models/chapter.model';

describe('JsonApiModel', () => {
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
                attributes: {
                    name: 'Daniele',
                    surname: 'Ghidoli',
                    date_of_birth: new Date(1987, 4, 25),
                    school: {name: 'Massachusetts Institute of Technology', students: 11319, foundation: new Date(1861, 9, 4)}
                }
            };
            const author: Author = new Author(datastore, DATA);
            expect(author).toBeDefined();
            expect(author.id).toBe('1');
            expect(author.name).toBe('Daniele');
            if (author.date_of_birth ) {
                expect(author.date_of_birth.getTime()).toBe(parseISO('1987-05-25').getTime());
            }
            if (author.school && author.school.foundation) {
                expect(author.school.name).toBe('Massachusetts Institute of Technology');
                expect(author.school.students).toBe(11319);
                expect(author.school.foundation.getTime()).toBe(parseISO('1861-10-04').getTime());
            }
        });

        it('should be instantiated without attributes', () => {
            const author: Author = new Author(datastore);
            expect(author).toBeDefined();
            expect(author.id).toBeUndefined();
            expect(author.date_of_birth).toBeUndefined();
        });

    });

    xdescribe('hasDirtyAttributes', () => {

        it('should be instantiated with attributes', () => {
            const DATA = {
                id: '1',
                attributes: {
                    name: 'Daniele',
                    surname: 'Ghidoli',
                    date_of_birth: '1987-05-25'
                }
            };
            const author: Author = new Author(datastore, DATA);
            expect(author.hasDirtyAttributes).toBeFalsy();
        });

        it('should have dirty attributes after change', () => {
            const author: Author = new Author(datastore);
            expect(author.hasDirtyAttributes).toBeFalsy();
            author.name = 'Peter';
            expect(author.hasDirtyAttributes).toBeTruthy();
        });

        it('should reset dirty attributes', () => {
            const DATA = {
                id: '1',
                attributes: {
                    name: 'Daniele',
                    surname: 'Ghidoli',
                    date_of_birth: '1987-05-25'
                }
            };
            const author: Author = new Author(datastore, DATA);
            author.name = 'Peter';
            author.rollbackAttributes();
            expect(author.hasDirtyAttributes).toBeFalsy();
            expect(author.name).toContain(DATA.attributes.name);
        });

    });

    describe('syncRelationships', () => {

        let author: Author;

        it('should return the object when there is no relationship included', () => {
            author = new Author(datastore, getAuthorData());
            expect(author).toBeDefined();
            expect(author.id).toBe(AUTHOR_ID);
            expect(author.books).toBeUndefined();
        });

        describe('parseHasMany', () => {

            it('should return the parsed relationships when one is included', () => {
                const BOOK_NUMBER = 4;
                const DATA = getAuthorData('books', BOOK_NUMBER);
                author = new Author(datastore, DATA);
                author.syncRelationships(DATA, getIncludedBooks(BOOK_NUMBER));
                expect(author).toBeDefined();
                expect(author.id).toBe(AUTHOR_ID);
                expect(author.books).toBeDefined();
                if (author.books) {
                    expect(author.books.length).toBe(BOOK_NUMBER);
                    author.books.forEach((book: Book, index: number) => {
                        expect(book instanceof Book).toBeTruthy();
                        if (book.id) {
                            expect(+book.id).toBe(index + 1);
                        }
                        expect(book.title).toBe(BOOK_TITLE);
                        if (book.date_published) {
                            expect(book.date_published.valueOf()).toBe(parseISO(BOOK_PUBLISHED).valueOf());
                        }
                    });
                }
            });

            it('should return an empty array for hasMany relationship when one is included without any elements', () => {
                const BOOK_NUMBER = 0;
                const DATA = getAuthorData('books', BOOK_NUMBER);
                author = new Author(datastore, DATA);
                author.syncRelationships(DATA, getIncludedBooks(BOOK_NUMBER));

                expect(author).toBeDefined();
                expect(author.id).toBe(AUTHOR_ID);
                expect(author.books).toBeDefined();
                if (author.books) {
                    expect(author.books.length).toBe(BOOK_NUMBER);
                }
            });

            it('should parse infinite levels of relationships by reference', () => {
                const BOOK_NUMBER = 4;
                const DATA = getAuthorData('books', BOOK_NUMBER);
                author = new Author(datastore, DATA);
                datastore.addToStore(author);
                author.syncRelationships(DATA, getIncludedBooks(BOOK_NUMBER));
                if (author.books) {
                    author.books.forEach((book: Book, index: number) => {
                        expect(book.author).toBeDefined();
                        expect(book.author).toEqual(author);
                        if (book.author && book.author.books && author.books) {
                            expect(book.author.books[index]).toEqual(author.books[index]);
                        }
                    });
                }
            });

            it('should parse relationships included in more than one resource', () => {
                const BOOK_NUMBER = 4;
                const REL = 'books.category.books';
                const DATA = getAuthorData(REL, BOOK_NUMBER);
                author = new Author(datastore, DATA);
                author.syncRelationships(DATA, getIncludedBooks(BOOK_NUMBER, REL));
                if (author.books) {
                    author.books.forEach((book: Book) => {
                        expect(book.category).toBeDefined();
                        if (book.category && book.category.books) {
                            expect(book.category.books.length).toBe(BOOK_NUMBER);
                        }
                    });
                }
            });

            it('should return the parsed relationships when two nested ones are included', () => {
                const REL = 'books,books.chapters';
                const BOOK_NUMBER = 2;
                const CHAPTERS_NUMBER = 4;
                const DATA = getAuthorData(REL, BOOK_NUMBER);
                const INCLUDED = getIncludedBooks(BOOK_NUMBER, REL, CHAPTERS_NUMBER);
                author = new Author(datastore, DATA);
                author.syncRelationships(DATA, INCLUDED);
                expect(author).toBeDefined();
                expect(author.id).toBe(AUTHOR_ID);
                expect(author.books).toBeDefined();
                if (author.books) {
                    expect(author.books.length).toBe(BOOK_NUMBER);
                    author.books.forEach((book: Book, index: number) => {
                        expect(book instanceof Book).toBeTruthy();
                        if (book.id) {
                            expect(+book.id).toBe(index + 1);
                        }
                        expect(book.title).toBe(BOOK_TITLE);
                        if (book.date_published) {
                            expect(book.date_published.valueOf()).toBe(parseISO(BOOK_PUBLISHED).valueOf());
                        }
                        expect(book.chapters).toBeDefined();
                        if (book.chapters) {
                            expect(book.chapters.length).toBe(CHAPTERS_NUMBER);
                            book.chapters.forEach((chapter: Chapter, cindex: number) => {
                                expect(chapter instanceof Chapter).toBeTruthy();
                                expect(chapter.title).toBe(CHAPTER_TITLE);
                                expect(chapter.book).toEqual(book);
                            });
                        }
                    });
                }
            });

            describe('update relationships', () => {
                it('should return updated relationship', () => {
                    const REL = 'books';
                    const BOOK_NUMBER = 1;
                    const CHAPTERS_NUMBER = 4;
                    const DATA = getAuthorData(REL, BOOK_NUMBER);
                    const INCLUDED = getIncludedBooks(BOOK_NUMBER);
                    const NEW_BOOK_TITLE = 'The Hobbit';
                    author = new Author(datastore, DATA);
                    author.syncRelationships(DATA, INCLUDED);
                    const newIncluded = INCLUDED.concat([]);
                    newIncluded.forEach((model) => {
                        if (model.type === 'books') {
                            model.attributes.title = NEW_BOOK_TITLE;
                        }
                    });
                    author.syncRelationships(DATA, newIncluded);
                    if (author.books) {
                        author.books.forEach((book) => {
                            expect(book.title).toBe(NEW_BOOK_TITLE);
                        });
                    }
                });
            });
        });

        describe('parseBelongsTo', () => {
            it('should parse the first level of belongsTo relationships', () => {
                const REL = 'books';
                const BOOK_NUMBER = 2;
                const CHAPTERS_NUMBER = 4;
                const DATA = getAuthorData(REL, BOOK_NUMBER);
                const INCLUDED = getIncludedBooks(BOOK_NUMBER, 'books.chapters,books.firstChapter', 5);

                author = new Author(datastore, DATA);
                author.syncRelationships(DATA, INCLUDED);

                if (author.books) {
                    expect(author.books[0].firstChapter).toBeDefined();
                }
            });

            it('should parse the second level of belongsTo relationships', () => {
                const REL = 'books';
                const BOOK_NUMBER = 2;
                const CHAPTERS_NUMBER = 4;
                const DATA = getAuthorData(REL, BOOK_NUMBER);
                const INCLUDED = getIncludedBooks(
                    BOOK_NUMBER,
                    'books.chapters,books.firstChapter,books.firstChapter.firstSection',
                    5
                );

                author = new Author(datastore, DATA);
                author.syncRelationships(DATA, INCLUDED);
                
                if (author.books && author.books[0].firstChapter) {
                    expect(author.books[0].firstChapter.firstSection).toBeDefined();
                }
            });

            it('should parse the third level of belongsTo relationships', () => {
                const REL = 'books';
                const BOOK_NUMBER = 2;
                const CHAPTERS_NUMBER = 4;
                const DATA = getAuthorData(REL, BOOK_NUMBER);
                const INCLUDED = getIncludedBooks(
                    BOOK_NUMBER,
                    // tslint:disable-next-line:max-line-length
                    'books.chapters,books.firstChapter,books.firstChapter.firstSection,books.firstChapter.firstSection.firstParagraph',
                    5
                );

                author = new Author(datastore, DATA);
                author.syncRelationships(DATA, INCLUDED);

                if (author.books && author.books[0].firstChapter && author.books[0].firstChapter.firstSection) {
                    expect(author.books[0].firstChapter.firstSection.firstParagraph).toBeDefined();
                }
            });

            it('should parse the fourth level of belongsTo relationships', () => {
                const REL = 'books';
                const BOOK_NUMBER = 2;
                const CHAPTERS_NUMBER = 4;
                const DATA = getAuthorData(REL, BOOK_NUMBER);
                const INCLUDED = getIncludedBooks(
                    BOOK_NUMBER,
                    // tslint:disable-next-line:max-line-length
                    'books.chapters,books.firstChapter,books.firstChapter.firstSection,books.firstChapter.firstSection.firstParagraph,books.firstChapter.firstSection.firstParagraph.firstSentence',
                    5
                );

                author = new Author(datastore, DATA);
                author.syncRelationships(DATA, INCLUDED);
                
                if (author.books && author.books[0].firstChapter && author.books[0].firstChapter.firstSection && author.books[0].firstChapter.firstSection.firstParagraph) {
                    expect(author.books[0].firstChapter.firstSection.firstParagraph.firstSentence).toBeDefined();
                }
            });
        });
    });

    xdescribe('hasDirtyAttributes & rollbackAttributes', () => {

        const author = new Author(
            datastore,
            {
                id: '1',
                attributes: {
                    name: 'Daniele'
                }
            }
        );

        it('should return that has dirty attributes', () => {
            author.name = 'New Name';
            expect(author.hasDirtyAttributes).toBeTruthy();
        });

        it('should to rollback to the initial author name', () => {
            author.rollbackAttributes();
            expect(author.name).toEqual('Daniele');
            expect(author.hasDirtyAttributes).toBeFalsy();
        });
    });
});
