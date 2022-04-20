import { JsonApiModel } from '@ngx-material-dashboard/json-api';
import { JsonApiModelConfig } from '@ngx-material-dashboard/json-api';

/** A dummy object that can be used while testing. */
@JsonApiModelConfig({
    type: 'dummy-object'
})
export class DummyObject extends JsonApiModel {

}

export const DUMMY_OBJECT_DATA: DummyObject[] = [];
for(let i = 0; i < 200; i++) {
    DUMMY_OBJECT_DATA.push({ id: i.toString() } as DummyObject);
}
