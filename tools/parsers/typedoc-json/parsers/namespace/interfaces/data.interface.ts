import { ClassParser } from '../../class';
import { EnumParser } from '../../enum';
import { FunctionParser } from '../../function';
import { InterfaceParser } from '../../interface';
import { CommentParser } from '../../misc-parsers';
import { ParserData } from '../../parser';
import { TypeAliasParser } from '../../type-alias';
import { VariableParser } from '../../variable';
import { NamespaceParser } from '../namespace.parser';

export interface NamespaceParserData extends ParserData {
    /**
     * The comment parser of this namespace.
     * @since 1.0.0
     */
    comment: CommentParser;

    /**
     * Whether this namespace is external.
     * @since 1.0.0
     */
    external: boolean;

    /**
     * The class parsers of this namespace.
     * @since 1.0.0
     */
    classes: ClassParser[];

    /**
     * The enum parsers of this namespace.
     * @since 1.0.0
     */
    enums: EnumParser[];

    /**
     * The function parsers of this namespace.
     * @since 1.0.0
     */
    functions: FunctionParser[];

    /**
     * The interface parsers of this namespace.
     * @since 1.0.0
     */
    interfaces: InterfaceParser[];

    /**
     * The namespace parsers of this namespace.
     * @since 1.0.0
     */
    namespaces: NamespaceParser[];

    /**
     * The type alias parsers of this namespace.
     * @since 1.0.0
     */
    typeAliases: TypeAliasParser[];

    /**
     * The variable parsers of this namespace.
     * @since 1.0.0
     */
    variables: VariableParser[];
}
