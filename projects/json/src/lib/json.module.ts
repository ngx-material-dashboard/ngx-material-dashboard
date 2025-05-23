/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { NgModule } from '@angular/core';
import { BaseJsonModule } from '@ngx-material-dashboard/base-json';

import { JsonDatastore } from './services/json-datastore.service';

@NgModule({
    imports: [BaseJsonModule],
    exports: [BaseJsonModule],
    providers: [JsonDatastore]
})
export class JsonModule {}
