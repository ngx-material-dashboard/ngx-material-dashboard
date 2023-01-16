import { CommentParserJson, TypeParameterParserJson } from '../../misc-parsers';
import { ParserJson } from '../../parser';
import { Json } from '../../type-parsers';

export interface TypeAliasParserJson extends ParserJson {
    /**
     * The comment parser of this type alias.
     * @since 1.0.0
     */
    comment: CommentParserJson;

    /**
     * Whether this type alias is external.
     * @since 1.0.0
     */
    external: boolean;

    /**
     * The type parameters of this type alias in a Json compatible format.
     * @since 1.0.0
     */
    typeParameters: TypeParameterParserJson[];

    /**
     * The type of this type alias in a Json compatible format.
     */
    type: Json;
}
