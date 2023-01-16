import { CommentParserJson } from '../../misc-parsers';
import { ParserJson } from '../../parser';
import { EnumMemberParserJson } from '../enum-member';

export interface EnumParserJson extends ParserJson {
    /**
     * The comment parser of this enum.
     */
    comment: CommentParserJson;

    /**
     * Whether this enum is external.
     */
    external: boolean;

    /**
     * The property parsers of this enum in a Json compatible format.
     */
    members: EnumMemberParserJson[];
}
