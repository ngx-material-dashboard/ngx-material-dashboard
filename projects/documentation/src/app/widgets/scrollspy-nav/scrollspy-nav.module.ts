/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScrollspyNavComponent } from './scrollspy-nav.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [ScrollspyNavComponent],
    exports: [ScrollspyNavComponent]
})
export class ScrollspyNavModule {}
