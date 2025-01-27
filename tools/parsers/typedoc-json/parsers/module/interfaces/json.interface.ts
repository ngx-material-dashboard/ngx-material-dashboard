/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import {
    FunctionParser,
    EnumParser,
    InterfaceParser,
    TypeAliasParser
} from 'typedoc-json-parser';
// import { FunctionParserJson } from '../../../parsers/function';
import { ClassParserJson } from '../../../parsers/class';
// import { EnumParserJson } from '../../../parsers/enum';
// import { InterfaceParserJson } from '../../../parsers/interface';
import { ParserJson } from '../../../parsers/parser';
// import { TypeAliasParserJson } from '../../../parsers/type-alias';

export interface ModuleParserJson extends ParserJson {
    classes: ClassParserJson[];
    components: ClassParserJson[];
    converters: ClassParserJson[];
    decorators: FunctionParser.Json[];
    directives: ClassParserJson[];
    elements: ClassParserJson[];
    enums: EnumParser.Json[];
    interfaces: InterfaceParser.Json[];
    pages: ClassParserJson[];
    services: ClassParserJson[];
    typeAliases: TypeAliasParser.Json[];
}
