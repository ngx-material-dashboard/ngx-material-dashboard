import { Json } from '../../../type-parsers';

export interface TypeParameterParserJson {
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
     * The constraint of this type parameter in a Json compatible format.
     * @since 1.0.0
     */
    constraint: Json | null;

    /**
     * The default value of this type parameter in a Json compatible format.
     * @since 1.0.0
     */
    default: Json | null;
}
