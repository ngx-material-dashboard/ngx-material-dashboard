/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { DecoratorParser } from './decorator.parser';

export class DirectiveDecoratorParser extends DecoratorParser {
    constructor(pathString: string) {
        super(pathString, 'Directive');
    }
}
