import { CommentParserJson, TypeParameterParserJson } from '../../misc-parsers';
import { ParserJson } from '../../parser';
import { Json } from '../../type-parsers';
import { ClassConstructorParserJson } from '../class-constructor';
import { ClassMethodParserJson } from '../class-method';
import { ClassPropertyParserJson } from '../class-property';

export interface ClassParserJson extends ParserJson {
    /**
     * The comment parser of this class.
     * @since 1.0.0
     */
    comment: CommentParserJson;

    /**
     * Whether this class is external.
     * @since 1.0.0
     */
    external: boolean;

    /**
     * Whether this class is abstract.
     * @since 1.0.0
     */
    abstract: boolean;

    /**
     * The `extends` type of this class in a Json compatible format.
     * @since 1.0.0
     */
    extendsType: Json | null;

    /**
     * The `implements` type of this class in a Json compatible format.
     * @since 1.0.0
     */
    implementsType: Json[];

    /**
     * The type parameter parsers of this class in a Json compatible format.
     * @since 6.0.0
     */
    typeParameters: TypeParameterParserJson[];

    /**
     * The constructor parser of this class in a Json compatible format.
     * @since 1.0.0
     */
    construct: ClassConstructorParserJson;

    /**
     * The property parsers of this class in a Json compatible format.
     * @since 1.0.0
     */
    properties: ClassPropertyParserJson[];

    /**
     * The method parsers of this class in a Json compatible format.
     * @since 1.0.0
     */
    methods: ClassMethodParserJson[];
}
