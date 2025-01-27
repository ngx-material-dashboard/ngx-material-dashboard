/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

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
