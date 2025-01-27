/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

export class MetaData {
    page!: PageData;
}

export interface PageData {
    total?: number;
    number?: number;
    size?: number;
    last?: number;
}

export class PageMetaData {
    public meta: PageData = {};

    constructor(response: any) {
        this.meta = response.meta;
    }
}
