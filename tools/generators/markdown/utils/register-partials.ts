/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';

export function registerPartials() {
    const partialsFolder = path.join(__dirname, '..', 'partials');
    const partialFiles = fs.readdirSync(partialsFolder);
    partialFiles.forEach((partialFile) => {
        const partialName = path.basename(partialFile, '.hbs');
        const partialContent = fs
            .readFileSync(partialsFolder + '/' + partialFile)
            .toString();
        Handlebars.registerPartial(partialName, partialContent);
    });
}
