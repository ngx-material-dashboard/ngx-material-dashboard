import {
    Attribute,
    JsonModel as BaseJsonModel
} from '@ngx-material-dashboard/base-json';
import { JsonDatastore } from '../services/json-datastore.service';

export class JsonModel extends BaseJsonModel {
    @Attribute() override id?: string;

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
