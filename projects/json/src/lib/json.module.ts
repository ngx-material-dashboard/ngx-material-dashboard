import { NgModule } from '@angular/core';
import { BaseJsonModule } from '@ngx-material-dashboard/base-json/src/lib';

import { JsonDatastore } from './services/json-datastore.service';

@NgModule({
    imports: [BaseJsonModule],
    exports: [BaseJsonModule],
    providers: [JsonDatastore]
})
export class JsonModule {}
