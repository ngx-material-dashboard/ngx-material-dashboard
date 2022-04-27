import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Attribute } from "../decorators/attribute.decorator";

export abstract class JsonModel {

    @Attribute() id?: string;
    modelInitialization = false;

    abstract save(params?: any, headers?: HttpHeaders, customUrl?: string): Observable<this>;
}
