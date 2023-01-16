import { TypeParser } from '../../../type-parsers';
import { CommentParser } from '../../comment';
import { ParameterParser } from '../../parameter';
import { TypeParameterParser } from '../../type-parameter';

export interface SignatureParserData {
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
    comment: CommentParser;

    /**
     * The type parameters of this signature.
     * @since 1.0.0
     */
    typeParameters: TypeParameterParser[];

    /**
     * The parameters of this signature.
     * @since 1.0.0
     */
    parameters: ParameterParser[];

    /**
     * The return type of this signature.
     * @since 1.0.0
     */
    returnType: TypeParser;
}
