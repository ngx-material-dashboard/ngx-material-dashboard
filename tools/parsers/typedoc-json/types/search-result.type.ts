import {
    SignatureParser,
    TypeParameterParser,
    ParameterParser,
    ClassConstructorParser,
    ClassMethodParser,
    ClassParser,
    ClassPropertyParser,
    EnumMemberParser,
    EnumParser,
    FunctionParser,
    InterfaceParser,
    InterfacePropertyParser,
    NamespaceParser,
    TypeAliasParser,
    VariableParser
} from '../parsers';

export type SearchResult =
    | ClassParser
    | ClassConstructorParser
    | ClassMethodParser
    | SignatureParser
    | TypeParameterParser
    | ParameterParser
    | ClassPropertyParser
    | VariableParser
    | EnumParser
    | EnumMemberParser
    | FunctionParser
    | InterfaceParser
    | InterfacePropertyParser
    | NamespaceParser
    | TypeAliasParser;
