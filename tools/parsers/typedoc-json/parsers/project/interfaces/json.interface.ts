import { ProjectParser as TypedocProjectParser } from 'typedoc-json-parser';
import { ModuleParserJson } from '../../module';
// import { EnumParserJson } from '../../enum';
// import { FunctionParserJson } from '../../function';
// import { InterfaceParserJson } from '../../interface';
// import { NamespaceParserJson } from '../../namespace';
// import { TypeAliasParserJson } from '../../type-alias';
// import { VariableParserJson } from '../../variable';

export interface ProjectParserJson extends TypedocProjectParser.Json {
    modules: ModuleParserJson[];
}
