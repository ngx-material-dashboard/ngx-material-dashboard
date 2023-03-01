/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

// import { FunctionParser } from '../../../parsers/function';
import {
    EnumParser,
    FunctionParser,
    InterfaceParser,
    TypeAliasParser
} from 'typedoc-json-parser';
import { ClassParser } from '../../../parsers/class';
// import { EnumParser } from '../../../parsers/enum';
// import { InterfaceParser } from '../../../parsers/interface';
import { ParserData } from '../../../parsers/parser';
// import { TypeAliasParser } from '../../../parsers/type-alias';

export interface ModuleParserData extends ParserData {
    classes: ClassParser[];
    enums: EnumParser[];
    functions: FunctionParser[];
    interfaces: InterfaceParser[];
    typeAliases: TypeAliasParser[];
}
