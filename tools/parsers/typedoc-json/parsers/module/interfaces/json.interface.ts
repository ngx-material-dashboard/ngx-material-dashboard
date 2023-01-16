import { ClassParserJson } from '../../../parsers/class';
import { EnumParserJson } from '../../../parsers/enum';
import { InterfaceParserJson } from '../../../parsers/interface';
import { ParserJson } from '../../../parsers/parser';
import { TypeAliasParserJson } from '../../../parsers/type-alias';

export interface ModuleParserJson extends ParserJson {
    classes: ClassParserJson[];
    components: ClassParserJson[];
    converters: ClassParserJson[];
    decorators: ClassParserJson[];
    directives: ClassParserJson[];
    elements: ClassParserJson[];
    enums: EnumParserJson[];
    interfaces: InterfaceParserJson[];
    pages: ClassParserJson[];
    services: ClassParserJson[];
    typeAliases: TypeAliasParserJson[];
}
