/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

/**
 * The `BaseJsonModule` defines needed imports and exports for this library.
 * Simply import this module once into your app.
 * (TODO prevent multiple imports...)
 */
@NgModule({
    imports: [HttpClientModule],
    exports: [HttpClientModule]
})
export class BaseJsonModule {}
