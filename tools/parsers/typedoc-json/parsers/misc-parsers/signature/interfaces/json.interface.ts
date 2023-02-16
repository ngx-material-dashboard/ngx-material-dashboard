import { TypeParameterParser, ParameterParser } from 'typedoc-json-parser';
import { Json } from '../../../type-parsers';
import { CommentParserJson } from '../../comment';

export interface SignatureParserJson {
    /**
     * The identifier of this parser.
     * @since 1.0.0
     */
    id: number;

    /**
     * The name of this signature.
     * @since 1.0.0
     */
    name: string;

    /**
     * The comment of this signature.
     * @since 2.3.0
     */
    comment: CommentParserJson;

    /**
     * The type parameters of this signature in a Json compatible format.
     * @since 1.0.0
     */
    typeParameters: TypeParameterParser.Json[];

    /**
     * The parameters of this signature in a Json compatible format.
     * @since 1.0.0
     */
    parameters: ParameterParser.Json[];

    /**
     * The return type of this signature in a Json compatible format.
     * @since 1.0.0
     */
    returnType: Json;
}
