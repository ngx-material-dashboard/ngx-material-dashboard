import { HttpHeaders } from "@angular/common/http";
import { JsonModel } from "@ngx-material-dashboard/base-json";
import { Observable, of } from "rxjs";

/**
 * Use a mock of the JsonApiModel so we don't need to worry about
 * including providers for data parameters in tests.
 */
export class JsonModelMock extends JsonModel {
    public override save(
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<this> {
        return of(this);
    }
}