import { CommentParser, TypeParameterParser } from '../../misc-parsers';
import { ParserData } from '../../parser';
import { InterfaceMethodParser } from '../interface-method';
import { InterfacePropertyParser } from '../interface-property';

export interface InterfaceParserData extends ParserData {
    /**
     * The comment parser of this interface.
     */
    comment: CommentParser;

    /**
     * Whether this interface is external.
     */
    external: boolean;

    /**
     * The type parameters of this interface.
     */
    typeParameters: TypeParameterParser[];

    /**
     * The property parsers of this interface.
     */
    properties: InterfacePropertyParser[];

    /**
     * The method parsers of this interface.
     */
    methods: InterfaceMethodParser[];
}
