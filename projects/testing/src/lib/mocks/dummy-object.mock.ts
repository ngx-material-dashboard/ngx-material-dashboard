import { JsonApiModel } from '@ngx-material-dashboard/json-api';
import { JsonApiModelConfig } from '@ngx-material-dashboard/json-api';

/** A dummy object that can be used while testing. */
@JsonApiModelConfig({
    type: 'dummy-object'
})
export class DummyObject extends JsonApiModel {

}
