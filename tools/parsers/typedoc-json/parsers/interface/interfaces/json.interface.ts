import { CommentParserJson, TypeParameterParserJson } from '../../misc-parsers';
import { ParserJson } from '../../parser';
import { InterfaceMethodParserJson } from '../interface-method';
import { InterfacePropertyParserJson } from '../interface-property';

export interface InterfaceParserJson extends ParserJson {
    /**
     * The comment parser of this interface.
     * @since 1.0.0
     */
    comment: CommentParserJson;

    /**
     * Whether this interface is external.
     */
    external: boolean;

    /**
     * The type parameters of this interface in a JSON compatible format.
     */
    typeParameters: TypeParameterParserJson[];

    /**
     * The property parsers of this interface in a Json compatible format.
     */
    properties: InterfacePropertyParserJson[];

    /**
     * The method parsers of this interface in a Json compatible format.
     */
    methods: InterfaceMethodParserJson[];
}
