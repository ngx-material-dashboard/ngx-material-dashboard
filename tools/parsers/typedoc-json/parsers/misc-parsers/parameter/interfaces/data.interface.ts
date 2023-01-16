import { TypeParser } from '../../..';
import { CommentParser } from '../../comment';

export interface ParameterParserData {
    /**
     * The identifier of this parser.
     * @since 1.0.0
     */
    id: number;

    /**
     * The name of this parameter.
     * @since 1.0.0
     */
    name: string;

    /**
     * The comment of this parameter.
     * @since 5.3.0
     */
    comment: CommentParser;

    /**
     * The type of this parameter.
     * @since 1.0.0
     */
    type: TypeParser;
}
