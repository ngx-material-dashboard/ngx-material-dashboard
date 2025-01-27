/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { DecoratorParser } from './decorator.parser';

export class PropertyDecoratorParser extends DecoratorParser {
    public static readonly decoratorTypes: string[] = [
        'Input',
        'Output',
        'ContentChild',
        'ContentChildren',
        'ViewChild',
        'ViewChildren'
    ];
    type?: string;
    typeDisplay?: string;

    constructor(pathString: string, line: number) {
        super(pathString);
        this.parsePropertyDecoratorTypes(line);
    }

    private parsePropertyDecoratorTypes(line: number): void {
        for (const decoratorType of PropertyDecoratorParser.decoratorTypes) {
            if (this.lines[line].includes(`@${decoratorType}`)) {
                this.type = decoratorType;
                this.typeDisplay = `@${decoratorType}()`;
                break;
            } // TODO handle multi-line decorators...
        }
    }
}
