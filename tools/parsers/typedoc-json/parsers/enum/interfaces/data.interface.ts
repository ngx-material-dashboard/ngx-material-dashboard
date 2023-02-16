import { EnumParser } from 'typedoc-json-parser';
import { CommentParser } from '../../misc-parsers';

export interface EnumParserData extends EnumParser.Data {
    /**
     * The comment parser of this enum.
     * @since 1.0.0
     */
    comment: CommentParser;
}
