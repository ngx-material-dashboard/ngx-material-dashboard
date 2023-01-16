import { CommentParser } from '../../misc-parsers';
import { ParserData } from '../../parser';
import { EnumMemberParser } from '../enum-member';

export interface EnumParserData extends ParserData {
    /**
     * The comment parser of this enum.
     * @since 1.0.0
     */
    comment: CommentParser;

    /**
     * Whether this enum is external.
     * @since 1.0.0
     */
    external: boolean;

    /**
     * The property parsers of this enum.
     * @since 1.0.0
     */
    members: EnumMemberParser[];
}
