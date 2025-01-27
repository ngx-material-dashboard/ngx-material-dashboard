/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import * as Handlebars from 'handlebars';
import { reformatText } from '../../../generators/documentation/helpers';

export default function () {
    Handlebars.registerHelper('reformatText', function (val: string) {
        return reformatText(val);
    });
}
