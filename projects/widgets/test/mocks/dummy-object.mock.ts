import { HttpHeaders } from '@angular/common/http';
import { JsonApiModelConfig, JsonDatastore, JsonModel } from '@ngx-material-dashboard/base-json';
import { Observable, of } from 'rxjs';

export class DUMMY_OBJECT_DATA {

}

/** A dummy object that can be used while testing. */
@JsonApiModelConfig({
    type: 'dummy-object'
})
export class DummyObject extends JsonModel {

    constructor(private internalDatastore: JsonDatastore, data?: DUMMY_OBJECT_DATA) {
        super();
    }

    public save(
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<this> {
        return of(this);
    }
}
