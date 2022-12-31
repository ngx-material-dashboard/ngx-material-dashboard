/**
 * The most basic type of object defined in the typedoc JSON output.
 */
export interface Json {
    /**
     * The identifier for the JSON object.
     */
    id: number;

    /**
     * The name of the JSON object.
     */
    name: string;

    // /**
    //  * An array of class Json compatible objects for this project in a Json compatible format.
    //  * @since 1.0.0
    //  */
    // classes: ClassParser.Json[];

    // /**
    //  * An array of enum Json compatible objects for this project in a Json compatible format.
    //  * @since 1.0.0
    //  */
    // enums: EnumParser.Json[];

    // /**
    //  * An array of function Json compatible objects for this project in a Json compatible format.
    //  * @since 1.0.0
    //  */
    // functions: FunctionParser.Json[];

    // /**
    //  * An array of interface Json compatible objects for this project in a Json compatible format.
    //  * @since 1.0.0
    //  */
    // interfaces: InterfaceParser.Json[];

    // /**
    //  * An array of namespace Json compatible objects for this project in a Json compatible format.
    //  * @since 1.0.0
    //  */
    // namespaces: NamespaceParser.Json[];

    // /**
    //  * An array of type alias Json compatible objects for this project in a Json compatible format.
    //  * @since 1.0.0
    //  */
    // typeAliases: TypeAliasParser.Json[];

    // /**
    //  * An array of variable Json compatible objects for this project in a Json compatible format.
    //  * @since 1.0.0
    //  */
    // variables: VariableParser.Json[];
}