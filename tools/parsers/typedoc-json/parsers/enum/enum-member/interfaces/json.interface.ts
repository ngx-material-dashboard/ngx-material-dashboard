import { CommentParserJson } from '../../../misc-parsers/comment';
import { ParserJson } from '../../../parser';

export interface EnumMemberParserJson extends ParserJson {
    /**
     * The comment parser of this property.
     * @since 1.0.0
     */
    comment: CommentParserJson;

    /**
     * The id of the parent enum parser.
     * @since 4.0.0
     */
    parentId: number;

    /**
     * The value of this enum property.
     * @since 1.0.0
     */
    value: string;
}
