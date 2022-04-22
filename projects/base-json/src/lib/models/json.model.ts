import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class JsonModel {

    id?: string;

    abstract save(params?: any, headers?: HttpHeaders, customUrl?: string): Observable<this>;
}
