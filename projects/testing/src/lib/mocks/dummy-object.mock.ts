import { JsonModel, JsonApiModelConfig, JsonDatastore } from '@ngx-material-dashboard/base-json';

/** A dummy object that can be used while testing. */
@JsonApiModelConfig({
    type: 'dummy-object'
})
export class DummyObject extends JsonModel {

    constructor(internalDatastore: JsonDatastore, data?: any) {
        super(internalDatastore);

        if (data) {
            this.modelInitialization = true;
            this.id = data.id;
            Object.assign(this, data);
            this.modelInitialization = false;
        }
    }
}

export const DUMMY_OBJECT_DATA: DummyObject[] = [];
for(let i = 0; i < 200; i++) {
    DUMMY_OBJECT_DATA.push({ id: i.toString() } as DummyObject);
}
