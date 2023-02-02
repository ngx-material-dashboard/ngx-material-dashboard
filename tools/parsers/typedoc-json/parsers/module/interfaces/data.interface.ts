import { FunctionParser } from '../../../parsers/function';
import { ClassParser } from '../../../parsers/class';
import { EnumParser } from '../../../parsers/enum';
import { InterfaceParser } from '../../../parsers/interface';
import { ParserData } from '../../../parsers/parser';
import { TypeAliasParser } from '../../../parsers/type-alias';

export interface ModuleParserData extends ParserData {
    classes: ClassParser[];
    enums: EnumParser[];
    functions: FunctionParser[];
    interfaces: InterfaceParser[];
    typeAliases: TypeAliasParser[];
}
