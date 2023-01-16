import { NgModule } from '@angular/core';
import { BaseJsonModule } from '@ngx-material-dashboard/base-json/src/lib';

import { JsonApiDatastore } from './services/json-api-datastore.service';

@NgModule({
    imports: [BaseJsonModule],
    exports: [BaseJsonModule],
    providers: [JsonApiDatastore]
})
export class JsonApiModule {}
