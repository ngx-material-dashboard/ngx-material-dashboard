import { TypeParser } from '../../../type-parsers';

export interface TypeParameterParserData {
    /**
     * The identifier of this parser.
     * @since 1.0.0
     */
    id: number;

    /**
     * The name of this type parameter.
     * @since 1.0.0
     */
    name: string;

    /**
     * The constraint of this type parameter.
     * @since 1.0.0
     */
    constraint: TypeParser | null;

    /**
     * The default value of this type parameter.
     * @since 1.0.0
     */
    default: TypeParser | null;
}
