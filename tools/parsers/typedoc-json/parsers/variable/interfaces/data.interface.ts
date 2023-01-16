import { CommentParser } from '../../misc-parsers';
import { ParserData } from '../../parser';
import { TypeParser } from '../../type-parsers';

export interface VariableParserData extends ParserData {
    /**
     * The comment parser of this variable.
     * @since 1.0.0
     */
    comment: CommentParser;

    /**
     * Whether this variable is external.
     * @since 1.0.0
     */
    external: boolean;

    /**
     * The type of this variable.
     * @since 1.0.0
     */
    type: TypeParser;

    /**
     * The value of this variable.
     * @since 1.0.0
     */
    value: string;
}
