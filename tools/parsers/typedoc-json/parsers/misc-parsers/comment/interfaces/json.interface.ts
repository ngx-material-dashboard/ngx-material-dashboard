import { CommentParser } from 'typedoc-json-parser';

export interface CommentParserJson extends CommentParser.Json {
    /** The list of overviewDetails included in the comment. */
    overviewDetails: CommentParser.BlockTag[];
    /** The type of return value defined in comment. */
    returns?: string;
    /** The first paragraph in the comment. */
    shortText?: string;
    /** Any additional paragraphs after the shortText. */
    text?: string;
    usageNotes: CommentParser.BlockTag[];
}
