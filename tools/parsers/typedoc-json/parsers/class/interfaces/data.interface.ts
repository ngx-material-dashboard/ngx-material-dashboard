import { CommentParser, TypeParameterParser } from '../../misc-parsers';
import { ParserData } from '../../parser';
import { TypeParser } from '../../type-parsers';
import { ClassConstructorParser } from '../class-constructor';
import { ClassMethodParser } from '../class-method';
import { ClassPropertyParser } from '../class-property';

export interface ClassParserData extends ParserData {
    /**
     * The comment parser of this class.
     */
    comment: CommentParser;

    /**
     * Whether this class is external.
     */
    external: boolean;

    /**
     * Whether this class is abstract.
     */
    abstract: boolean;

    /**
     * The `extends` type of this class.
     */
    extendsType: TypeParser | null;

    /**
     * The `implements` type of this class.
     */
    implementsType: TypeParser[];

    /**
     * The type parameter parsers of this class.
     */
    typeParameters: TypeParameterParser[];

    /**
     * The constructor parser of this class.
     */
    construct: ClassConstructorParser;

    /**
     * The property parsers of this class.
     */
    properties: ClassPropertyParser[];

    /**
     * The method parsers of this class.
     */
    methods: ClassMethodParser[];
}
