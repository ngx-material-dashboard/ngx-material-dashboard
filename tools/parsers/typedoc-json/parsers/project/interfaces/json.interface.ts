import { ClassParserJson } from '../../class';
import { EnumParserJson } from '../../enum';
import { FunctionParserJson } from '../../function';
import { InterfaceParserJson } from '../../interface';
import { NamespaceParserJson } from '../../namespace';
import { TypeAliasParserJson } from '../../type-alias';
import { VariableParserJson } from '../../variable';

export interface ProjectParserJson {
    /**
     * The version of `typedoc-json-parser` that generated this Json object.
     * @since 2.1.0
     */
    typeDocJsonParserVersion: string;

    /**
     * The identifier of this project. This is usually `0`
     * @since 1.0.0
     */
    id: number;

    /**
     * The name of your project.
     *
     * Corresponds to the `name` property in your TypeDoc configuration or the `name` property of your `package.json` file.
     * @since 1.0.0
     */
    name: string;

    /**
     * The version of the project being parsed.
     *
     * Corresponds to the `version` property in your `package.json`
     * @since 2.2.0
     */
    version: string | null;

    /**
     * The readme content of this project.
     * @since 3.0.0
     */
    readme: string | null;

    /**
     * The changelog content of this project.
     * @since 3.2.0
     */
    changelog: string | null;

    /**
     * An array of class Json compatible objects for this project in a Json compatible format.
     * @since 1.0.0
     */
    classes: ClassParserJson[];

    /**
     * An array of enum Json compatible objects for this project in a Json compatible format.
     * @since 1.0.0
     */
    enums: EnumParserJson[];

    /**
     * An array of function Json compatible objects for this project in a Json compatible format.
     * @since 1.0.0
     */
    functions: FunctionParserJson[];

    /**
     * An array of interface Json compatible objects for this project in a Json compatible format.
     * @since 1.0.0
     */
    interfaces: InterfaceParserJson[];

    /**
     * An array of namespace Json compatible objects for this project in a Json compatible format.
     * @since 1.0.0
     */
    namespaces: NamespaceParserJson[];

    /**
     * An array of type alias Json compatible objects for this project in a Json compatible format.
     * @since 1.0.0
     */
    typeAliases: TypeAliasParserJson[];

    /**
     * An array of variable Json compatible objects for this project in a Json compatible format.
     * @since 1.0.0
     */
    variables: VariableParserJson[];
}
