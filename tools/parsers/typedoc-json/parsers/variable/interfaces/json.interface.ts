import { CommentParserJson } from '../../misc-parsers';
import { ParserJson } from '../../parser';
import { Json } from '../../type-parsers';

export interface VariableParserJson extends ParserJson {
    /**
     * The comment parser of this constant.
     * @since 1.0.0
     */
    comment: CommentParserJson;

    /**
     * Whether this variable is external.
     * @since 1.0.0
     */
    external: boolean;

    /**
     * The type of this variable in a Json compatible format.
     * @since 1.0.0
     */
    type: Json;

    /**
     * The value of this variable.
     * @since 1.0.0
     */
    value: string;
}
