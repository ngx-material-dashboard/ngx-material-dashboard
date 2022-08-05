import { JsonModel as BaseJsonModel } from '../../src/lib';
import { JsonDatastore } from '../services/json-datastore.service';

export class JsonModel extends BaseJsonModel {

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
