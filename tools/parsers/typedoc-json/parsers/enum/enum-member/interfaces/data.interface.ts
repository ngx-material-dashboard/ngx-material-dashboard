import { CommentParser } from '../../../misc-parsers/comment';
import { ParserData } from '../../../parser';

export interface EnumMemberParserData extends ParserData {
    /**
     * The comment parser of this property.
     */
    comment: CommentParser;

    /**
     * The id of the parent enum parser.
     */
    parentId: number;

    /**
     * The value of this enum property.
     */
    value: string;
}
