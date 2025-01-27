/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import Contains from '../helpers/contains';
import CurlyBracket from '../helpers/curly-brackets';
import PropertiesTable from '../helpers/properties-table';
import ReformatTextHelper from '../helpers/reformat-text.helper';
import RemoveClasspathHelper from '../helpers/remove-classpath.helper';

export function registerHelpers() {
    Contains();
    CurlyBracket();
    PropertiesTable();
    ReformatTextHelper();
    RemoveClasspathHelper();
}
