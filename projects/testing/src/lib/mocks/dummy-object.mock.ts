import { HttpHeaders } from '@angular/common/http';
import { JsonModel, JsonApiModelConfig } from '@ngx-material-dashboard/base-json';
import { Observable, of } from 'rxjs';

/** A dummy object that can be used while testing. */
@JsonApiModelConfig({
    type: 'dummy-object'
})
export class DummyObject extends JsonModel {

    public save(
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<this> {
        return of(this);
    }
}

export const DUMMY_OBJECT_DATA: DummyObject[] = [];
for(let i = 0; i < 200; i++) {
    DUMMY_OBJECT_DATA.push({ id: i.toString() } as DummyObject);
}
