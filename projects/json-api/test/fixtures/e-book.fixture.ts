import { BOOK_PUBLISHED, BOOK_TITLE } from './author.fixture';

export function getSampleEBook(
    i: number,
    authorId: string,
    categoryId: string = '1'
) {
    return {
        id: '' + i,
        type: 'e-books',
        attributes: {
            date_published: BOOK_PUBLISHED,
            title: BOOK_TITLE,
            created_at: '2016-09-26T21:12:41Z',
            updated_at: '2016-09-26T21:12:41Z'
        },
        relationships: {
            chapters: {
                links: {
                    self: '/v1/e-books/1/relationships/chapters',
                    related: '/v1/e-books/1/chapters'
                }
            },
            firstChapter: {
                links: {
                    self: '/v1/e-books/1/relationships/firstChapter',
                    related: '/v1/e-books/1/firstChapter'
                }
            },
            author: {
                links: {
                    self: '/v1/e-books/1/relationships/author',
                    related: '/v1/e-books/1/author'
                },
                data: {
                    id: authorId,
                    type: 'authors'
                }
            },
            category: {
                links: {
                    self: '/v1/e-books/1/relationships/category',
                    related: '/v1/e-books/1/category'
                },
                data: {
                    id: categoryId,
                    type: 'categories'
                }
            }
        },
        links: {
            self: '/v1/e-books/1'
        }
    };
}
