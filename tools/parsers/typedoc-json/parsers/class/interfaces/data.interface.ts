import { ClassParser } from 'typedoc-json-parser';
import { CommentParser } from '../../misc-parsers';
import { ParserData } from '../../parser';

export interface ClassParserData extends ClassParser.Data {
    /**
     * The comment parser of this class.
     */
    comment: CommentParser;
}
