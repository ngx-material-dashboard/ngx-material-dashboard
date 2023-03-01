/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import * as Handlebars from 'handlebars';

export default function () {
    Handlebars.registerHelper('removeClasspath', function (val: string) {
        if (val && val.indexOf('.') > 0) {
            return val.substring(val.indexOf('.'));
        } else {
            return val;
        }
    });
}
