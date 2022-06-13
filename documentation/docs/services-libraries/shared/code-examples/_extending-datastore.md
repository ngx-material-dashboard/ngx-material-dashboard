```typescript
import { Injectable } from '@angular/core';
import { JsonApiDatastoreConfig } from '@ngx-material-dashboard/base-json';
import { JsonDatastore } from '@ngx-material-dashboard/json';

import { Task } from '@shared/models/task.model'; // assuming path defined in tsconfig.json

@Injectable()
@JsonApiDatastoreConfig({
    baseUrl: 'http://localhost:8080/api',
    models: {
        'tasks': Task
    }
})
export class JsonApiService extends JsonDatastore {}
```
