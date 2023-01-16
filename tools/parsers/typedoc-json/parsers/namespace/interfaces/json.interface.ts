import { ClassParserJson } from '../../class';
import { EnumParserJson } from '../../enum';
import { FunctionParserJson } from '../../function';
import { InterfaceParserJson } from '../../interface';
import { CommentParserJson } from '../../misc-parsers';
import { ParserJson } from '../../parser';
import { TypeAliasParserJson } from '../../type-alias';
import { VariableParserJson } from '../../variable';

export interface NamespaceParserJson extends ParserJson {
    /**
     * The comment parser of this namespace.
     */
    comment: CommentParserJson;

    /**
     * Whether this namespace is external.
     */
    external: boolean;

    /**
     * The class parsers of this namespace in a Json compatible format.
     */
    classes: ClassParserJson[];

    /**
     * The enum parsers of this namespace in a Json compatible format.
     */
    enums: EnumParserJson[];

    /**
     * The function parsers of this namespace in a Json compatible format.
     */
    functions: FunctionParserJson[];

    /**
     * The interface parsers of this namespace in a Json compatible format.
     */
    interfaces: InterfaceParserJson[];

    /**
     * The namespace parsers of this namespace in a Json compatible format.
     */
    namespaces: NamespaceParserJson[];

    /**
     * The type alias parsers of this namespace in a Json compatible format.
     */
    typeAliases: TypeAliasParserJson[];

    /**
     * The variable parsers of this namespace in a Json compatible format.
     */
    variables: VariableParserJson[];
}
