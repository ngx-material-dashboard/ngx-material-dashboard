/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule } from 'ngx-markdown';

import { ScrollspyNavModule } from '../scrollspy-nav/scrollspy-nav.module';
import { ScrollspyNavLayoutComponent } from './scrollspy-nav-layout.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MarkdownModule,
        MatButtonModule,
        MatDividerModule,
        ScrollspyNavModule,
        FontAwesomeModule
    ],
    declarations: [ScrollspyNavLayoutComponent],
    exports: [ScrollspyNavLayoutComponent]
})
export class ScrollspyNavLayoutModule {}
