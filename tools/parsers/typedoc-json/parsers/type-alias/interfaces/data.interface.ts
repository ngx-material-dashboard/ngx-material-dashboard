import { CommentParser, TypeParameterParser } from '../../misc-parsers';
import { ParserData } from '../../parser';
import { TypeParser } from '../../type-parsers';

export interface TypeAliasParserData extends ParserData {
    /**
     * The comment parser of this type alias.
     * @since 1.0.0
     */
    comment: CommentParser;

    /**
     * Whether this type alias is external.
     * @since 1.0.0
     */
    external: boolean;

    /**
     * The type parameters of this type alias.
     * @since 1.0.0
     */
    typeParameters: TypeParameterParser[];

    /**
     * The type of this type alias.
     * @since 1.0.0
     */
    type: TypeParser;
}
