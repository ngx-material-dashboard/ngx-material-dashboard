import { Json } from '../../../type-parsers';
import { CommentParserJson } from '../../comment';

export interface ParameterParserJson {
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
    comment: CommentParserJson;

    /**
     * The type of this parameter in a Json compatible format.
     * @since 1.0.0
     */
    type: Json;
}
